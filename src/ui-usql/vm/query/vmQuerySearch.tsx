import * as React from 'react';
import { observer } from 'mobx-react';
import { FA, SearchBox, List } from 'tonva-react-form';
import { Tuid, Entity, TuidBase, Query } from '../../entities';
import { Page, PagedItems } from 'tonva-tools';
import { VmQuery } from './vmQuery';

//export type TypeVmTuidList = typeof VmTuidList;

export class VmQuerySearch extends VmQuery {
    pagedItems:QueryPagedItems;
    ownerId: number;

    protected init() {
        this.pagedItems = new QueryPagedItems(this.entity);
    }

    protected async beforeStart(param?:any) {
        //if (this.entity.owner !== undefined) this.ownerId = Number(param);
        await this.onSearch(param);
    }
    onSearch = async (key:string) => {
        await this.pagedItems.first(key);
    }
    renderRow = (item:any, index:number):JSX.Element => {
        return <Row item={item} vm={this} />;
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
        this.callOnSelected(item);
    }

    view = SearchPage;
}

type TypeRow = typeof Row;
const Row = observer(({item, vm}:{item:any, vm:VmQuerySearch}) => {
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
    return <div className="px-3 py-2">post:{JSON.stringify(item.$post)} - {JSON.stringify(item)}</div>;
});

const SearchPage = ({vm}:{vm:VmQuerySearch}) => {
    let {label, entity, onSelected, renderRow, clickRow, pagedItems, onSearch, ownerId} = vm;
    let header = <SearchBox className="mx-1 w-100"
        initKey={''}
        onSearch={onSearch} placeholder={'搜索'+label} />;
    return <Page header={header}>
        <List
            items={pagedItems.items}
            item={{render: renderRow, onClick: clickRow}}
            before={'搜索'+label+'资料'} />
    </Page>;
};

class QueryPagedItems extends PagedItems<any> {
    private query: Query;
    constructor(query: Query) {
        super();
        this.query = query;
    }
    protected async load():Promise<any[]> {
        let ret:any[];
        if (this.query.isPaged === true)
            ret = await this.query.page(this.param, this.pageStart, this.pageSize);
        else {
            ret = await this.query.query(this.param);
            ret = ret[this.query.returns[0].name];
        }
        return ret;
    }
    protected setPageStart(item:any) {
        if (item === undefined) this.pageStart = 0;
    }
}
