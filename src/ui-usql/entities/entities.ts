import {observable} from 'mobx';
import {UsqlApi} from './usqlApi';
//import {TuidData} from './tuidData';
import {Tuid} from './tuid';
import {Action} from './action';
import {Sheet, SheetState, SheetAction} from './sheet';
import {Query} from './query';

export interface Field {
    name: string;
    type: string;
    tuidKey?: string;
    tuid?: Tuid;
}
interface Arr {
    name:string;
    fields: Field[];
}
/*
interface TuidCache {
    tuid: Tuid;
    idArr: number[];
    waiting: {[id:number]:any};
    [id:number]: any;
}
*/
const tab = '\t';
const ln = '\n';

export class Entities {
    //private apiOwner: string;
    //private apiName: string;
    //private access: string[];
    tvApi: UsqlApi;
    //caches: {[tuid:string]: TuidCache} = {};

    private tuids: {[name:string]: Tuid} = {};
    private actions: {[name:string]: Action} = {};
    private sheets: {[name:string]: Sheet} = {};
    private queries: {[name:string]: Query} = {};

    // api: apiOwner/apiName
    // access: acc1;acc2 or *
    constructor(api:string, access:string) {
        let p = api.split('/');
        if (p.length !== 2) {
            console.log('api must be apiOwner/apiName format');
            return;
        }
        //this.apiOwner = p[0];
        //this.apiName = p[1];
        let acc = access.split(';').map(v=>v.trim());
        // * = all
        if (acc.length === 1 && acc[0] === '*') acc = [];
        this.tvApi = new UsqlApi(p[0], p[1], acc);
    }

    tuidArr: Tuid[] = [];
    actionArr: Action[] = [];
    sheetArr: Sheet[] = [];
    queryArr: Query[] = [];

    getTuid(name:string) {return this.tuids[name];}

    // load access
    async loadAccess():Promise<boolean> {
        let ret = await this.tvApi.loadAccess();
        this.buildAccess(ret);
        return true;
    }
    private buildAccess(access:any) {
        for (let a in access) {
            let v = access[a];
            switch (typeof v) {
                case 'string': this.fromType(a, v); break;
                case 'object': this.fromObj(a, v); break;
            }
        }
    }

    private fromType(name:string, type:string) {
        switch (type) {
            case 'action': 
                let action = this.actions[name];
                if (action === undefined) {
                    this.actionArr.push(this.actions[name] = new Action(this, name));
                }
                break;
            case 'tuid':
                let tuid = this.tuids[name];
                if (tuid === undefined) {
                    this.tuidArr.push(this.tuids[name] = new Tuid(this, name));
                }
                break;
            case 'query': 
                let query = this.queries[name];
                if (query === undefined) {
                    this.queryArr.push(this.queries[name] = new Query(this, name));
                }
                break;
        }
    }
    private fromObj(name:string, obj:object) {
        switch (obj['$']) {
            case 'sheet': this.buildSheet(name, obj); break;
        }
    }
    private buildSheet(name:string, obj:object) {
        let sheet = this.sheets[name];
        if (sheet === undefined) {
            this.sheetArr.push(sheet = this.sheets[name] = new Sheet(this, name));
        }

        let states = sheet.states;
        for (let p in obj) {
            switch(p) {
                case '#':
                case '$': continue;
                default: states.push(this.createSheetState(p, obj[p])); break;
            }
        }
        //if (sheet !== undefined)
        //     sheet.setAccess(props);
        //else
        //    createSheet(props);
    }
    private createSheetState(name:string, obj:object):SheetState {
        let ret:SheetState = {name:name, actions:[]};
        let actions = ret.actions;
        for (let p in obj) {
            let action:SheetAction = {name: p};
            actions.push(action);
        }
        return ret;
    }

    pack(schema:any, data:any):string {
        let ret:string[] = [];
        if (schema === undefined || data === undefined) return;
        let fields = schema.fields;
        if (fields !== undefined) this.packRow(ret, schema.fields, data);
        let arrs = schema['arrs'];
        if (arrs !== undefined) {
            for (let arr of arrs) {
                this.packArr(ret, arr.fields, data[arr.name]);
            }
        }
        return ret.join('');
    }
    
    private escape(d:any):any {
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
    
    private packRow(result:string[], fields:Field[], data:any) {
        let ret = '';
        let len = fields.length;
        ret += this.escape(data[fields[0].name]);
        for (let i=1;i<len;i++) {
            let f = fields[i];
            ret += tab + this.escape(data[f.name]);
        }
        result.push(ret + ln);
    }
    
    private packArr(result:string[], fields:Field[], data:any[]) {
        if (data !== undefined) {
            for (let row of data) {
                this.packRow(result, fields, row);
            }
        }
        result.push(ln);
    }
    
    private unpackSheet(schema:any, data:string):any {
        let ret = {} as any;
        if (schema === undefined || data === undefined) return;
        let fields = schema.fields;
        let p = 0;
        if (fields !== undefined) p = this.unpackRow(ret, schema.fields, data, p);
        let arrs = schema['arrs'];
        if (arrs !== undefined) {
            for (let arr of arrs) {
                p = this.unpackArr(ret, arr, data, p);
            }
        }
        return ret;
    }
    
    unpackReturns(schema:any, data:string):any {
        let ret = {} as any;
        if (schema === undefined || data === undefined) return;
        //let fields = schema.fields;
        let p = 0;
        //if (fields !== undefined) p = unpackRow(ret, schema.fields, data, p);
        let arrs = schema['returns'];
        if (arrs !== undefined) {
            for (let arr of arrs) {
                p = this.unpackArr(ret, arr, data, p);
            }
        }
        return ret;
    }
    
    private unpackRow(ret:any, fields:Field[], data:string, p:number):number {
        let c = p, i = 0, len = data.length, fLen = fields.length;
        for (;p<len;p++) {
            let ch = data.charCodeAt(p);
            if (ch === 9) {
                let f = fields[i];
                let v = data.substring(c, p);
                ret[f.name] = this.to(ret, v, f);
                c = p+1;
                ++i;
                if (i>=fLen) break;
            }
            else if (ch === 10) {
                let f = fields[i];
                let v = data.substring(c, p);
                ret[f.name] = this.to(ret, v, f);
                ++p;
                ++i;
                break;
            }
        }
        return p;
    }

    private to(ret:any, v:string, f:Field):any {
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
                let tuidKey = f.tuidKey;
                if (tuidKey !== undefined) {
                    let tuid = f.tuid;
                    if (tuid === undefined) {
                        f.tuid = tuid = this.getTuid(tuidKey);
                    }
                    tuid.useId(Number(v));
                }
                return Number(v);
                //return ret.tuid(Number(v), tuid);
                //return {id:Number(v)}
        }
    }

    private unpackArr(ret:any, arr:Arr, data:string, p:number):number {
        let vals:any[] = [], len = data.length;
        let {name, fields} = arr;
        while (p<len) {
            let ch = data.charCodeAt(p);
            if (ch === 10) {
                ++p;
                break;
            }
            let val = {};
            vals.push(val);
            p = this.unpackRow(val, fields, data, p);
        }
        ret[name] = vals;
        return p;
    }
}
