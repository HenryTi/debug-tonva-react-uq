import * as React from 'react';
import * as _ from 'lodash';
import {observable, IObservableValue, ObservableMap, extendObservable, IKeyValueMap} from 'mobx';
import {observer} from 'mobx-react';
import {Page} from 'tonva-tools';
import {List, Muted} from 'tonva-react-form';
import {entities, Tuid, Action, Sheet, Query} from './tv';

class State {
    loading: string;
    tuids: Tuid[];
    actions: Action[];
    sheets: Sheet[];
    queries: Query[];
}

let articles = observable.shallowMap({});

interface Test {
    price: number;
    quantity: number;
    article: number;
}

@observer
export default class Tonva extends React.Component<{}, State> {
    test:Test;

    constructor(props) {
        super(props);
        this.test = {
            price: 2,
            quantity: 3,
            article: 3
        };
        this.state = {
            loading: undefined,
            tuids: undefined,
            actions: undefined,
            sheets: undefined,
            queries: undefined
        };
    }
    componentDidMount() {
        this.setState({
            loading: 'loading',
        });
        entities.loadAccess().then(() => {
            this.setState({
                loading: '',
                tuids: entities.getTuids(),
                actions: entities.getActions(),
                sheets: entities.getSheets(),
                queries: entities.getQueries(),
            });
        });
    }
    
    private tuidItem(item: Tuid, index: number): JSX.Element {
        let {name, caption} = item.props;
        return <div className="px-3 py-2">{caption || name}</div>
    }

    private actionItem(item: Action, index: number): JSX.Element {
        let {name, caption} = item.props;
        return <div className="px-3 py-2">{caption || name}</div>
    }

    private sheetItem(item: Sheet, index: number): JSX.Element {
        let {name, caption} = item.props;
        return <div className="px-3 py-2">{caption || name}</div>
    }

    private queryItem(item: Query, index: number): JSX.Element {
        let {name, caption} = item.props;
        return <div className="px-3 py-2">{caption || name}</div>
    }

    render() {
        let {loading, tuids, actions, sheets, queries} = this.state;
        let {price, quantity, article} = this.test;
        let {id, name} = articles.get(String(article)) || {id:article} as any;
        //let name = article.get('name');
        return <Page header="Tonva Usql Entities">
            tonva
            <div>{loading}</div>
            <div>id:{id} name:{name} price:{price} quantity:{quantity}</div>
            <button onClick={()=>{
                this.test.price = ++this.test.price;
                articles.set(String(article), {id:101, name:'aaaab+3'});
            }}>change1</button>
            <button onClick={()=>{
                this.test.price = ++this.test.price;
                articles.set(String(1), {id:1, name:'aaaab+1'});
            }}>change2</button>
            <List
                header={<Muted>Tuid</Muted>}
                items={tuids} 
                item={{render: this.tuidItem, onClick:(item:Tuid)=>item.click()}} />
            <br/>
            <List
                header={<Muted>Action</Muted>}
                items={actions} 
                item={{render: this.actionItem, onClick:(item:Action)=>item.click()}} />
            <br/>
            <List
                header={<Muted>Sheet</Muted>}
                items={sheets} 
                item={{render: this.sheetItem, onClick:(item:Sheet)=>item.click()}} />
            <br/>
            <List
                header={<Muted>Query</Muted>}
                items={queries} 
                item={{render: this.queryItem, onClick:(item:Query)=>item.click()}} />
            <br/>
        </Page>;
    }
}

