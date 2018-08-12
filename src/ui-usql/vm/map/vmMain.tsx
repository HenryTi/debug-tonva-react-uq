import * as React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import * as _ from 'lodash';
import * as className from 'classnames';
import { Button } from 'reactstrap';
import { List, LMR } from 'tonva-react-form';
import { Page, nav } from 'tonva-tools';
import { Tuid, Book, Entity, Field, TuidBase, Box } from '../../entities';
import { VmMap } from './vmMap';
import { VmApi } from '../vmApi';
import { tuidSearch } from '../search';

class Item {
    parent: Item;
    tuid: TuidBase;
    box: Box;
    isLeaf: boolean;
    keyIndex:number;
    @observable children: Item[] = [];
    values: any;
    constructor(parent:Item, tuid:TuidBase, box:Box, keyIndex:number) {
        this.parent = parent;
        this.tuid = tuid;
        this.box = box;
        this.keyIndex = keyIndex;
        this.isLeaf = false;
    }
}

export class VmMapMain extends VmMap {
    items:Item[];
    keyFields: Field[];
    protected async beforeStart(param?:any) {
        let {keys} = this.entity;
        let q = this.entity.queries.all;
        let ret = (await q.query({})).ret;
        let keysLen = keys.length;
        this.keyFields = [];
        let retFields = q.returns[0].fields;
        for (let i=0; i<keysLen; i++) {
            this.keyFields.push(retFields[i]);
        }
        this.items = [];
        let item:Item = undefined;
        for (let r of ret) {
            let team = r.$team;
            let newItem = this.addItem(item, r);
            if (newItem !== undefined) {
                this.items.push(newItem);
                item = newItem;
            }
        }
    }
    private createItem(parent:Item, tuid:TuidBase, box:Box, keyIndex:number, values?:any) {
        let item = new Item(parent, tuid, box, keyIndex);
        if (keyIndex === this.keyFields.length - 1) {
            item.isLeaf = true;
            item.values = values;
        }
        return item;
    }

    addItem(item:Item, row:any):Item {
        let ret:Item = undefined;
        let keysLen = this.keyFields.length;
        let p = item;
        for (let i=0;i<keysLen;i++) {
            let key = this.keyFields[i];
            let {name} = key;
            let tuid = key._tuid;
            let val:Box = row[name];
            if (val === undefined) break;
            if (i === 0) {
                if (p === undefined || p.box.id !== val.id) {
                    ret = p = this.createItem(undefined, tuid, val, i, row);
                }
                continue;
            }
            let {children, box} = p;
            let len = children.length;
            if (len > 0) {
                let n = children[len-1];
                if (n.box.id === val.id) {
                    p = n;
                    continue;
                }
            }
            children.push(p = this.createItem(p, tuid, val, i, row));
        }
        return ret;
    }
    view = MainPage;
    /*
    protected keyQuery(key:Field):{queryName:string;idName:string} {
        return;
    }
    protected getSearchId(key:Field): (param:any)=>Promise<number> {
        let kq = this.keyQuery(key);
        if (kq !== undefined) {
            let {queryName,idName} = kq;
            let query = this.vmApi.getQuery(queryName);
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
                let search = new QuerySearch(this.vmApi, query);
                let ret = await search.result(param);
                return ret[idName].id;
            };
        }
        return async (param:any):Promise<number> => {
            let search = new TuidSearch(this.vmApi, key._tuid);
            // 怎么把搜索关键字传进来, 还需要考虑
            let ret = await search.result('');
            return key._tuid.getIdFromObj(ret);
        };
    }
    */
    async searchOnKey(keyField:Field, param):Promise<number> {
        let {_tuid} = keyField;
        let val = await tuidSearch(this.vmApi, _tuid, param);
        return _tuid.getIdFromObj(val);
    }
    itemClick = async(item:Item) => {
        let {keyIndex, children} = item;
        let keysLen = this.keyFields.length;
        let keysLast = keysLen-1;
        let idx = keyIndex + 1;
        if (idx >= keysLen) return;
        let keyField = this.keyFields[idx];
        let tuid = keyField._tuid;
        let data = {} as any;
        for (let p=item;p!==undefined;p=p.parent) {
            let {keyIndex:ki, box} = p;
            data[this.keyFields[ki].name] = box.id;
        }
        //let searchId = await this.getSearchId(key);
        //let id = await searchId(data);
        //let id = await searchId(data);
        let id = await this.searchOnKey(keyField, data);

        let arr1 = {} as any;
        if (keyIndex+1===keysLast) {
            arr1[keyField.name] = id;
        }
        else {
            data[keyField.name] = id;
            for (let i=idx+1;i<keysLast;i++)
                data[this.keyFields[i].name] = 0;
            arr1[this.keyFields[keysLast].name] = 0;
        }
        data.arr1 = [arr1];
        await this.entity.actions.add.submit(data);
        if (children.find(v => v.box.id === id) === undefined) {
            tuid.useId(id);
            children.push(this.createItem(item, tuid, tuid.createID(id), idx, undefined));
        }
    }
    itemRender = (item:Item, index:number) => {
        return <ItemRow vm={this} item={item} />;
    }
}

const MainPage = ({vm}:{vm:VmMapMain}) => {
    let {label, entity, items, itemClick, itemRender} = vm;
    return <Page header={label}>
        <List items={items} item={{className:'my-2', onClick:undefined, render:itemRender}} />
    </Page>;
} 
/*<pre>
{JSON.stringify(entity.schema, undefined, '    ')}
</pre>*/

const ItemRow = observer(({vm, item}: {vm:VmMapMain, item:Item}) => {
    let {itemClick, itemRender} = vm;
    let {tuid, box, children, isLeaf} = item;
    let val = tuid.valueFromId(box.id);
    let right;
    if (isLeaf === false) {
        right = <Button color="info" size="sm" onClick={()=>itemClick(item)}>+</Button>;
    }
    let content, border;
    if (isLeaf === true) {
        content = undefined; //<div className="ml-5">leaf</div>;
    }
    else {
        border = "border-bottom"
        content = <List className="ml-4" items={children} item={{onClick:undefined, render:itemRender}} />
    }
    return <div className="d-flex flex-column">
        <LMR className={className('px-2', 'py-1', border)} 
            left={<div className="py-1">{tuid.name} - {JSON.stringify(val)}</div>}
            right={right}
        />
        {content}
    </div>;
});
