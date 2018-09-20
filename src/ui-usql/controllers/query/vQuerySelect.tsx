import * as React from 'react';
import { FA, SearchBox, List } from 'tonva-react-form';
import { Page, PagedItems } from 'tonva-tools';
import { Query } from '../../entities';
import { VEntity } from '../VM';
import { QueryUI, CQuerySelect } from './cQuery';
import { DefaultRow } from './defaultRow';

export class VQuerySelect extends VEntity<Query, QueryUI, CQuerySelect> {
    private row: React.StatelessComponent;

    pagedItems:QueryPagedItems;
    ownerId: number;

    async showEntry(param?:any) {
        let {row, selectRow} = this.ui;
        this.row = selectRow || row || DefaultRow;
        this.entity = this.controller.entity;
        this.pagedItems = new QueryPagedItems(this.entity);
        await this.onSearch(param);
        this.openPage(this.view);
    }
    onSearch = async (key:string) => {
        await this.pagedItems.first(key);
    }

    renderRow = (item:any, index:number) => <this.row {...item} />;

    private callOnSelected(item:any) {
        /*
        if (this.onSelected === undefined) {
            alert('onSelect is undefined');
            return;
        }
        this.onSelected(item);
        */
       this.closePage();
       this.return(item);
    }
    clickRow = (item:any) => {
        this.callOnSelected(item);
    }

    view = () => {
        let header = <SearchBox className="mx-1 w-100"
            initKey={''}
            onSearch={this.onSearch} placeholder={'搜索'+this.label} />;
        return <Page header={header}>
            <List
                items={this.pagedItems.items}
                item={{render: this.renderRow, onClick: this.clickRow}}
                before={'搜索'+this.label+'资料'} />
        </Page>;
    };
}

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
            let data = await this.query.query(this.param);
            //let data = await this.query.unpackReturns(res);
            ret = data[this.query.returns[0].name];
        }
        return ret;
    }
    protected setPageStart(item:any) {
        if (item === undefined) this.pageStart = 0;
    }
}