import * as React from 'react';
import { observer } from 'mobx-react';
import { FA, SearchBox, List } from 'tonva-react-form';
import { Tuid, Entity, TuidBase } from '../../entities';
import { Page, PagedItems } from 'tonva-tools';
import { VmTuid } from './vmTuid';

//export type TypeVmTuidList = typeof VmTuidList;

export class VmTuidSearch extends VmTuid {
    pagedItems:TuidPagedItems;
    ownerId: number;

    protected init() {
        this.pagedItems = new TuidPagedItems(this.entity);
    }

    protected async beforeStart(param?:any) {
        if (this.entity.owner !== undefined) this.ownerId = Number(param);
        await this.onSearch(param);
    }
    onSearch = async (key:string) => {
        await this.pagedItems.first(key);
    }
    renderRow = (item:any, index:number):JSX.Element => {
        return <div className="px-3 py-2">{JSON.stringify(item)}</div>;
    }
    onSelected: (item:any) => Promise<void>;
    private callOnSelected(item:any) {
        if (this.onSelected === undefined) {
            alert('onSelect is undefined');
            return;
        }
        this.onSelected(item);
    }
    clickRow = (item:any) => {
        /*
        let {owner} = this.entity;        
        if (owner !== undefined) {
            alert('select arr');
            return;
        }*/
        this.callOnSelected(item);
    }

    view = SearchPage;
}

type TypeRow = typeof Row;
const Row = (item) => <div className="px-3 py-2">{JSON.stringify(item)}</div>;

const SearchPage = observer(({vm}:{vm:VmTuidSearch}) => {
    let {label, entity, onSelected, renderRow, clickRow, pagedItems, onSearch, ownerId} = vm;
    let header = <SearchBox className="mx-1 w-100"
        initKey={''}
        onSearch={onSearch} placeholder={'搜索'+label} />;
    let {owner} = entity;
    let ownerTop;
    if (owner !== undefined) {
        let ownerObj = owner.valueFromId(ownerId);
        ownerTop = <div>owner: {JSON.stringify(ownerObj)}</div>;
    }
    return <Page header={header}>
        {ownerTop}
        <List
            items={pagedItems.items}
            item={{render: renderRow, onClick: clickRow}}
            before={'搜索'+label+'资料'} />
    </Page>;
});

class TuidPagedItems extends PagedItems<any> {
    private tuid: TuidBase;
    constructor(tuid: TuidBase) {
        super();
        this.tuid = tuid;
    }
    protected async load():Promise<any[]> {
        let ret = await this.tuid.search(this.param, this.pageStart, this.pageSize);
        return ret;
    }
    protected setPageStart(item:any) {
        if (item === undefined) this.pageStart = 0;
    }
}
