import * as React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import * as _ from 'lodash';
import * as className from 'classnames';
import { Button } from 'reactstrap';
import { List, LMR } from 'tonva-react-form';
import { Page, nav } from 'tonva-tools';
import { Tuid, Book, Entity, Field, TuidBase } from '../../entities';
import { VmMap } from './vmMap';

class Item {
    parent: Item;
    tuid: TuidBase;
    id: any;
    isLeaf: boolean;
    keyIndex:number;
    @observable children: Item[] = [];
    values: any;
    constructor(parent:Item, tuid:TuidBase, id:any, keyIndex:number) {
        this.parent = parent;
        this.tuid = tuid;
        this.id = id;
        this.keyIndex = keyIndex;
        this.isLeaf = false;
    }
}
/*
class LeafItem extends Item {
    constructor(parent:Item, tuid:TuidBase, id:any, keyIndex:number, values:any) {
        super(parent, tuid, id, keyIndex);
        this.isLeaf = true;
        this.values = values;
    }
}*/
export class VmMapMain extends VmMap {
    items:Item[];
    keys: Field[];
    protected async beforeStart(param?:any) {
        let {keys} = this.entity;
        let q = this.entity.queries.all;
        let ret = (await q.query({})).ret;
        let keysLen = keys.length;
        this.keys = [];
        let retFields = q.returns[0].fields;
        for (let i=0; i<keysLen; i++) {
            this.keys.push(retFields[i]);
        }
        this.items = [];
        let item:Item = undefined;
        for (let r of ret) {
            let newItem = this.addItem(item, r);
            if (newItem !== undefined) {
                this.items.push(newItem);
                item = newItem;
            }
        }
    }
    private createItem(parent:Item, tuid:TuidBase, id:number, keyIndex:number, values?:any) {
        let item = new Item(parent, tuid, id, keyIndex);
        if (keyIndex === this.keys.length - 1) {
            item.isLeaf = true;
            item.values = values;
        }
        return item;
            
}
    addItem(item:Item, row:any):Item {
        let ret:Item = undefined;
        let keysLen = this.keys.length;
        let p = item;
        for (let i=0;i<keysLen;i++) {
            let key = this.keys[i];
            let {name} = key;
            let tuid = this.entity.getTuid(key);
            let val = row[name];
            if (val === undefined || val === 0) break;
            if (i === 0) {
                if (p === undefined || p.id !== val) {
                    ret = p = this.createItem(undefined, tuid, val, i, row);
                }
            }
            else {
                let create:boolean = false;
                let {children, id} = p;
                let len = children.length;
                if (len > 0) {
                    p = children[len-1];
                    if (p.id !== val) create = true;
                }
                else {
                    create = true;
                }
                if (create === true) {
                    children.push(p = this.createItem(p, tuid, val, i, row));
                }
            }
        }
        return ret;
    }
    view = MainPage;
    itemClick = async(item:Item) => {
        let {keyIndex, children} = item;
        let keysLen = this.keys.length;
        let keysLast = keysLen-1;
        let idx = keyIndex + 1;
        if (idx >= keysLen) return;
        let key = this.keys[idx];
        let tuid = key._tuid;
        let onTuidSelected = async (selecdItem:any) => {
            let id = tuid.getId(selecdItem);
            let data = {} as any;
            for (let p=item;p!==undefined;p=p.parent) {
                let {keyIndex:ki, id:pid} = p;
                data[this.keys[ki].name] = pid;
            }
            let arr1 = {} as any;
            if (keyIndex+1===keysLast) {
                arr1[key.name] = id;
            }
            else {
                data[key.name] = id;
                for (let i=idx+1;i<keysLast;i++)
                    data[this.keys[i].name] = 0;
                arr1[this.keys[keysLast].name] = 0;
            }
            data.arr1 = [arr1];
            await this.entity.actions.add.submit(data);
            if (children.find(v => v.id === id) === undefined) {
                tuid.useId(id);
                children.push(this.createItem(item, tuid, id, idx, undefined));
            }
            this.popPage();
        }
        let {owner} = tuid;
        if (owner !== undefined) {
            let onOwnerSelected = async (ownerItem:any) => {
                this.popPage();
                let ownerId = owner.getId(ownerItem);
                owner.useId(ownerId);
                let tuidSearch = this.vmApi.newVmTuidSearch(tuid, onTuidSelected);
                await tuidSearch.start(ownerId);
            }
            let ownerSearch = this.vmApi.newVmTuidSearch(owner, onOwnerSelected);
            await ownerSearch.start();
        }
        else {
            let tuidSearch = this.vmApi.newVmTuidSearch(tuid, onTuidSelected);
            await tuidSearch.start();
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
    let {tuid, id, children, isLeaf} = item;
    let val = tuid.valueFromId(id);
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
