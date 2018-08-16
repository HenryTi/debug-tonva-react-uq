var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
//import * as _ from 'lodash';
import * as className from 'classnames';
import { Button } from 'reactstrap';
import { List, LMR } from 'tonva-react-form';
import { Page } from 'tonva-tools';
import { VmMap } from './vmMap';
//import { CrUsq } from '../crUsq';
//import { tuidSearch } from '../search';
class Item {
    constructor(parent, tuid, box, keyIndex) {
        this.children = [];
        this.parent = parent;
        this.tuid = tuid;
        this.box = box;
        this.keyIndex = keyIndex;
        this.isLeaf = false;
    }
}
__decorate([
    observable
], Item.prototype, "children", void 0);
export class VmMapMain extends VmMap {
    constructor() {
        super(...arguments);
        this.itemClick = (item) => __awaiter(this, void 0, void 0, function* () {
            let { keyIndex, children } = item;
            let keysLen = this.keyFields.length;
            let keysLast = keysLen - 1;
            let idx = keyIndex + 1;
            if (idx >= keysLen)
                return;
            let keyField = this.keyFields[idx];
            let tuid = keyField._tuid;
            let data = {};
            for (let p = item; p !== undefined; p = p.parent) {
                let { keyIndex: ki, box } = p;
                data[this.keyFields[ki].name] = box.id;
            }
            //let searchId = await this.getSearchId(key);
            //let id = await searchId(data);
            //let id = await searchId(data);
            let id = yield this.searchOnKey(keyField, data);
            let arr1 = {};
            if (keyIndex + 1 === keysLast) {
                arr1[keyField.name] = id;
            }
            else {
                data[keyField.name] = id;
                for (let i = idx + 1; i < keysLast; i++)
                    data[this.keyFields[i].name] = 0;
                arr1[this.keyFields[keysLast].name] = 0;
            }
            data.arr1 = [arr1];
            yield this.entity.actions.add.submit(data);
            if (children.find(v => v.box.id === id) === undefined) {
                tuid.useId(id);
                children.push(this.createItem(item, tuid, tuid.createID(id), idx, undefined));
            }
        });
        this.itemRender = (item, index) => {
            return React.createElement(this.ItemRow, { item: item });
        };
        this.ItemRow = observer(({ item }) => {
            //let {itemClick, itemRender} = vm;
            let { tuid, box, children, isLeaf } = item;
            let val = tuid.valueFromId(box.id);
            let right;
            if (isLeaf === false) {
                right = React.createElement(Button, { color: "info", size: "sm", onClick: () => this.itemClick(item) }, "+");
            }
            let content, border;
            if (isLeaf === true) {
                content = undefined; //<div className="ml-5">leaf</div>;
            }
            else {
                border = "border-bottom";
                content = React.createElement(List, { className: "ml-4", items: children, item: { onClick: undefined, render: this.itemRender } });
            }
            return React.createElement("div", { className: "d-flex flex-column" },
                React.createElement(LMR, { className: className('px-2', 'py-1', border), left: React.createElement("div", { className: "py-1" },
                        tuid.name,
                        " - ",
                        JSON.stringify(val)), right: right }),
                content);
        });
    }
    beforeStart(param) {
        return __awaiter(this, void 0, void 0, function* () {
            let { keys } = this.entity;
            let q = this.entity.queries.all;
            let ret = (yield q.query({})).ret;
            let keysLen = keys.length;
            this.keyFields = [];
            let retFields = q.returns[0].fields;
            for (let i = 0; i < keysLen; i++) {
                this.keyFields.push(retFields[i]);
            }
            this.items = [];
            let item = undefined;
            for (let r of ret) {
                let team = r.$team;
                let newItem = this.addItem(item, r);
                if (newItem !== undefined) {
                    this.items.push(newItem);
                    item = newItem;
                }
            }
        });
    }
    createItem(parent, tuid, box, keyIndex, values) {
        let item = new Item(parent, tuid, box, keyIndex);
        if (keyIndex === this.keyFields.length - 1) {
            item.isLeaf = true;
            item.values = values;
        }
        return item;
    }
    addItem(item, row) {
        let ret = undefined;
        let keysLen = this.keyFields.length;
        let p = item;
        for (let i = 0; i < keysLen; i++) {
            let key = this.keyFields[i];
            let { name } = key;
            let tuid = key._tuid;
            let val = row[name];
            if (val === undefined)
                break;
            if (i === 0) {
                if (p === undefined || p.box.id !== val.id) {
                    ret = p = this.createItem(undefined, tuid, val, i, row);
                }
                continue;
            }
            let { children, box } = p;
            let len = children.length;
            if (len > 0) {
                let n = children[len - 1];
                if (n.box.id === val.id) {
                    p = n;
                    continue;
                }
            }
            children.push(p = this.createItem(p, tuid, val, i, row));
        }
        return ret;
    }
    /*
    protected keyQuery(key:Field):{queryName:string;idName:string} {
        return;
    }
    protected getSearchId(key:Field): (param:any)=>Promise<number> {
        let kq = this.keyQuery(key);
        if (kq !== undefined) {
            let {queryName,idName} = kq;
            let query = this.crUsq.getQuery(queryName);
            return async (param:any):Promise<number> => {
                await query.loadSchema();
                if (query === undefined)
                    alert('QUERY ' + queryName + ' 没有定义!');
                else {
                    let {returns} = query;
                    if (returns.length > 1) {
                        alert('QUERY ' + queryName + ' 返回多张表, 无法做QuerySearch')
                    }
                }
                let search = new QuerySearch(this.crUsq, query);
                let ret = await search.result(param);
                return ret[idName].id;
            };
        }
        return async (param:any):Promise<number> => {
            let search = new TuidSearch(this.crUsq, key._tuid);
            // 怎么把搜索关键字传进来, 还需要考虑
            let ret = await search.result('');
            return key._tuid.getIdFromObj(ret);
        };
    }
    */
    searchOnKey(keyField, param) {
        return __awaiter(this, void 0, void 0, function* () {
            let { _tuid } = keyField;
            let val = yield this.crUsq.tuidSearch(_tuid, param);
            return _tuid.getIdFromObj(val);
        });
    }
    get view() {
        return () => React.createElement(Page, { header: this.label },
            React.createElement(List, { items: this.items, item: { className: 'my-2', onClick: undefined, render: this.itemRender } }));
    }
    ;
}
const MainPage = ({ vm }) => {
    let { label, entity, items, itemClick, itemRender } = vm;
    return React.createElement(Page, { header: label },
        React.createElement(List, { items: items, item: { className: 'my-2', onClick: undefined, render: itemRender } }));
};
/*<pre>
{JSON.stringify(entity.schema, undefined, '    ')}
</pre>*/
const ItemRow = observer(({ vm, item }) => {
    let { itemClick, itemRender } = vm;
    let { tuid, box, children, isLeaf } = item;
    let val = tuid.valueFromId(box.id);
    let right;
    if (isLeaf === false) {
        right = React.createElement(Button, { color: "info", size: "sm", onClick: () => itemClick(item) }, "+");
    }
    let content, border;
    if (isLeaf === true) {
        content = undefined; //<div className="ml-5">leaf</div>;
    }
    else {
        border = "border-bottom";
        content = React.createElement(List, { className: "ml-4", items: children, item: { onClick: undefined, render: itemRender } });
    }
    return React.createElement("div", { className: "d-flex flex-column" },
        React.createElement(LMR, { className: className('px-2', 'py-1', border), left: React.createElement("div", { className: "py-1" },
                tuid.name,
                " - ",
                JSON.stringify(val)), right: right }),
        content);
});
//# sourceMappingURL=vmMain.js.map