var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as React from 'react';
import { ViewModel } from './viewModel';
import { Entities } from '../entities';
import { Api } from 'tonva-tools';
import { List, Muted } from 'tonva-react-form';
import { VmTuidLink, VmActionLink, VmSheetLink, VmQueryLink } from './link';
import { VmTuid, VmAction, VmSheet, VmQuery, VmBook } from './entity';
import { VmForm } from './vmForm';
import { FormRowBuilder } from './vmForm/rowBuilder';
import { VmFormRowTuidInput, VmTuidInput, TuidContentJSON } from './tuid';
export class VmApi extends ViewModel {
    constructor(vmApp, url, api, access) {
        super();
        this.isSysVisible = false;
        this.vmApp = vmApp;
        this.url = url;
        this.api = api;
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
        let ws = undefined; // 新版没有ws了，webSocket都是从单一的中央过来的
        let _api = new Api(baseUrl, url, ws, apiOwner, apiName, true);
        this.entities = new Entities(_api, access);
    }
    load() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.entities.loadEntities();
            // 检查注册的entity viewModels
            let arr = [
                { regs: VmTuid.vmRegs, type: 'tuid' },
                { regs: VmSheet.vmRegs, type: 'sheet' },
                { regs: VmAction.vmRegs, type: 'action' },
                { regs: VmQuery.vmRegs, type: 'query' },
                { regs: VmBook.vmRegs, type: 'book' },
            ];
            for (let item of arr) {
                let { regs, type } = item;
                for (let i in regs) {
                    if (this.entities[type](i) === undefined) {
                        let vm = regs[i];
                        console.warn(type + ':' + '\'' + i + '\' is not usql entity, which register class ' + vm.name);
                    }
                }
            }
        });
    }
    getTuid(name) { return this.entities.tuid(name); }
    isVisible(entity) {
        return entity.sys !== true || this.isSysVisible;
    }
    get tuidTypeCaption() { return '数据字典'; }
    get vmTuidList() {
        return this.entities.tuidArr.filter(v => this.isVisible(v)).map(v => {
            return this.newVmTuidLink(this.newVmTuid(v));
        });
    }
    newVmTuidLink(vmTuid) {
        return new VmTuidLink(vmTuid);
        // 如果需要自己重载，继承类里面可以这么写：
        /*
        switch (tuid.name) {
            // 这里可以写自己特定的定义
            case 'xxx-xxx': return new VmXxx_XxxTuidLink(vmTuid);
            default: super.newVmTuidLink(vmTuid);
        }
        */
    }
    newVmTuid(tuid) {
        return VmTuid.create(this, tuid);
        // 如果需要自己重载，继承类里面可以这么写：
        /*
        switch (tuid.name) {
            // 这里可以写自己特定的定义
            case 'xxx-xxx': return new VmXxx_XxxTuid(tuid);
            default: super.newVmTuid(tuid);
        }
        */
    }
    get sheetTypeCaption() { return '凭单'; }
    newVmSheetLink(vmSheet) {
        return new VmSheetLink(vmSheet);
    }
    newVmSheet(sheet) {
        return new VmSheet(this, sheet);
    }
    get vmSheetList() {
        return this.entities.sheetArr.filter(v => this.isVisible(v)).map(v => {
            return this.newVmSheetLink(this.newVmSheet(v));
        });
    }
    get actionTypeCaption() { return '操作'; }
    newVmActionLink(vmAction) {
        return new VmActionLink(vmAction);
    }
    newVmAction(action) {
        return VmAction.create(this, action);
    }
    get vmActionList() {
        return this.entities.actionArr.filter(v => this.isVisible(v)).map(v => {
            return this.newVmActionLink(this.newVmAction(v));
        });
    }
    get queryTypeCaption() { return '查询'; }
    newVmQueryLink(vmQuery) {
        return new VmQueryLink(vmQuery);
    }
    newVmQuery(query) {
        return VmQuery.create(query.name, this, query);
    }
    get vmQueryList() {
        return this.entities.queryArr.filter(v => this.isVisible(v)).map(v => {
            return this.newVmQueryLink(this.newVmQuery(v));
        });
    }
    get bookTypeCaption() { return '帐 - 仅供调试程序使用，普通用户不可见'; }
    newVmBookLink(vmBook) {
        return new VmActionLink(vmBook);
    }
    newVmBook(book) {
        return new VmBook(this, book);
    }
    get vmBookList() {
        return this.entities.bookArr.filter(v => this.isVisible(v)).map(v => {
            return this.newVmBookLink(this.newVmBook(v));
        });
    }
    renderLink(vmLink, index) {
        return vmLink.renderView();
    }
    linkClick(vmLink) {
        vmLink.onClick();
    }
    typeVmTuidInput(field, tuid) {
        return VmTuidInput;
    }
    typeTuidContent(field, tuid) {
        return TuidContentJSON;
    }
    newFormRowBuilder() {
        return new VmApiFormRowBuilder(this);
    }
    get VmForm() {
        return VmForm;
    }
    renderView() {
        let linkItem = { render: this.renderLink, onClick: this.linkClick };
        return React.createElement(React.Fragment, null,
            React.createElement("div", { className: "px-3 py-1 small" }, this.api),
            React.createElement(List, { header: React.createElement(Muted, null, this.tuidTypeCaption), items: this.vmTuidList, item: linkItem }),
            React.createElement(List, { className: 'my-2', header: React.createElement(Muted, null, this.sheetTypeCaption), items: this.vmSheetList, item: linkItem }),
            React.createElement(List, { className: 'my-2', header: React.createElement(Muted, null, this.actionTypeCaption), items: this.vmActionList, item: linkItem }),
            React.createElement(List, { className: 'my-2', header: React.createElement(Muted, null, this.queryTypeCaption), items: this.vmQueryList, item: linkItem }),
            React.createElement(List, { className: 'mt-2 mb-4', header: React.createElement(Muted, null, this.bookTypeCaption), items: this.vmBookList, item: linkItem }));
    }
}
export class VmApiFormRowBuilder extends FormRowBuilder {
    constructor(vmApi) {
        super();
        this.vmApi = vmApi;
    }
    buildRow(vmForm, field, ui) {
        let ret;
        switch (field.type) {
            case 'bigint':
                ret = this.buildTuidInput(vmForm, field, ui);
                if (ret !== undefined)
                    return ret;
                break;
        }
        return super.buildRow(vmForm, field, ui);
    }
    typeVmTuidInput(field, tuid) {
        return this.vmApi.typeVmTuidInput(field, tuid);
    }
    typeTuidContent(field, tuid) {
        return this.vmApi.typeTuidContent(field, tuid);
    }
    buildTuidInput(vmForm, field, ui) {
        let tuidName = field.tuid;
        if (tuidName === undefined)
            return;
        let tuid = this.vmApi.getTuid(tuidName);
        return new VmFormRowTuidInput(this.vmApi, vmForm, field, ui, tuid, this.typeVmTuidInput(field, tuid), this.typeTuidContent(field, tuid));
    }
}
export class VmEntityFormRowBuilder extends VmApiFormRowBuilder {
    constructor(vmApi, vmEntity) {
        super(vmApi);
        this.vmEntity = vmEntity;
    }
    typeVmTuidInput(field, tuid) {
        return this.vmEntity.typeVmTuidInput(field, tuid);
    }
    typeTuidContent(field, tuid) {
        return this.vmEntity.typeTuidContent(field, tuid);
    }
}
//# sourceMappingURL=vmApi.js.map