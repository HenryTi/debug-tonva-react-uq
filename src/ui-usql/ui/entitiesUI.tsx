import * as React from 'react';
import {Entities, Entity, Tuid, Action, Sheet, Query} from '../entities';
import {EntitiesMapper, MapperContainer, EntityMapper, ActionMapper, QueryMapper, SheetMapper, TuidMapper} from '../mapper';
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
    }

    async loadEntities() {
        await this.entities.loadAccess();
        this.buildUI();
    }

    entities:Entities;
    mainPage:JSX.Element;
    caption:string;
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
    constructor(entitiesUI:EntitiesUI, entityArr:E[], d:MapperContainer<E, U, T>, m:MapperContainer<E, U, T>) {
        this.entitiesUI = entitiesUI;
        this.entityArr = entityArr;
        this.d = d || {};
        this.m = m || {};
    }
    build():EntitySet<E, U> {
        function getMapper(mc: MapperContainer<E, U, T>):T {
            let {mapper, mappers} = mc;
            if (mappers !== undefined) return mappers[name] || mapper;
            return mapper;
        }
        let ret: EntitySet<E, U> = {caption:undefined, coll:{}, list:[]};
        let {coll, list} = ret;
        for (let entity of this.entityArr) {
            let name = entity.name;
            let mapper:T = getMapper(this.m);
            if (mapper === undefined) mapper = getMapper(this.d);
            let u = this.buildUI(entity, mapper);
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

    protected buildUI(entity:E, mapper:T):U {
        let ret = this.createUI();
        ret.entitiesUI = this.entitiesUI;
        ret.entity = entity;
        if (mapper === undefined) {

            ret.caption = entity.name;
        }
        else {
            ret.caption = mapper.caption || entity.name;
            ret.link = mapper.link;
            ret.mainPage = mapper.mainPage;
        }
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
    protected buildUI(entity:Action, mapper:ActionMapper):ActionUI {
        let ret = super.buildUI(entity, mapper);
        return ret;
    }
}
class QuerySetBuilder extends EntitySetBuilder<Query, QueryUI, QueryMapper> {
    build():EntitySet<Query, QueryUI> {
        let ret = super.build();
        return ret;
    }
    protected createUI():QueryUI {return new QueryUI();}
    protected buildUI(entity:Query, mapper:QueryMapper):QueryUI {
        let ret = super.buildUI(entity, mapper);
        return ret;
    }
}
class SheetSetBuilder extends EntitySetBuilder<Sheet, SheetUI, SheetMapper> {
    build():EntitySet<Sheet, SheetUI> {
        let ret = super.build();
        return ret;
    }
    protected createUI():SheetUI {return new SheetUI();}
    protected buildUI(entity:Sheet, mapper:SheetMapper):SheetUI {
        let ret = super.buildUI(entity, mapper);
        return ret;
    }
}
class TuidSetBuilder extends EntitySetBuilder<Tuid, TuidUI, TuidMapper> {
    build():EntitySet<Tuid, TuidUI> {
        let ret = super.build();
        return ret;
    }
    protected createUI():TuidUI {return new TuidUI();}
    protected buildUI(entity:Tuid, mapper:TuidMapper):TuidUI {
        let ret = super.buildUI(entity, mapper);
        ret.editPage = mapper.editPage;
        ret.listPage = mapper.listPage;
        ret.idPick = mapper.idPick;
        return ret;
    }
}
