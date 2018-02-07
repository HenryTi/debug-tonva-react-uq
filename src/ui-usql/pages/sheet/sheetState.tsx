import * as React from 'react';
import {nav, Page} from 'tonva-tools';
import {List} from 'tonva-react-form';
import {Sheet} from '../../entities';
import {EntitiesUIProps, SheetUIProps} from '../../mapper';
import {SheetActionPage} from './sheetAction';

interface DataProps {
    stateName: string;
    state: any;
}
interface State {
    rows:any[];
}
export class SheetStatePage extends React.Component<SheetUIProps, State> {
    constructor(props) {
        super(props);
        this.state = {
            rows: undefined
        }
        this.mapper = this.mapper.bind(this);
    }

    async componentDidMount() {
        let {ui, data} = this.props;
        let {entity:sheet} = ui;
        let {state} = data;
        let res = await sheet.getStateSheets(state.state, 0, 10);
        this.setState({rows: res});
    }
    async click(brief:any) {
        if (brief.processing===1) return;
        let {ui, data} = this.props;
        let {entity:sheet} = ui;
        let {state, stateName} = data;
        nav.push(<SheetActionPage ui={ui} data={{stateName:stateName, state:state, brief:brief}} />);
    }

    mapper(row:any, index:number) {
        return <div>
            {row.processing===1? '... ' : ''}
            id:{row.id}, no:{row.no}, discription:{row.discription}, date:{row.date}
        </div>;
    }
    render() {
        let {ui, data} = this.props;
        let {entity:sheet} = ui;
        let {state, stateName} = data;
        return <Page header={stateName}>
            SheetState: {sheet.name}
            <List items={this.state.rows} item={{render:this.mapper, onClick:this.click}} />
            <pre>{JSON.stringify(state, undefined, ' ')}</pre>
        </Page>;
    }
}
