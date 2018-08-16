var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Api, nav } from "tonva-tools";
import { CoordinatorBase } from "../coordinator";
import { Entities } from "../../entities";
import { VmApi } from './crUsq';
import { VmEntityLink } from '../link';
import { VmQuerySearch, CrQuery } from '../query';
import { VmTuidSearch, CrTuid } from '../tuid';
import { CrBook } from '../book';
import { CrMap } from "../map";
import { CrSheet } from "../sheet";
export class CrApi extends CoordinatorBase {
    constructor(crApp, apiId, api, access, ui) {
        super();
        this.onLinkClick = (entity) => __awaiter(this, void 0, void 0, function* () {
            this.msg(entity.name);
        });
        this.isSysVisible = false;
        this.crApp = crApp;
        this.api = api;
        this.id = apiId;
        this.ui = ui;
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
        this.entities = new Entities(crApp.id, apiId, _api, access);
    }
    //vmApp: VmApp;
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
            this.vmUsq = new VmApi(this.api, this.buildAllLinks());
        });
    }
    startSheet(sheetTypeId, sheetId) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    tuidSearch(tuid, param) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                let onTuidSelected = (selecdValue) => __awaiter(this, void 0, void 0, function* () {
                    nav.pop();
                    resolve(selecdValue);
                });
                let { owner } = tuid;
                if (owner !== undefined) {
                    let onOwnerSelected = (ownerItem) => __awaiter(this, void 0, void 0, function* () {
                        nav.pop();
                        let ownerId = owner.getIdFromObj(ownerItem);
                        owner.useId(ownerId);
                        let tuidSearch = this.newVmTuidSearch(tuid, onTuidSelected);
                        yield tuidSearch.start(ownerId);
                    });
                    let ownerSearch = this.newVmTuidSearch(owner, onOwnerSelected);
                    ownerSearch.start(param);
                }
                else {
                    let tuidSearch = this.newVmTuidSearch(tuid, onTuidSelected);
                    tuidSearch.start(param);
                }
            });
        });
    }
    querySearch(query, param) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                let onSelected = (selecdValue) => __awaiter(this, void 0, void 0, function* () {
                    nav.pop();
                    resolve(selecdValue);
                });
                let search = this.newVmQuerySearch(query, onSelected);
                search.start(param);
            });
        });
    }
    newVmTuidSearch(tuid, onSelected) {
        let ui = this.getUI('tuid', tuid.name);
        let vm = ui && ui.search;
        if (vm === undefined)
            vm = VmTuidSearch;
        let ret = new vm(tuid, ui);
        ret.onSelected = onSelected;
        return ret;
    }
    newVmQuerySearch(query, onSelected) {
        let ui = this.getUI('query', query.name);
        let vm = ui && ui.search;
        if (vm === undefined)
            vm = VmQuerySearch;
        let ret = new vm(query, ui);
        ret.onSelected = onSelected;
        return ret;
    }
    buildAllLinks() {
        return {
            tuid: {
                caption: this.getUITypeCaption('tuid') || '数据字典',
                links: this.buildEntityLinks(this.entities.tuidArr)
            },
            action: {
                caption: this.getUITypeCaption('action') || '操作',
                links: this.buildEntityLinks(this.entities.actionArr),
            },
            sheet: {
                caption: this.getUITypeCaption('sheet') || '凭单',
                links: this.buildEntityLinks(this.entities.sheetArr),
            },
            map: {
                caption: this.getUITypeCaption('map') || '对照表',
                links: this.buildEntityLinks(this.entities.mapArr),
            },
            query: {
                caption: this.getUITypeCaption('query') || '查询',
                links: this.buildEntityLinks(this.entities.queryArr),
            },
            book: {
                caption: this.getUITypeCaption('book') || '帐 - 仅供调试程序使用，普通用户不可见',
                links: this.buildEntityLinks(this.entities.bookArr),
            },
        };
    }
    createLink(entity) {
        if (entity === undefined)
            return;
        let { typeName, name } = entity;
        let label, icon;
        let ui = this.getUI(typeName, name);
        if (ui !== undefined) {
            icon = ui.icon;
            label = ui.label;
        }
        else {
            label = name;
        }
        return new VmEntityLink(entity, this.onLinkClick, label, icon);
    }
    buildEntityLinks(entityArr) {
        return entityArr.filter(v => this.isVisible(v))
            .map(v => this.createLink(v));
    }
    vmLinkFromName(entityType, entityName) {
        return this.createLink(this.entities[entityType](entityName));
    }
    getUI(type, name) {
        if (this.ui === undefined)
            return;
        let t = this.ui[type];
        if (t === undefined)
            return;
        let { collection } = t;
        if (collection === undefined)
            return;
        return collection[name];
    }
    getUITypeCaption(type) {
        if (this.ui === undefined)
            return;
        let t = this.ui[type];
        if (t === undefined)
            return;
        let { caption } = t;
        return caption;
    }
    isVisible(entity) {
        return entity.sys !== true || this.isSysVisible;
    }
    createCrBook(entity) {
        return new CrBook(this, entity);
    }
    createCrMap(entity) {
        return new CrMap(this, entity);
    }
    createCrQuery(entity) {
        return new CrQuery(this, entity);
    }
    createCrSheet(entity) {
        return new CrSheet(this, entity);
    }
    createCrTuid(entity) {
        return new CrTuid(this, entity);
    }
    createCrEntity(entity) {
        switch (entity.typeName) {
            case 'book': return this.createCrBook(entity);
        }
    }
}
//# sourceMappingURL=crApi.js.map