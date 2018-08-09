import * as React from 'react';
import { observer } from 'mobx-react';
import { FA, SearchBox, List } from 'tonva-react-form';
import { Tuid, Entity } from '../../entities';
import { Page, PagedItems } from 'tonva-tools';
import { VmTuid } from './vmTuid';

//export type TypeVmTuidList = typeof VmTuidList;

export class VmTuidSearch extends VmTuid {
    pagedItems:TuidPagedItems;

    protected init() {
        this.pagedItems = new TuidPagedItems(this.entity);
    }

    protected async beforeStart(param?:any) {
        await this.onSearch(undefined);
    }
    onSearch = async (key:string) => {
        await this.pagedItems.first(key);
    }
    renderRow = (item:any, index:number):JSX.Element => {
        return <div className="px-3 py-2">{JSON.stringify(item)}</div>;
    }
    onSelected: (item:any) => Promise<void>;

    view = SearchPage;
}

type TypeRow = typeof Row;
const Row = (item) => <div className="px-3 py-2">{JSON.stringify(item)}</div>;

const SearchPage = observer(({vm}:{vm:VmTuidSearch}) => {
    let {label} = vm;
    let header = <SearchBox className="mx-1 w-100"
        initKey={''}
        onSearch={vm.onSearch} placeholder={'搜索'+label} />;
    return <Page header={header}>
        <List
            items={vm.pagedItems.items}
            item={{render: vm.renderRow, onClick: vm.onSelected}}
            before={'搜索'+label+'资料'} />
    </Page>;
});

class TuidPagedItems extends PagedItems<any> {
    private tuid: Tuid;
    constructor(tuid: Tuid) {
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
