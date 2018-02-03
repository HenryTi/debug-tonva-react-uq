import * as React from 'react';
import * as _ from 'lodash';
import {observer} from 'mobx-react';
import {nav, Page} from 'tonva-tools';
import {List, Muted} from 'tonva-react-form';
import {Entities, Entity, Tuid, Action, Sheet, Query} from '../entities';
import {TuidPage} from './tuid';

class State {
    loading: string;
    tuids: Tuid[];
    actions: Action[];
    sheets: Sheet[];
    queries: Query[];
}

@observer
export class Main extends React.Component<{}, State> {
    private entities: Entities;

    constructor(props) {
        super(props);
        this.entities = new Entities('$$$/a', '*');
        this.actionClick = this.actionClick.bind(this);
        this.sheetClick = this.sheetClick.bind(this);
        this.queryClick = this.queryClick.bind(this);
        this.tuidClick = this.tuidClick.bind(this);
        this.state = {
            loading: undefined,
            tuids: undefined,
            actions: undefined,
            sheets: undefined,
            queries: undefined
        };
    }
    async componentDidMount() {
        this.setState({
            loading: 'loading',
        });
        await this.entities.loadAccess();
        this.setState({
            loading: '',
            tuids: this.entities.tuidArr,
            actions: this.entities.actionArr,
            sheets: this.entities.sheetArr,
            queries: this.entities.queryArr,
        });
    }
    
    private tuidItem(item: Tuid, index: number): JSX.Element {
        let {name} = item;
        return <div className="px-3 py-2">{name}</div>
    }

    private actionItem(item: Action, index: number): JSX.Element {
        let {name} = item;
        return <div className="px-3 py-2">{name}</div>
    }

    private sheetItem(item: Sheet, index: number): JSX.Element {
        let {name} = item;
        return <div className="px-3 py-2">{name}</div>
    }

    private queryItem(item: Query, index: number): JSX.Element {
        let {name} = item;
        return <div className="px-3 py-2">{name}</div>
    }

    private async tuidClick(entity:Tuid) {
        await entity.loadSchema();
        nav.push(<TuidPage entity={entity} />);
    }
    private async actionClick(entity:Action) {
        await entity.loadSchema();

    }
    private async sheetClick(entity:Sheet) {
        await entity.loadSchema();

    }
    private async queryClick(entity:Query) {
        await entity.loadSchema();

    }    
    render() {
        let {loading, tuids, actions, sheets, queries} = this.state;
        return <Page header="Tonva Usql Entities">
            tonva
            <div>{loading}</div>
            <List
                header={<Muted>Tuid</Muted>}
                items={tuids} 
                item={{render: this.tuidItem, onClick:this.tuidClick}} />
            <br/>
            <List
                header={<Muted>Action</Muted>}
                items={actions} 
                item={{render: this.actionItem, onClick:this.actionClick}} />
            <br/>
            <List
                header={<Muted>Sheet</Muted>}
                items={sheets} 
                item={{render: this.sheetItem, onClick:this.sheetClick}} />
            <br/>
            <List
                header={<Muted>Query</Muted>}
                items={queries} 
                item={{render: this.queryItem, onClick:this.queryClick}} />
            <br/>
        </Page>;
    }
}

