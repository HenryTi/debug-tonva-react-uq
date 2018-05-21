import * as React from 'react';
import {TuidPickFace, FormProps, SearchBox, List} from 'tonva-react-form';
import {nav, Page} from 'tonva-tools';
import {TuidUI, TuidInputProps, TuidContentProps, TuidPickPageProps} from '../../ui-usql/ui';

export class ArticleContent extends React.Component<{value:any}> {
    render() {
        let {value} = this.props;
        return <div>id = {value.id} {JSON.stringify(value)} </div>;
    }
}

export class CandidateRow extends React.Component<{item:any, index:number}> {
    render() {
        return <div className="p-4">{JSON.stringify(this.props.item)}</div>;
    }
}

export class ArticleInput extends React.Component<TuidInputProps> {
    private id = 0;
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }
    onClick() {
        //let {id, ui, params, onIdChanged} = this.props;
        /*
        if (entitiesUI === undefined) {
            alert('TonvaForm props 应该包含 context=EntitiesUI')
            return;
        }
        let tuidUI = entitiesUI.tuid.coll[tuid];
        if (tuidUI === undefined) {
            alert('Tuid ' + tuid + ' 没有定义');
            return;
        }*/
        nav.push(<PickArticlePage {...this.props} />);
    }
    render() {
        let {id, ui} = this.props;
        return <button className="form-control btn btn-outline-info"
            type="button"
            style={{textAlign:'left', paddingLeft:'0.75rem'}}
            onClick={this.onClick}>
            <div>Article: {ui.caption} id: {id}</div>
        </button>
    }
}

interface State {
    items: any[];
}
export class PickArticlePage extends React.Component<TuidPickPageProps, State> {
    constructor(props) {
        super(props);
        this.onSearch = this.onSearch.bind(this);
        this.renderRow = this.renderRow.bind(this);
        this.rowClick = this.rowClick.bind(this);
        this.state = {
            items: null
        }
    }
    async onSearch(key:string) {
        let result = await this.props.ui.entity.search(key, 0, 30);
        this.setState({
            items: result
        });
    }
    renderRow(item:any, index:number):JSX.Element {
        let {candidateRow:CandidateRow} = this.props.ui.input;
        if (CandidateRow !== undefined) return <CandidateRow item={item} index={index} />;
        return <div className="px-3 py-2">{JSON.stringify(item)}</div>
    }
    rowClick(item:any) {
        this.props.onIdChanged(item.id);
        nav.pop();
    }
    render() {
        let {ui} = this.props;
        let header=<SearchBox className="mx-1 w-100" placeholder={ui.caption} onSearch={this.onSearch}  />;
        return <Page header={header}>
            <List 
                className="my-3"
                before={'搜索' + ui.caption + '--哈哈'}
                items={this.state.items} 
                item={{render: this.renderRow, onClick:this.rowClick}} />
        </Page>;
    }
}
