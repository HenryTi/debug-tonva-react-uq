import * as React from 'react';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import {nav, Page, PagedItems} from 'tonva-tools';
import {LMR, SearchBox, List} from 'tonva-react-form';
import {Tuid} from '../../entities';
import {EntitiesUIProps, TuidUIProps} from '../../ui';
import {EntitiesUI, TuidUI} from '../../ui';

class TuidPagedItems<T> extends PagedItems<T> {
    private tuidUI: TuidUI;
    constructor(tuidUI: TuidUI) {
        super();
        this.tuidUI = tuidUI;
    }
    protected async load():Promise<T[]> {
        let ret = await this.tuidUI.entity.search(this.param, this.pageStart, this.pageSize);
        return ret;
    }
    protected setPageStart(item:T) {
        if (item === undefined) this.pageStart = 0;
    }
}

export class SearchPage extends React.Component<TuidUIProps> {
    private pagedItems:TuidPagedItems<any>;

    constructor(props) {
        super(props);
        this.pagedItems = new TuidPagedItems<any>(this.props.ui);
        this.onSearch = this.onSearch.bind(this);
    }
    componentWillMount() {
        //let key = this.props.data;
        //if (!key) return;
        this.onSearch(this.props.data);
    }
    async onSearch(key:string) {
        await this.pagedItems.first(key);
    }
    render() {
        let {data:initKey, ui} = this.props;
        let {entity, caption} = ui;
        let {name, schema} = entity;
        caption = caption || name;
        let header = <SearchBox className="mx-1 w-100"
            initKey={initKey}
            onSearch={this.onSearch} placeholder={'搜索'+caption} />;
        return <Page header={header}>
            <List items={this.pagedItems.items} item={{}} before={'搜索'+caption+'资料'} />
        </Page>;
    }
}
