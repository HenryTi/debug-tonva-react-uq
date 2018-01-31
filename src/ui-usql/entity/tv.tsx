import * as React from 'react';
import * as _ from 'lodash';
import {nav} from 'tonva-tools';
import {UsqlApi} from '../usqlApi';
import {pack, unpackReturns, unpackSheet, Field} from './packData';
import {ActionPage} from './action';
import {QueryPage} from './query';
import {SheetPage} from './sheet';
import {TuidPage} from './tuid';

const tvApi = new UsqlApi('apiName');

class Entities {
    private tuids: {[name:string]: Tuid} = {};
    private actions: {[name:string]: Action} = {};
    private sheets: {[name:string]: Sheet} = {};
    private queries: {[name:string]: Query} = {};

    getTuids():Tuid[] {
        let ret:Tuid[] = [];
        for (let n in this.tuids) {
            let tuid = this.tuids[n];
            if (tuid.props.access === true) ret.push(tuid);
        }
        return ret;
    }

    getTuid(name:string):Tuid {
        return this.tuids[name];
    }

    getActions():Action[] {
        let ret:Action[] = [];
        for (let n in this.actions) {
            let action = this.actions[n];
            if (action.props.access === true) ret.push(action);
        }
        return ret;
    }

    getSheets():Sheet[] {
        let ret:Sheet[] = [];
        for (let n in this.sheets) {
            let sheet = this.sheets[n];
            if (sheet.props.access === true) ret.push(sheet);
        }
        return ret;
    }

    getQueries():Query[] {
        let ret:Query[] = [];
        for (let n in this.queries) {
            let query = this.queries[n];
            if (query.props.access === true) ret.push(query);
        }
        return ret;
    }

    addTuid(entity: Tuid) {
        let n = entity.props.name;
        this.tuids[n] = entity;
    }
    addAction(entity: Action) {
        let n = entity.props.name;
        this.actions[n] = entity;
    }
    addSheet(entity: Sheet) {
        let n = entity.props.name;
        this.sheets[n] = entity;
    }
    addQuery(entity: Query) {
        let n = entity.props.name;
        this.queries[n] = entity;
    }

    loadAccess():Promise<any> {
        return tvApi.access(undefined).then(res => {
            this.setAccess(res);
        });
    }
    private setAccess(access:any) {
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
                if (action === undefined)
                    createAction({name: name, access: true});
                else
                    action.setAccess(true);
                break;
            case 'tuid':
                let tuid = this.tuids[name];
                if (tuid === undefined)
                    createTuid({name: name, access: true});
                else
                    tuid.setAccess(true);
                break;
            case 'query': 
                let query = this.queries[name];
                if (query === undefined)
                    createQuery({name: name, access: true});
                else
                    query.setAccess(true);
                break;
        }
    }
    private fromObj(name:string, obj:object) {
        switch (obj['$']) {
            case 'sheet': this.buildSheet(name, obj); break;
        }
    }
    private buildSheet(name:string, obj:object) {
        let props:SheetProps = {name: name, access: true, states: []} as any;
        let states = props.states;
        for (let p in obj) {
            switch(p) {
                case '#':
                case '$': continue;
                default: states.push(this.createSheetState(p, obj[p])); break;
            }
        }
        let sheet = this.sheets[name];
        if (sheet !== undefined)
            sheet.setAccess(props);
        else
            createSheet(props);
    }
    private createSheetState(name:string, obj:object):SheetStateProps {
        let ret:SheetStateProps = {name:name, access: true, actions:[]};
        let actions = ret.actions;
        for (let p in obj) {
            let actionProps:SheetActionProps = {name: p, access: true};
            actions.push(actionProps);
        }
        return ret;
    }
}

export const entities = new Entities();

export interface EntityProps {
    name: string;
    access?: boolean;
    caption?: string;
    icon?: string;
    page?: object;
}

export interface TuidProps extends EntityProps {
}

export interface ActionProps extends EntityProps {
}

export interface SheetActionProps extends EntityProps {
}

export interface SheetStateProps extends EntityProps {
    actions: SheetActionProps[];
}

export interface SheetProps extends EntityProps {
    states: SheetStateProps[];
}

export interface QueryProps extends EntityProps {
}

export abstract class Entity {
    props: EntityProps;
    schema: any;
    constructor(props: EntityProps) {
        this.props = props;
    }
    click() {
        this.loadSchema().then(() => {
            let page:JSX.Element;
            if (this.props.page !== undefined)
                page = React.createElement(this.props.page as any, {entity: this})
            else
                page = this.defaultPage;
            nav.push(page);
        });
    }
    abstract get defaultPage():JSX.Element;
    private loadSchema() {
        return tvApi.schema(this.props.name)
            .then(schema => {
                this.schema = schema;
            });
    }
}

export class Tuid extends Entity {
    props: TuidProps;
    constructor(props: TuidProps) {
        super(props);
        entities.addTuid(this);
    }
    setAccess(access:boolean) { this.props.access = access; }
    get defaultPage():JSX.Element {
        return <TuidPage entity={this} />;
    }
    save(id:number, props:any) {
        let params = _.clone(props);
        params[props.id] = id;
        return tvApi.tuidSave(this.props.name, params);
    }
    async search(key:string, pageStart:string|number, pageSize:number):Promise<any> {
        return await tvApi.tuidSearch(this.props.name, key, pageStart, pageSize);
    }
    ids(idArr:number[]) {
        return tvApi.tuidIds(this.props.name, idArr);
    }
}

export class Action extends Entity {
    props: ActionProps;
    constructor(props: ActionProps) {
        super(props);
        entities.addAction(this);
    }
    setAccess(access:boolean) {
        this.props.access = access; 
    }
    get defaultPage():JSX.Element {
        return <ActionPage entity={this} />;
    }
    submit(data:object) {
        let text = pack(this.schema, data);
        return tvApi.action(this.props.name, {data:text});
    }
}

export class Sheet extends Entity {
    props: SheetProps;
    constructor(props: SheetProps) {
        super(props);
        entities.addSheet(this);
    }
    setAccess(props: SheetProps) {
        this.props.access = props.access;
        for (let state of props.states) {
            this.setStateAccess(this.props.states.find(s=>s.name==state.name), state);
        }
    }
    private setStateAccess(s:SheetStateProps, s1:SheetStateProps) {
        if (s === undefined) return;
        s.access = s1.access;
        for (let action of s1.actions) {
            let ac = s.actions.find(a=>a.name === action.name);
            if (ac === undefined) continue;
            ac.access = action.access;
        }
    }
    save(discription:string, data:any) {
        let text = pack(this.schema, data);
        return tvApi.sheetSave(this.props.name, {discription: discription, data:text});
    }
    action(id:number, flow:number, state:string, action:string) {
        return tvApi.sheetAction(this.props.name, {id:id, flow:flow, state:state, action:action});
    }
    getStateSheets(state:string, pageStart:number, pageSize:number) {
        return tvApi.stateSheets(this.props.name, {state:state, pageStart:pageStart, pageSize:pageSize});
    }
    getStateSheetCount() {
        return tvApi.stateSheetCount(this.props.name);
    }
    getSheet(id:number) {
        return tvApi.getSheet(this.props.name, id);
    }
    getArchives(pageStart:number, pageSize:number) {
        return tvApi.sheetArchives(this.props.name, {pageStart:pageStart, pageSize:pageSize})
    }
    getArchive(id:number) {
        return tvApi.sheetArchive(this.props.name, id)
    }
    get defaultPage():JSX.Element {
        return <SheetPage entity={this} />;
    }
}

export class Query extends Entity {
    private pageStart: any;
    private pageSize:number;
    private params:any;
    private more: boolean;
    private startField: Field;
    props: QueryProps;
    constructor(props: QueryProps) {
        super(props);
        entities.addQuery(this);
    }
    setAccess(access:boolean) { this.props.access = access; }
    get defaultPage():JSX.Element {
        return <QueryPage entity={this} />;
    }

    resetPage(size:number, params:any) {
        this.pageStart = undefined;
        this.pageSize = size;
        this.params = params;
        this.more = false;
    }
    get hasMore() {return this.more;}
    page() {
        if (this.pageSize === undefined) {
            throw 'call resetPage(size:number, params:any) first';
        }
        let pageStart:any;
        if (this.pageStart !== undefined) {
            switch (this.startField.type) {
                default: pageStart = this.pageStart; break;
                case 'date':
                case 'time':
                case 'datetime': pageStart = (this.pageStart as Date).getTime(); break;
            }
        }
        return tvApi.page(this.props.name, pageStart, this.pageSize+1, this.params)
        .then(res => {
            let data = unpackReturns(this.schema, res);
            let page = data['$page'] as any[];
            if (page !== undefined) {
                if (page.length > this.pageSize) {
                    this.more = true;
                    page.pop();
                    let ret = (this.schema.returns as any[]).find(r => r.name === '$page');
                    this.startField = ret.fields[0];
                    this.pageStart = page[page.length-1][this.startField.name];
                }
                else {
                    this.more = false;
                }
            }
            return data;
        });
    }
}

export function createTuid(props:TuidProps):Tuid {
    return new Tuid(props);
}

export function createAction(props:ActionProps):Action {
    return new Action(props);
}

export function createSheet(props:SheetProps):Sheet {
    return new Sheet(props);
}

export function createQuery(props:QueryProps):Query {
    return new Query(props);
}
