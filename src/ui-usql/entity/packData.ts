import {TuidData} from './tuidData';

export interface Field {
    name:string;
    type:string;
    tuid?:string;
}
interface Arr {
    name:string;
    fields: Field[];
}

const tab = '\t';
const ln = '\n';
export function pack(schema:any, data:any):string {
    let ret:string[] = [];
    if (schema === undefined || data === undefined) return;
    let fields = schema.fields;
    if (fields !== undefined) packRow(ret, schema.fields, data);
    let arrs = schema['arrs'];
    if (arrs !== undefined) {
        for (let arr of arrs) {
            packArr(ret, arr.fields, data[arr.name]);
        }
    }
    return ret.join('');
}

export function escape(d:any):any {
    switch (typeof d) {
        default: return d;
        case 'string':
            let len = d.length;
            let r = '', p = 0;
            for (let i=0;i<len;i++) {
                let c = d.charCodeAt(i);
                switch(c) {
                    case 9: r += d.substring(p, i) + '\\t'; p = i+1; break;
                    case 10: r += d.substring(p, i) + '\\n'; p = i+1; break;
                }
            }
            return r + d.substring(p);
        case 'undefined': return '';
    }
}

function packRow(result:string[], fields:Field[], data:any) {
    let ret = '';
    let len = fields.length;
    ret += escape(data[fields[0].name]);
    for (let i=1;i<len;i++) {
        let f = fields[i];
        ret += tab + escape(data[f.name]);
    }
    result.push(ret + ln);
}

function packArr(result:string[], fields:Field[], data:any[]) {
    if (data !== undefined) {
        for (let row of data) {
            packRow(result, fields, row);
        }
    }
    result.push(ln);
}

export function unpackSheet(schema:any, data:string):any {
    let ret = new TuidData();
    if (schema === undefined || data === undefined) return;
    let fields = schema.fields;
    let p = 0;
    if (fields !== undefined) p = unpackRow(ret, schema.fields, data, p);
    let arrs = schema['arrs'];
    if (arrs !== undefined) {
        for (let arr of arrs) {
            p = unpackArr(ret, arr, data, p);
        }
    }
    return ret;
}

export function unpackReturns(schema:any, data:string):TuidData {
    let ret = new TuidData();
    if (schema === undefined || data === undefined) return;
    //let fields = schema.fields;
    let p = 0;
    //if (fields !== undefined) p = unpackRow(ret, schema.fields, data, p);
    let arrs = schema['returns'];
    if (arrs !== undefined) {
        for (let arr of arrs) {
            p = unpackArr(ret, arr, data, p);
        }
    }
    return ret;
}

function unpackRow(ret:TuidData, fields:Field[], data:string, p:number):number {
    let c = p, i = 0, len = data.length, fLen = fields.length;
    for (;p<len;p++) {
        let ch = data.charCodeAt(p);
        if (ch === 9) {
            let f = fields[i];
            let v = data.substring(c, p);
            ret[f.name] = to(ret, v, f);
            c = p+1;
            ++i;
            if (i>=fLen) break;
        }
        else if (ch === 10) {
            let f = fields[i];
            let v = data.substring(c, p);
            ret[f.name] = to(ret, v, f);
            ++p;
            ++i;
            break;
        }
    }
    return p;
    function to(ret:TuidData, v:string, f:Field):any {
        switch (f.type) {
            default: return v;
            case 'datetime':
            case 'date':
            case 'time':
                let date = new Date(Number(v));
                return date;
            case 'tinyint':
            case 'smallint':
            case 'int':
            case 'dec': return Number(v);
            case 'bigint':
                let tuid = f.tuid;
                if (tuid === undefined) return Number(v);
                return ret.tuid(Number(v), tuid);
                //return {id:Number(v)}
        }
    }
}

function unpackArr(ret:TuidData, arr:Arr, data:string, p:number):number {
    let vals:any[] = [], len = data.length;
    let {name, fields} = arr;
    while (p<len) {
        let ch = data.charCodeAt(p);
        if (ch === 10) {
            ++p;
            break;
        }
        let val = new TuidData;
        vals.push(val);
        p = unpackRow(val, fields, data, p);
    }
    ret[name] = vals;
    return p;
}
