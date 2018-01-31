import * as React from 'react';
import {Page, ListView} from 'tonva-tools';
import {entities, Tuid, Action, Sheet, Query, createAction} from './tv';

class State {
    loading: string;
    tuids: Tuid[];
    actions: Action[];
    sheets: Sheet[];
    queries: Query[];
}

export default class Tonva extends React.Component<{}, State> {
    constructor(props) {
        super(props);
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
        return <li key={index} onClick={()=>item.click()}>{caption || name}</li>
    }

    private actionItem(item: Action, index: number): JSX.Element {
        let {name, caption} = item.props;
        return <li key={index} onClick={()=>item.click()}>{caption || name}</li>
    }

    private sheetItem(item: Sheet, index: number): JSX.Element {
        let {name, caption} = item.props;
        return <li key={index} onClick={()=>item.click()}>{caption || name}</li>
    }

    private queryItem(item: Query, index: number): JSX.Element {
        let {name, caption} = item.props;
        return <li key={index} onClick={()=>item.click()}>{caption || name}</li>
    }

    render() {
        let {loading, tuids, actions, sheets, queries} = this.state;
        return <Page>
            tonva
            <div>{loading}</div>
            <ListView header='Tuid' renderRow={this.tuidItem} items={tuids} />
            <br/>
            <ListView header='Action' renderRow={this.actionItem} items={actions} />
            <br/>
            <ListView header='Sheet' renderRow={this.sheetItem} items={sheets} />
            <br/>
            <ListView header='Query' renderRow={this.queryItem} items={queries} />
            <br/>
        </Page>;
    }
}

