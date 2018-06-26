import * as React from 'react';
import { observer } from 'mobx-react';
import { FA, SearchBox, List } from 'tonva-react-form';
import { Button } from 'reactstrap';
import { Tuid, Entity } from '../../entities';
import { VmEntity, vmLinkIcon } from '../entity/vmEnity';
import { Page, nav, PagedItems } from 'tonva-tools';
import { VmApi } from '../vmApi';
import { TypeContent, TuidContentJSON, VmTuidInput, TypeVmTuidInput } from '../tuid';
import { VmTuidBase } from './vmTuidBase';

export type TypeVmTuidList = typeof VmTuidList;

export class VmTuidList extends VmTuidBase {
    pagedItems:TuidPagedItems;

    initBind() {
        super.initBind();
        this.onSearch = this.onSearch.bind(this);
        this.renderRow = this.renderRow.bind(this);
        this.rowClick = this.rowClick.bind(this);
        this.pagedItems = new TuidPagedItems(this.entity);
    }

    async load() {
        await super.load();
        await this.onSearch(undefined);
    }
    async onSearch(key:string) {
        await this.pagedItems.first(key);
    }
    renderRow(item:any, index:number):JSX.Element {
        return <div className="px-3 py-2">{JSON.stringify(item)}</div>;
    }
    async rowClick(item:any) {
        let data = await this.entity.load(item.id);
        alert('edit');
        //nav.push(<EditPage ui={ui} data={data} />);
    }

    renderView() {
        return <TuidListPage vm={this} />;
    }
}

@observer
export class TuidListPage extends React.Component<{vm:VmTuidList}> {
    render() {
        let {vm} = this.props;
        let {caption, values} = this.props.vm;
        let header = <SearchBox className="mx-1 w-100"
            initKey={''}
            onSearch={vm.onSearch} placeholder={'搜索'+caption} />;
        return <Page header={header}>
            <List
                items={vm.pagedItems.items}
                item={{render: vm.renderRow, onClick: vm.rowClick}}
                before={'搜索'+caption+'资料'} />
        </Page>;
    }
}

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
