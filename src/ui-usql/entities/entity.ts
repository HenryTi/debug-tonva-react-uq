import {UsqlApi} from './usqlApi';
import { Entities, Field, Arr } from './entities';
import { Tuid } from './tuid';

export abstract class Entity {
    protected entities: Entities;
    //protected api:UsqlApi;
    sys?: boolean;
    readonly name: string;
    readonly id: number;

    constructor(entities:Entities, name:string, id:number) {
        this.entities = entities;
        this.name = name;
        this.id = id;
        this.sys = this.name.indexOf('$') >= 0;
    }

    public schema: any;
    public face: any;           // 对应字段的label, placeHolder等等的中文，或者语言的翻译

    protected get tvApi() {return this.entities.tvApi;}

    public async loadSchema():Promise<void> {
        if (this.schema !== undefined) return;
        let schema = await this.entities.tvApi.schema(this.name);
        this.setSchema(schema);
    }

    public setSchema(schema:any) {
        if (schema === undefined) return;
        if (this.schema !== undefined) return;
        this.schema = schema;
        this.entities.schemaRefTuids(schema.tuids);
    }

    getTuid(tuidName:string):Tuid {
        return this.entities.getTuid(tuidName, undefined);
    }

    getTuidFromField(field:Field):Tuid {
        return this.entities.getTuid(field.tuid, undefined);
    }

    getTuidFromName(fieldName:string, arrName?:string):Tuid {
        if (this.schema === undefined) return;
        let {fields, arrs} = this.schema;
        let entities = this.entities;
        function getTuid(fn:string, fieldArr:Field[]) {
            if (fieldArr === undefined) return;
            let f = fieldArr.find(v => v.name === fn);
            if (f === undefined) return;
            return entities.getTuid(f.tuid, undefined);
        }
        if (arrName === undefined) return getTuid(fieldName.toLowerCase(), fields);
        if (arrs === undefined) return;
        let an = arrName.toLowerCase();
        let arr = (arrs as Arr[]).find(v => v.name === an);
        if (arr === undefined) return;
        return getTuid(fieldName.toLowerCase(), arr.fields);
    }
}
