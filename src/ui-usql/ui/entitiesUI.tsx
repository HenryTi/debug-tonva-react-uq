import * as React from 'react';
import * as _ from 'lodash';
import {Entities, Entity, Tuid, Action, Sheet, Query} from '../entities';
import {EntitiesMapper, FieldMapper, FieldMappers, MapperContainer, 
    EntityMapper, ActionMapper, QueryMapper, SheetMapper, TuidMapper} from '../mapper';
import {EntityUI} from './entityUI';
import {ActionUI} from './actionUI';
import {QueryUI} from './queryUI';
import {SheetUI} from './sheetUI';
import {TuidUI} from './tuidUI';

export class EntitiesUI {
    private defaultMapper:EntitiesMapper;
    private mapper?:EntitiesMapper;

    constructor(entities:Entities, defaultMapper:EntitiesMapper, mapper?:EntitiesMapper) {
        this.entities = entities;
        this.defaultMapper = defaultMapper;
        this.mapper = mapper || {};
        this.typeFieldMappers = _.clone(defaultMapper.typeFieldMappers);
        _.merge(this.typeFieldMappers, this.mapper.typeFieldMappers);
    }

    async loadEntities() {
        await this.entities.loadAccess();
        this.buildUI();
    }

    entities:Entities;
    mainPage:JSX.Element;
    caption:string;
    typeFieldMappers?: FieldMappers;
    action: EntitySet<Action, ActionUI>;
    query: EntitySet<Query, QueryUI>;
    sheet: EntitySet<Sheet, SheetUI>;
    tuid: EntitySet<Tuid, TuidUI>;

    private buildUI() {
        let d = this.defaultMapper;
        let m = this.mapper;
        this.caption = m.caption || (d.caption || 'Tonva Usql Entities');
        let MP = m.mainPage || d.mainPage;
        if (MP !== undefined) this.mainPage = <MP ui={this} />;
        else this.mainPage = <div>没有定义mainPage</div>;

        this.action = new ActionSetBuilder(this, this.entities.actionArr, d.action, m.action).build();
        this.query = new QuerySetBuilder(this, this.entities.queryArr, d.query, m.query).build();
        this.sheet = new SheetSetBuilder(this, this.entities.sheetArr, d.sheet, m.sheet).build();
        this.tuid = new TuidSetBuilder(this, this.entities.tuidArr, d.tuid, m.tuid).build();
    }
}

export interface EntitySet<E extends Entity, U extends EntityUI<E>> {
    caption: string;
    coll: {[name:string]: U};
    list: U[];
}

abstract class EntitySetBuilder<E extends Entity, U extends EntityUI<E>, T extends EntityMapper<E, U>> {
    protected entitiesUI:EntitiesUI;
    protected entityArr:E[];
    protected d:MapperContainer<E, U, T>;
    protected m:MapperContainer<E, U, T>;
    protected typeFieldMappers:FieldMappers;
    constructor(entitiesUI:EntitiesUI, entityArr:E[], d:MapperContainer<E, U, T>, m:MapperContainer<E, U, T>) {
        this.entitiesUI = entitiesUI;
        this.entityArr = entityArr;
        this.d = d || {};
        this.m = m || {};
        this.typeFieldMappers = this.buildTypeFieldMappers(this.entitiesUI.typeFieldMappers, this.d.mapper, this.m.mapper);
    }
    protected buildTypeFieldMappers(tfm:FieldMappers, mapper1:T, mapper2:T):FieldMappers {
        let dtfm = mapper1 && mapper1.typeFieldMappers;
        let mtfm = mapper2 && mapper2.typeFieldMappers;
        if (dtfm === undefined && mtfm === undefined)
            return tfm;
        let ret  = _.clone(tfm);
        _.merge(ret, dtfm);
        _.merge(ret, mtfm);
        return ret;
    }
    build():EntitySet<E, U> {
        function getMapper(name:string, mc: MapperContainer<E, U, T>):T {
            let {mapper, mappers} = mc;
            if (mappers !== undefined) return mappers[name] || mapper;
            return mapper;
        }
        let ret: EntitySet<E, U> = {caption:undefined, coll:{}, list:[]};
        let {coll, list} = ret;
        for (let entity of this.entityArr) {
            let name = entity.name;
            let mapper1:T = getMapper(name, this.d);
            let mapper2:T = getMapper(name, this.m);
            let u = this.buildUI(entity, mapper1 || {} as T, mapper2 || {} as T);
            coll[name] = u;
        }
        let nameList = this.d.list;
        if (nameList === undefined) {
            for (let n in coll) list.push(coll[n]);
            list.sort((a, b) => a.entity.name.localeCompare(b.entity.name));
        }
        else {
            for (let n in nameList) list.push(coll[n]);
        }
        ret.caption = this.m.caption || this.d.caption;
        return ret;
    }

    protected buildUI(entity:E, mapper1:T, mapper2:T):U {
        let ret = this.createUI();
        ret.entitiesUI = this.entitiesUI;
        ret.entity = entity;
        ret.caption = mapper2.caption || mapper1.caption || entity.name;
        ret.link = mapper2.link || mapper1.link;
        ret.mainPage = mapper2.mainPage || mapper1.mainPage;
        ret.typeFieldMappers = this.buildTypeFieldMappers(this.typeFieldMappers, mapper1, mapper2);

        /*
        let nfm1 = mapper1.fields;
        let nfm2 = mapper2.fields;
        if (nfm1 === undefined) {
            if (nfm2 !== undefined) 
                ret.nameFieldMappers = nfm2;
        }
        else {
            if (nfm2 === undefined)
                ret.nameFieldMappers = nfm1;
            else {
                ret.nameFieldMappers = _.merge({}, nfm1, nfm2);
            }
        }
        */
        return ret;
    }

    protected abstract createUI():U;
}

class ActionSetBuilder extends EntitySetBuilder<Action, ActionUI, ActionMapper> {
    build():EntitySet<Action, ActionUI> {
        let ret = super.build();
        return ret;
    }
    protected createUI():ActionUI {return new ActionUI();}
    protected buildUI(entity:Action, mapper1:ActionMapper, mapper2:ActionMapper):ActionUI {
        let ret = super.buildUI(entity, mapper1, mapper2);
        return ret;
    }
}
class QuerySetBuilder extends EntitySetBuilder<Query, QueryUI, QueryMapper> {
    build():EntitySet<Query, QueryUI> {
        let ret = super.build();
        return ret;
    }
    protected createUI():QueryUI {return new QueryUI();}
    protected buildUI(entity:Query, mapper1:QueryMapper, mapper2:QueryMapper):QueryUI {
        let ret = super.buildUI(entity, mapper1, mapper2);
        return ret;
    }
}
class SheetSetBuilder extends EntitySetBuilder<Sheet, SheetUI, SheetMapper> {
    build():EntitySet<Sheet, SheetUI> {
        let ret = super.build();
        return ret;
    }
    protected createUI():SheetUI {return new SheetUI();}
    protected buildUI(entity:Sheet, mapper1:SheetMapper, mapper2:SheetMapper):SheetUI {
        let ret = super.buildUI(entity, mapper1, mapper2);
        return ret;
    }
}
class TuidSetBuilder extends EntitySetBuilder<Tuid, TuidUI, TuidMapper> {
    build():EntitySet<Tuid, TuidUI> {
        let ret = super.build();
        return ret;
    }
    protected createUI():TuidUI {return new TuidUI();}
    protected buildUI(entity:Tuid, mapper1:TuidMapper, mapper2:TuidMapper):TuidUI {
        let ret = super.buildUI(entity, mapper1, mapper2);
        ret.editPage = mapper2.editPage || mapper1.editPage;
        ret.listPage = mapper2.listPage || mapper1.listPage;
        ret.idPick = mapper2.idPick || mapper2.idPick;

        let nfm1 = mapper1.uiFields;
        let nfm2 = mapper2.uiFields;
        if (nfm1 === undefined) {
            if (nfm2 !== undefined) 
                ret.nameFieldCompilers = nfm2;
        }
        else {
            if (nfm2 === undefined)
                ret.nameFieldCompilers = nfm1;
            else {
                ret.nameFieldCompilers = _.merge({}, nfm1, nfm2);
            }
        }
        return ret;
    }
}
