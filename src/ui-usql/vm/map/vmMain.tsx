import * as React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import * as _ from 'lodash';
import { Button } from 'reactstrap';
import { List, LMR } from 'tonva-react-form';
import { Tuid, Book, Entity, Field } from '../../entities';
import { VmEntity, vmLinkIcon } from '../vmEntity';
import { Page, nav } from 'tonva-tools';
import { VmApi } from '../vmApi';
import { VmMap } from './vmMap';

class Item {
    parent: Item;
    tuid: Tuid;
    id: any;
    isLeaf: boolean;
    keyIndex:number;
    @observable children: Item[] = [];
    values: any;
    constructor(parent:Item, tuid:Tuid, id:any, keyIndex:number) {
        this.parent = parent;
        this.tuid = tuid;
        this.id = id;
        this.keyIndex = keyIndex;
        this.isLeaf = false;
    }
}
class LeafItem extends Item {
    constructor(parent:Item, tuid:Tuid, id:any, keyIndex:number, values:any) {
        super(parent, tuid, id, keyIndex);
        this.isLeaf = true;
        this.values = values;
    }
}
export class VmMapMain extends VmMap {
    items:Item[];
    keys: Field[];
    protected async beforeStart(param?:any) {
        let {keys} = this.entity.schema;
        let q = this.entity.queries.all;
        let ret = (await q.query({})).ret;
        let keysLen = keys.length;
        this.keys = [];
        let retFields = q.schema.returns[0].fields;
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
    addItem(item:Item, row:any):Item {
        let ret:Item = undefined;
        let keysLen = this.keys.length;
        let p = item || {} as any;
        for (let i=0;i<keysLen;i++) {
            let key = this.keys[i];
            let {_tuid, name, tuid} = key;
            if (_tuid === undefined) _tuid = this.entity.getTuid(tuid);
            let val = row[name];
            if (val === undefined || val === 0) break;
            let {children, id} = p;
            let n:Item = (i === keysLen-1)?
                new LeafItem(p, _tuid, val, i, row) :
                new Item(i===0? undefined:p, _tuid, val, i);

            if (val !== id) {
                if (i===0)
                    ret = n;
                else
                    children.push(n);
            }
            else {
                let len = children.length;
                if (len === 0)
                    children.push(n);
                else
                    n = children[len-1];
            }
            p = n;
        }
        return ret;
    }
    view = MainPage;
    itemClick = async(item:Item) => {
        let {keyIndex, children} = item;
        let keysLen = this.keys.length;
        let keysLast = keysLen-1;
        if (keyIndex >= keysLen-1) return;
        let key = this.keys[keyIndex+1];
        let {_tuid, tuid} = key;
        if (_tuid === undefined) _tuid = this.entity.getTuid(tuid);
        let onTuidSelected = async (selecdItem:any) => {
            let id = _tuid.getId(selecdItem);
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
                for (let i=keyIndex+2;i<keysLast;i++)
                    data[this.keys[i].name] = 0;
                arr1[this.keys[keysLast].name] = 0;
            }
            data.arr1 = [arr1];
            await this.entity.actions.add.submit(data);
            if (children.find(v => v.id === id) === undefined) {
                _tuid.useId(id);
                let newItem = (keyIndex+1 === keysLast)?
                    new LeafItem(item, _tuid, id, keyIndex+1, undefined):
                    new Item(item, _tuid, id, keyIndex+1);
                children.push(newItem);
            }
            this.popPage();
        }
        let tuidSearch = this.vmApi.newVmTuidSearch(_tuid, onTuidSelected);
        tuidSearch.start();
    }
    itemRender = (item:Item, index:number) => {
        return <ItemRow vm={this} item={item} />;
    }
}

const MainPage = ({vm}:{vm:VmMapMain}) => {
    let {label, entity, items, itemClick, itemRender} = vm;
    return <Page header={label}>
        <List items={items} item={{className:'mb-3', onClick:undefined, render:itemRender}} />
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
    let content;
    if (isLeaf === true) {
        content = undefined; //<div className="ml-5">leaf</div>;
    }
    else {
        content = <List className="ml-5" items={children} item={{onClick:undefined, render:itemRender}} />
    }
    return <div className="d-flex flex-column">
        <LMR className="px-2 py-1 border-bottom" 
            left={<div className="py-1">{tuid.name} - {JSON.stringify(val)}</div>}
            right={right}
        />
        {content}
    </div>;
});
