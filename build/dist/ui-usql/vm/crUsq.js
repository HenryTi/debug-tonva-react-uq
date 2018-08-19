var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as React from 'react';
import { Api } from 'tonva-tools';
import { List, Muted } from 'tonva-react-form';
import { Entities } from '../entities';
import { VmEntityLink } from './link';
import { CrBook } from './book';
import { CrSheet } from './sheet';
import { CrAction } from './action';
import { CrQuery } from './query';
import { CrTuid } from './tuid';
import { CrMap } from './map';
export class CrUsq {
    constructor(vmApp, apiId, api, access, ui) {
        this.isSysVisible = false;
        this.view = () => {
            let linkItem = {
                render: (vmLink, index) => vmLink.render(),
                onClick: (vmLink) => vmLink.onClick()
            };
            let lists = [
                {
                    header: this.res.tuid || 'TUID',
                    items: this.vmTuidLinks,
                },
                {
                    cn: 'my-2',
                    header: this.res.map || 'MAP',
                    items: this.vmMapLinks,
                },
                {
                    cn: 'my-2',
                    header: this.res.sheet || 'SHEET',
                    items: this.vmSheetLinks
                },
                {
                    cn: 'my-2',
                    header: this.res.action || 'ACTION',
                    items: this.vmActionLinks
                },
                {
                    cn: 'my-2',
                    header: this.res.query || 'QUERY',
                    items: this.vmQueryLinks
                },
                {
                    cn: 'mt-2 mb-4',
                    header: this.res.book || 'BOOK',
                    items: this.vmBookLinks
                }
            ];
            return React.createElement(React.Fragment, null,
                React.createElement("div", { className: "px-3 py-1 small" }, this.res.usq || this.api),
                lists.map(({ cn, header, items }, index) => items.length > 0 && React.createElement(List, { key: index, className: cn, header: React.createElement(Muted, null, header), items: items, item: linkItem })));
        };
        //super();
        this.vmApp = vmApp;
        this.api = api;
        this.id = apiId;
        this.ui = ui;
        if (ui === undefined)
            this.ui = {};
        else if (ui.res !== undefined)
            this.res = ui.res.zh.CN;
        this.res = this.res || {};
        this.access = access;
        let token = undefined;
        let apiOwner, apiName;
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
        let baseUrl = hash === undefined || hash === '' ?
            'debug/' : 'tv/';
        let _api = new Api(baseUrl, apiOwner, apiName, true);
        this.entities = new Entities(vmApp.id, apiId, _api, access);
    }
    loadSchema() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.entities.load();
            for (let i in this.ui) {
                let g = this.ui[i];
                if (g === undefined)
                    continue;
                let { caption, collection } = g;
                if (collection === undefined)
                    continue;
                for (let j in collection) {
                    if (this.entities[i](j) === undefined) {
                        console.warn(i + ':' + '\'' + j + '\' is not usql entity');
                    }
                }
            }
        });
    }
    getTuid(name) { return this.entities.tuid(name); }
    getQuerySearch(name) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = this.entities.query(name);
            if (query === undefined)
                alert(`QUERY ${name} 没有定义!`);
            else {
                yield query.loadSchema();
                let { returns } = query;
                if (returns.length > 1) {
                    alert(`QUERY ${name} 返回多张表, 无法做QuerySearch`);
                }
            }
            return query;
        });
    }
    isVisible(entity) {
        return entity.sys !== true || this.isSysVisible;
    }
    navSheet(sheetTypeId, sheetId) {
        return __awaiter(this, void 0, void 0, function* () {
            let sheet = this.entities.sheetFromTypeId(sheetTypeId);
            if (sheet === undefined) {
                alert('sheetTypeId ' + sheetTypeId + ' is not exists!');
                return;
            }
            let vmSheetMain = this.crSheet(sheet);
            yield vmSheetMain.showSheet(sheetId);
        });
    }
    vmLinkFromName(entityType, entityName) {
        switch (entityType) {
            case 'sheet':
                let sheet = this.entities.sheet(entityName);
                if (sheet === undefined)
                    return;
                return this.vmLink(this.crSheet(sheet));
            case 'action':
                let action = this.entities.action(entityName);
                if (action === undefined)
                    return;
                return this.vmLink(this.crAction(action));
            case 'tuid':
                let tuid = this.entities.tuid(entityName);
                if (tuid === undefined)
                    return;
                return this.vmLink(this.ctTuid(tuid));
            case 'query':
                let query = this.entities.query(entityName);
                if (query === undefined)
                    return;
                return this.vmLink(this.crQuery(query));
            case 'book':
                let book = this.entities.book(entityName);
                if (book === undefined)
                    return;
                return this.vmLink(this.crBook(book));
            case 'map':
                let map = this.entities.map(entityName);
                if (map === undefined)
                    return;
                return this.vmLink(this.crMap(map));
        }
    }
    getUI(t) {
        let ui, res;
        let { name, typeName } = t;
        if (this.ui !== undefined) {
            let tUI = this.ui[typeName];
            if (tUI !== undefined) {
                ui = tUI[name];
            }
        }
        let { entity } = this.res;
        if (entity !== undefined) {
            res = entity[name];
            //if (res !== undefined) debugger;
        }
        return { ui: ui, res: res };
    }
    /*
    private getUITypeCaption(type:EntityType):any {
        if (this.res === undefined) return;
        return this.res[type];
    }
    */
    vmLink(crEntity) {
        return new VmEntityLink(crEntity);
    }
    get vmTuidLinks() {
        return this.entities.tuidArr.filter(v => this.isVisible(v)).map(v => this.vmLink(this.ctTuid(v)));
    }
    ctTuid(tuid) {
        let { ui, res } = this.getUI(tuid);
        return new CrTuid(this, tuid, ui, res);
    }
    /*
    newVmTuidView(tuid:Tuid):VmTuidView {
        let ui = this.getUI<TuidUI>('tuid', tuid.name);
        let vm = ui && ui.view;
        if (vm === undefined) vm = VmTuidView;
        return new vm(this, tuid, ui);
    }*/
    //get sheetTypeCaption() { return this.getUITypeCaption('sheet') || '凭单'; }
    //protected newVmSheetLink(vmSheet:CrSheet) {
    //    return new VmEntityLink(vmSheet);
    //}
    crSheet(sheet) {
        let { ui, res } = this.getUI(sheet);
        return new CrSheet(this, sheet, ui, res);
    }
    get vmSheetLinks() {
        return this.entities.sheetArr.filter(v => this.isVisible(v)).map(v => {
            return this.vmLink(this.crSheet(v));
        });
    }
    crAction(action) {
        let { ui, res } = this.getUI(action);
        return new CrAction(this, action, ui, res);
    }
    get vmActionLinks() {
        return this.entities.actionArr.filter(v => this.isVisible(v)).map(v => {
            return this.vmLink(this.crAction(v));
        });
    }
    crQuery(query) {
        let { ui, res } = this.getUI(query);
        return new CrQuery(this, query, ui, res);
    }
    get vmQueryLinks() {
        return this.entities.queryArr.filter(v => this.isVisible(v)).map(v => {
            return this.vmLink(this.crQuery(v));
        });
    }
    //get bookTypeCaption() { return this.getUITypeCaption('book') || '帐 - 仅供调试程序使用，普通用户不可见' }
    //newVmBookLink(vmBook:CrBook) {
    //    return new VmEntityLink(vmBook);
    //}
    crBook(book) {
        let { ui, res } = this.getUI(book);
        return new CrBook(this, book, ui, res);
    }
    get vmBookLinks() {
        return this.entities.bookArr.filter(v => this.isVisible(v)).map(v => {
            return this.vmLink(this.crBook(v));
        });
    }
    /*
    get mapTypeCaption() { return this.getUITypeCaption('map') || '对照表' }
    newVmMapLink(vmMap:CrMap) {
        return new VmEntityLink(vmMap);
    }*/
    crMap(map) {
        let { ui, res } = this.getUI(map);
        return new CrMap(this, map, ui, res);
    }
    get vmMapLinks() {
        return this.entities.mapArr.filter(v => this.isVisible(v)).map(v => {
            return this.vmLink(this.crMap(v));
        });
    }
    /*
    newVmSearch(entity:Entity, onSelected:(item:any)=>Promise<void>):VmPage {
        switch (entity.typeName) {
            case 'tuid': return this.newVmTuidSearch(entity as Tuid, onSelected);
            case 'query': return this.newVmQuerySearch(entity as Query, onSelected);
        }
    }*/
    /*
    newVmTuidSearch(tuid:TuidBase, onSelected:(item:any)=>Promise<void>):VmPage {
        let ui = this.getUI<TuidUI>('tuid', tuid.name);
        //let vm = ui && ui.search;
        //if (vm === undefined) vm = VmTuidSearch;
        let ret = undefined; // new vm(this, tuid, ui);
        ret.onSelected = onSelected;
        return ret;
    }
    crQuery(query:Query, onSelected:(item:any)=>Promise<void>):CrQuery {
        let {ui, res} = this.getUI<QueryUI>('query', query.name);
        let ret = new CrQuery(this, query, ui, res);
        //ret.onSelected = onSelected;
        return ret;
    }
    */
    /*
    typeVmTuidControl(tuid:Tuid): TypeVmTuidControl {
        let {ui, res} = this.getUI<TuidUI>('tuid', tuid.name);
        let typeVmTuidControl = undefined; //ui && ui.input;
        if (typeVmTuidControl === undefined) typeVmTuidControl = VmTuidControl;
        return typeVmTuidControl;
    }

    pickerConfig(tuid:Tuid): PickerConfig {
        let {ui, res} = this.getUI<TuidUI>('tuid', tuid.name);
        let pickerConfig:PickerConfig = undefined; //ui && ui.pickerConfig;
        let pc:PickerConfig = {
            picker: VmTuidPicker,
            row: JSONContent,
        };
        return _.merge(pc, pickerConfig);
    }
    */
    /*
    typeTuidContent(tuid:Tuid): TypeContent {
        let {ui, res} = this.getUI<TuidUI>('tuid', tuid.name);
        let typeTuidContent = ui && ui.content;
        if (typeTuidContent === undefined) typeTuidContent = JSONContent;
        return typeTuidContent;
    }*/
    /*
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
    */
    render() {
        if (this.view === undefined)
            return React.createElement("div", null, "??? viewModel \u5FC5\u987B\u5B9A\u4E49 view ???");
        return React.createElement(this.view);
    }
}
//# sourceMappingURL=crUsq.js.map