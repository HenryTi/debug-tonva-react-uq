var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as React from 'react';
import { observer } from 'mobx-react';
import { SearchBox, List } from 'tonva-react-form';
import { Page, PagedItems } from 'tonva-tools';
import { VmTuid } from './vmTuid';
//export type TypeVmTuidList = typeof VmTuidList;
export class VmTuidSearch extends VmTuid {
    constructor() {
        super(...arguments);
        this.onSearch = (key) => __awaiter(this, void 0, void 0, function* () {
            yield this.pagedItems.first(key);
        });
        this.renderRow = (item, index) => {
            return React.createElement("div", { className: "px-3 py-2" }, JSON.stringify(item));
        };
        this.clickRow = (item) => {
            this.callOnSelected(item);
        };
        this.view = SearchPage;
    }
    init() {
        this.pagedItems = new TuidPagedItems(this.entity);
    }
    beforeStart(param) {
        return __awaiter(this, void 0, void 0, function* () {
            this.param = param;
            if (this.entity.owner !== undefined)
                this.ownerId = Number(param);
            // 初始查询, key是空的
            yield this.onSearch('');
        });
    }
    callOnSelected(item) {
        if (this.onSelected === undefined) {
            alert('onSelect is undefined');
            return;
        }
        this.onSelected(item);
    }
}
const Row = (item) => React.createElement("div", { className: "px-3 py-2" }, JSON.stringify(item));
const SearchPage = observer(({ vm }) => {
    let { label, entity, onSelected, renderRow, clickRow, pagedItems, onSearch, ownerId } = vm;
    let header = React.createElement(SearchBox, { className: "mx-1 w-100", initKey: '', onSearch: onSearch, placeholder: '搜索' + label });
    let { owner } = entity;
    let ownerTop;
    if (owner !== undefined) {
        let ownerObj = owner.valueFromId(ownerId);
        ownerTop = React.createElement("div", null,
            "owner: ",
            JSON.stringify(ownerObj));
    }
    return React.createElement(Page, { header: header },
        ownerTop,
        React.createElement(List, { items: pagedItems.items, item: { render: renderRow, onClick: clickRow }, before: '搜索' + label + '资料' }));
});
class TuidPagedItems extends PagedItems {
    constructor(tuid) {
        super();
        this.tuid = tuid;
    }
    load() {
        return __awaiter(this, void 0, void 0, function* () {
            let ret = yield this.tuid.search(this.param, this.pageStart, this.pageSize);
            return ret;
        });
    }
    setPageStart(item) {
        if (item === undefined)
            this.pageStart = 0;
    }
}
//# sourceMappingURL=vmTuidSearch.js.map