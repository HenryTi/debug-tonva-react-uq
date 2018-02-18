import {UsqlApi} from './usqlApi';
import {Entities} from './entities';

export abstract class Entity {
    protected entities: Entities;
    readonly name: string;
    readonly id: number;

    constructor(entities:Entities, name:string, id:number) {
        this.entities = entities;
        this.name = name;
        this.id = id;
    }

    public schema: any;

    protected get tvApi() {return this.entities.tvApi;}

    public async loadSchema():Promise<void> {
        this.schema = await this.entities.tvApi.schema(this.name);
    }
}
