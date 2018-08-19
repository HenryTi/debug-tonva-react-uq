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
import { VmEntity } from '../VM';
//export type TypeVmTuidList = typeof VmTuidList;
export class VmQuerySelect extends VmEntity {
    constructor() {
        super(...arguments);
        this.onSearch = (key) => __awaiter(this, void 0, void 0, function* () {
            yield this.pagedItems.first(key);
        });
        this.renderRow = (item, index) => {
            return React.createElement(Row, { item: item, vm: this });
        };
        this.clickRow = (item) => {
            this.callOnSelected(item);
        };
        this.view = () => {
            //let {label, entity, onSelected, renderRow, clickRow, pagedItems, onSearch, ownerId} = vm;
            let header = React.createElement(SearchBox, { className: "mx-1 w-100", initKey: '', onSearch: this.onSearch, placeholder: '搜索' + this.label });
            return React.createElement(Page, { header: header },
                React.createElement(List, { items: this.pagedItems.items, item: { render: this.renderRow, onClick: this.clickRow }, before: '搜索' + this.label + '资料' }));
        };
    }
    showEntry(param) {
        return __awaiter(this, void 0, void 0, function* () {
            this.entity = this.coordinator.entity;
            this.pagedItems = new QueryPagedItems(this.entity);
            //if (this.entity.owner !== undefined) this.ownerId = Number(param);
            yield this.onSearch(param);
            this.open(this.view);
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
const Row = observer(({ item, vm }) => {
    /*
    let {entity} = vm;
    let fields = entity.returns[0].fields;
    let vItem = {} as any;
    for (let f of fields) {
        let {name, _tuid} = f;
        let v = item[name];
        if (_tuid !== undefined && typeof v !== 'object') {
            v = _tuid.valueFromId(v);
        }
        vItem[name] = v;
    }*/
    return React.createElement("div", { className: "px-3 py-2" },
        "post:",
        JSON.stringify(item.$post),
        " - ",
        JSON.stringify(item));
});
class QueryPagedItems extends PagedItems {
    constructor(query) {
        super();
        this.query = query;
    }
    load() {
        return __awaiter(this, void 0, void 0, function* () {
            let ret;
            if (this.query.isPaged === true)
                ret = yield this.query.page(this.param, this.pageStart, this.pageSize);
            else {
                ret = yield this.query.query(this.param);
                ret = ret[this.query.returns[0].name];
            }
            return ret;
        });
    }
    setPageStart(item) {
        if (item === undefined)
            this.pageStart = 0;
    }
}
//# sourceMappingURL=vmQuerySelect.js.map