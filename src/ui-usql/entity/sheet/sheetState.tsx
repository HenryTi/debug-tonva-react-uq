import * as React from 'react';
import {nav, Page} from 'tonva-tools';
import {List} from 'tonva-react-form';
import {Sheet} from '../tv';
import {SheetActionPage} from './sheetAction';

interface Props {
    stateName: string;
    sheet: Sheet;
    state: any;
}
interface State {
    rows:any[];
}
export class SheetStatePage extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            rows: undefined
        }
        this.mapper = this.mapper.bind(this);
    }

    componentDidMount() {
        this.props.sheet.getStateSheets(this.props.state.state, 0, 10).then(res => {
            this.setState({rows: res});
        });
    }
    click(brief:any) {
        if (brief.processing===1) return;
        let {sheet, stateName, state} = this.props;
        nav.push(<SheetActionPage sheet={sheet} stateName={stateName} state={state} brief={brief} />);
    }

    mapper(row:any, index:number) {
        return <div>
            {row.processing===1? '... ' : ''}
            id:{row.id}, no:{row.no}, discription:{row.discription}, date:{row.date}
        </div>;
    }
    render() {
        return <Page header={this.props.stateName}>
            SheetState: {this.props.sheet.props.name}
            <List items={this.state.rows} item={{render:this.mapper, onClick:this.click}} />
            <pre>{JSON.stringify(this.props.state, undefined, ' ')}</pre>
        </Page>;
    }
}
