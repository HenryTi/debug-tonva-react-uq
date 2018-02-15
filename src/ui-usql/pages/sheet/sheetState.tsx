import * as React from 'react';
import {nav, Page} from 'tonva-tools';
import {List, LMR, FA} from 'tonva-react-form';
import {Sheet} from '../../entities';
import {EntitiesUIProps, SheetUIProps} from '../../ui';
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
        this.renderRow = this.renderRow.bind(this);
        this.click = this.click.bind(this);
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

    renderRow(row:any, index:number) {
        let left = <>
            {row.processing===1? '... ' : ''}
            id:{row.id}, no:{row.no}, discription:{row.discription}, date:{row.date}
        </>;
        let right = <FA className="align-self-center" name="angle-right" />;
        return <LMR className="px-3 py-2" left={left} right={right} />;
    }
    render() {
        let {ui, data} = this.props;
        let {entity:sheet} = ui;
        let {state, stateName} = data;
        return <Page header={sheet.name + stateName}>
            <List items={this.state.rows} item={{render:this.renderRow, onClick:this.click}} />
        </Page>;
    }
}

// <pre>{JSON.stringify(state, undefined, ' ')}</pre>
