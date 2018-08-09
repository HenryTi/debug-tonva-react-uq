import { Entity } from './entity';
import { Action } from './action';
import { Query } from './query';

interface MapActions {
    add: Action;
    del: Action;
}
interface MapQueries {
    all: Query;
    page: Query;
    slavePage: Query;
}

export class Map extends Entity {
    actions: MapActions = {} as any;
    queries: MapQueries = {} as any;

    public async loadSchema():Promise<void> {
        await super.loadSchema();
        let {actions, queries} = this.schema;
        let t = JSON.stringify(this.schema);
        for (let i in actions) {
            let schema = actions[i];
            let {name} = schema;
            let action = this.entities.newAction(name, undefined);
            action.setSchema(schema);
            this.actions[i] = action;
        }
        for (let i in queries) {
            let schema = queries[i];
            let {name} = schema;
            let query = this.entities.newQuery(name, undefined);
            query.setSchema(schema);
            this.queries[i] = query;
        }
        t = JSON.stringify(this.schema);
    }
}
