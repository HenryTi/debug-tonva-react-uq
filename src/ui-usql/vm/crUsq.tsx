import * as React from 'react';
import * as _ from 'lodash';
import { Api, nav } from 'tonva-tools';
import { List, Muted } from 'tonva-react-form';
import { ViewModel, JSONContent, TypeContent } from './viewModel';
import { Entities, Tuid, Action, Sheet, Query, Book, Map, Entity, TuidBase } from '../entities';
import { VmLink, VmEntityLink } from './link';
import { CrBook, BookUI } from './book';
import { VmSheetMain, SheetUI, SheetActionUI } from './sheet';
import { ActionUI, CrAction } from './action';
import { QueryUI, VmQuerySearch, CrQuery } from './query';
import { VmTuidView } from './tuid';
import { VmTuidControl, TypeVmTuidControl, VmTuidPicker, PickerConfig } from './form';
import { VmEntity, EntityUI } from './vmEntity';
import { TuidUI } from './tuid';
import { VmMapMain, MapUI, CrMap } from './map';
import { VmTuidSearch } from './tuid/vmTuidSearch';
import { VmPage } from './vmPage';
import { CrApp } from './crApp';
import { CrTuid } from './tuid/crTuid';

export type EntityType = 'sheet' | 'action' | 'tuid' | 'query' | 'book' | 'map';

export class CrUsq {
    vmApp: CrApp;
    private access:string;
    private ui:any;
    private entities:Entities;

    constructor(vmApp:CrApp, apiId:number, api:string, access:string, ui:any) {
        //super();
        this.vmApp = vmApp;
        this.api = api;
        this.id = apiId;
        this.ui = ui;
        this.access = access;

        let token = undefined;
        let apiOwner:string, apiName:string;
        let p = api.split('/');
        switch (p.length) {
            case 1:
                apiOwner = '$$$';
                apiName = p[0];
                break;
            case 2:
                apiOwner = p[0];
                apiName = p[1];
                break;
            default:
                console.log('api must be apiOwner/apiName format');
                return;
        }

        let hash = document.location.hash;
        let baseUrl = hash===undefined || hash===''? 
            'debug/':'tv/';
        let _api = new Api(baseUrl, apiOwner, apiName, true);
        this.entities = new Entities(vmApp.id, apiId, _api, access);
    }

    api: string;
    id: number;
    //vmApp: VmApp;

    render() {
        if (this.view === undefined) return <div>??? viewModel 必须定义 view ???</div>
        return React.createElement(this.view, {vm: this});
    }

    async loadSchema() {
        await this.entities.load();

        for (let i in this.ui) {
            let g = this.ui[i];
            if (g === undefined) continue;
            let {caption, collection} = g;
            if (collection === undefined) continue;
            for (let j in collection) {
                if (this.entities[i](j) === undefined) {
                    console.warn(i + ':' + '\'' + j + '\' is not usql entity');
                }
            }
        }
    }

    getTuid(name:string) {return this.entities.tuid(name)}
    async getQuerySearch(name:string):Promise<Query> {
        let query = this.entities.query(name);
        if (query === undefined) 
            alert(`QUERY ${name} 没有定义!`);
        else {
            await query.loadSchema();
            let {returns} = query;
            if (returns.length > 1) {
                alert(`QUERY ${name} 返回多张表, 无法做QuerySearch`);
            }
        }
        return query;
    }

    protected isSysVisible = false;
    protected isVisible(entity: Entity):boolean {
        return entity.sys !== true || this.isSysVisible;
    }

    async navSheet(sheetTypeId:number, sheetId:number) {
        let sheet = this.entities.sheetFromTypeId(sheetTypeId);
        if (sheet === undefined) {
            alert('sheetTypeId ' + sheetTypeId + ' is not exists!');
            return;
        }
        let vmSheetMain = this.newVmSheet(sheet);
        await vmSheetMain.showSheet(sheetId);
}

    vmLinkFromName(entityType:EntityType, entityName:string) {
        switch (entityType) {
        case 'sheet':
            let sheet = this.entities.sheet(entityName);
            if (sheet === undefined) return;
            let vmSheetMain = this.newVmSheet(sheet);
            return new VmEntityLink(vmSheetMain);
        case 'action':
            let action = this.entities.action(entityName);
            if (action === undefined) return;
            let vmActionMain = this.newVmAction(action);
            return new VmEntityLink(vmActionMain);
        case 'tuid':
            let tuid = this.entities.tuid(entityName);
            if (tuid === undefined) return;
            let vmTuidMain = this.newVmTuid(tuid);
            return new VmEntityLink(vmTuidMain);
        case 'query':
            let query = this.entities.query(entityName);
            if (query === undefined) return;
            let vmQueryMain = this.newVmQuery(query);
            return new VmEntityLink(vmQueryMain);
        case 'book':
            let book = this.entities.book(entityName);
            if (book === undefined) return;
            let vmBookMain = this.newVmBook(book);
            return new VmEntityLink(vmBookMain);
        case 'map':
            let map = this.entities.map(entityName);
            if (map === undefined) return;
            let vmMapMain = this.newVmMap(map);
            return new VmEntityLink(vmMapMain);
        }
    }

    private getUI<T extends EntityUI>(type:string, name:string):T {
        if (this.ui === undefined) return;
        let t = this.ui[type];
        if (t === undefined) return;
        let {collection} = t;
        if (collection === undefined) return;
        return collection[name];
    }

    private getUITypeCaption(type:EntityType):any {
        if (this.ui === undefined) return;
        let t = this.ui[type];
        if (t === undefined) return;
        let {caption} = t;
        return caption;
    }

    get tuidTypeCaption() { return this.getUITypeCaption('tuid') || '数据字典';  }
    get vmTuidLinks() {
        return this.entities.tuidArr.filter(v => this.isVisible(v)).map(v => {
            return this.newVmTuidLink(this.newVmTuid(v))
        });
    }
    newVmTuidLink(vmTuid:CrTuid) {
        return new VmEntityLink(vmTuid);
    }
    newVmTuid(tuid:Tuid):CrTuid {
        let ui = this.getUI<TuidUI>('tuid', tuid.name);
        return new CrTuid(this, tuid, ui);
    }
    newVmTuidView(tuid:Tuid):VmTuidView {
        let ui = this.getUI<TuidUI>('tuid', tuid.name);
        let vm = ui && ui.view;
        if (vm === undefined) vm = VmTuidView;
        return new vm(this, tuid, ui);
    }

    get sheetTypeCaption() { return this.getUITypeCaption('sheet') || '凭单'; }
    protected newVmSheetLink(vmSheet:VmSheetMain) {
        return new VmEntityLink(vmSheet);
    }
    newVmSheet(sheet:Sheet):VmSheetMain {
        let ui = this.getUI<SheetUI>('sheet', sheet.name);
        let vm = ui && ui.main;
        if (vm === undefined) vm = VmSheetMain;
        return new vm(this, sheet, ui);
    }
    get vmSheetLinks() { 
        return this.entities.sheetArr.filter(v => this.isVisible(v)).map(v => {
            return this.newVmSheetLink(this.newVmSheet(v))
        });
    }

    get actionTypeCaption() { return this.getUITypeCaption('action') || '操作';  }
    newVmActionLink(crAction:CrAction) {
        return new VmEntityLink(crAction);
    }
    newVmAction(action:Action):CrAction {
        let ui = this.getUI<ActionUI>('action', action.name);
        //let vm = ui && ui.main;
        //if (vm === undefined) vm = VmActionMain;
        return new CrAction(this, action, ui);
    }
    get vmActionLinks() { 
        return this.entities.actionArr.filter(v => this.isVisible(v)).map(v => {
            return this.newVmActionLink(this.newVmAction(v))
        });
    }

    get queryTypeCaption() { return this.getUITypeCaption('query') || '查询' }
    newVmQueryLink(vmQuery:CrQuery) {
        return new VmEntityLink(vmQuery);
    }
    newVmQuery(query:Query):CrQuery {
        let ui = this.getUI<QueryUI>('query', query.name);
        return new CrQuery(this, query, ui);
    }
    get vmQueryLinks() { 
        return this.entities.queryArr.filter(v => this.isVisible(v)).map(v => {
            return this.newVmQueryLink(this.newVmQuery(v))
        });
    }
    
    get bookTypeCaption() { return this.getUITypeCaption('book') || '帐 - 仅供调试程序使用，普通用户不可见' }
    newVmBookLink(vmBook:CrBook) {
        return new VmEntityLink(vmBook);
    }
    newVmBook(book:Book):CrBook {
        let ui = this.getUI<BookUI>('book', book.name);
        return new CrBook(this, book, ui);
    }
    get vmBookLinks() { 
        return this.entities.bookArr.filter(v => this.isVisible(v)).map(v => {
            return this.newVmBookLink(this.newVmBook(v))
        });
    }
    
    get mapTypeCaption() { return this.getUITypeCaption('map') || '对照表' }
    newVmMapLink(vmMap:CrMap) {
        return new VmEntityLink(vmMap);
    }
    newVmMap(map:Map):CrMap {
        let ui = this.getUI<MapUI>('map', map.name);
        return new CrMap(this, map, ui);
    }
    get vmMapLinks() { 
        return this.entities.mapArr.filter(v => this.isVisible(v)).map(v => {
            return this.newVmMapLink(this.newVmMap(v))
        });
    }

    /*
    newVmSearch(entity:Entity, onSelected:(item:any)=>Promise<void>):VmPage {
        switch (entity.typeName) {
            case 'tuid': return this.newVmTuidSearch(entity as Tuid, onSelected);
            case 'query': return this.newVmQuerySearch(entity as Query, onSelected);
        }
    }*/
    
    newVmTuidSearch(tuid:TuidBase, onSelected:(item:any)=>Promise<void>):VmPage {
        let ui = this.getUI<TuidUI>('tuid', tuid.name);
        let vm = ui && ui.search;
        if (vm === undefined) vm = VmTuidSearch;
        let ret = undefined; // new vm(this, tuid, ui);
        ret.onSelected = onSelected;
        return ret;
    }
    crQuery(query:Query, onSelected:(item:any)=>Promise<void>):CrQuery {
        let ui = this.getUI<QueryUI>('query', query.name);
        let ret = new CrQuery(this, query, ui);
        //ret.onSelected = onSelected;
        return ret;
    }

    renderLink = (vmLink:VmLink, index:number):JSX.Element => {
        return vmLink.render();
    }

    linkClick = (vmLink:VmLink) => {
        vmLink.onClick();
    }

    typeVmTuidControl(tuid:Tuid): TypeVmTuidControl {
        let ui = this.getUI<TuidUI>('tuid', tuid.name);
        let typeVmTuidControl = ui && ui.input;
        if (typeVmTuidControl === undefined) typeVmTuidControl = VmTuidControl;
        return typeVmTuidControl;
    }

    pickerConfig(tuid:Tuid): PickerConfig {
        let ui = this.getUI<TuidUI>('tuid', tuid.name);
        let pickerConfig:PickerConfig = ui && ui.pickerConfig;
        let pc:PickerConfig = {
            picker: VmTuidPicker,
            row: JSONContent,
        };
        return _.merge(pc, pickerConfig);
    }

    typeTuidContent(tuid:Tuid): TypeContent {
        let ui = this.getUI<TuidUI>('tuid', tuid.name);
        let typeTuidContent = ui && ui.content;
        if (typeTuidContent === undefined) typeTuidContent = JSONContent;
        return typeTuidContent;
    }

    async create<T extends VmEntity>(vmType: new (crUsq:CrUsq, entity:Entity, ui:EntityUI) => T,
        entity:Entity, ui:EntityUI): Promise<T> {
        let vm = new vmType(this, entity, ui);
        //await vm.loadSchema();
        return vm;
    }

    navVm = async <T extends VmEntity> (vmType: new (crUsq:CrUsq, entity:Entity, ui:EntityUI) => T, 
    entity:Entity, ui:EntityUI, param?:any) => {
        let vm = await this.create<T>(vmType, entity, ui);
        await vm.start(param);
    }

    protected view = ApiView;

    async tuidSearch(tuid:TuidBase, param?:any):Promise<any> {
        return new Promise<any>((resolve, reject) => {
            let onTuidSelected = async (selecdValue:any) => {
                nav.pop();
                resolve(selecdValue);
            };
            let {owner} = tuid;
            if (owner !== undefined) {
                let onOwnerSelected = async (ownerItem:any) => {
                    nav.pop();
                    let ownerId = owner.getIdFromObj(ownerItem);
                    owner.useId(ownerId);
                    let tuidSearch = this.newVmTuidSearch(tuid, onTuidSelected);
                    await tuidSearch.start(ownerId);
                }
                let ownerSearch = this.newVmTuidSearch(owner, onOwnerSelected);
                ownerSearch.start(param);
            }
            else {
                let tuidSearch = this.newVmTuidSearch(tuid, onTuidSelected);
                tuidSearch.start(param);
            }
        });
    }
    
    async querySearch(query:Query, param?:any):Promise<any> {
        return new Promise<any>((resolve, reject) => {
            let onSelected = async (selecdValue:any) => {
                nav.pop();
                resolve(selecdValue);
            };
            let search = this.crQuery(query, onSelected);
            search.start(param);
        });
    }
}

const ApiView = ({vm}:{vm:CrUsq}) => {
    let {api, renderLink, linkClick, 
        tuidTypeCaption, vmTuidLinks,
        mapTypeCaption, vmMapLinks,
        sheetTypeCaption, vmSheetLinks,
        actionTypeCaption, vmActionLinks,
        queryTypeCaption, vmQueryLinks,
        bookTypeCaption, vmBookLinks
    } = vm;
    let linkItem = { render: renderLink, onClick: linkClick };
    let lists = [
        {
            header: tuidTypeCaption,
            items: vmTuidLinks,
        },
        {
            cn: 'my-2',
            header: mapTypeCaption,
            items: vmMapLinks,
        },
        {
            cn: 'my-2',
            header: sheetTypeCaption,
            items: vmSheetLinks
        },
        {
            cn: 'my-2',
            header: actionTypeCaption,
            items: vmActionLinks
        },
        {
            cn: 'my-2',
            header: queryTypeCaption,
            items: vmQueryLinks
        },
        {
            cn: 'mt-2 mb-4',
            header: bookTypeCaption,
            items: vmBookLinks
        }
    ];
    return <>
        <div className="px-3 py-1 small">{api}</div>
        {lists.map(({cn, header, items},index) => items.length > 0 && <List
            key={index}
            className={cn}
            header={<Muted>{header}</Muted>}
            items={items}
            item={linkItem} />
        )}
    </>;
}
