import * as React from 'react';
import {nav, Page, ListView} from 'tonva-tools';
import {Sheet} from '../tv';
import {SheetActionPage} from './sheetAction';
import {ArchivedPage} from './archivedPage';

interface Props {
    sheet: Sheet;
}
interface State {
    rows:any[];
}
export class ArchivedListPage extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            rows: undefined
        }
        this.mapper = this.mapper.bind(this);
    }

    componentDidMount() {
        this.props.sheet.getArchives(undefined, 10).then(res => {
            this.setState({rows: res});
        });
    }

    click(brief:any) {
        if (brief.processing===1) return;
        let {sheet} = this.props;
        nav.push(<ArchivedPage sheet={sheet} brief={brief} />);
    }

    mapper(row:any, index:number) {
        return <li key={index} onClick={()=>this.click(row)}>
            {row.processing===1? '... ' : ''}
            id:{row.id}, no:{row.no}, discription:{row.discription}, date:{row.date}
        </li>;
    }
    render() {
        return <Page header={this.props.sheet.props.name + ': 已归档'}>
            SheetState: {this.props.sheet.props.name}
            <ListView items={this.state.rows} renderRow={this.mapper} />
        </Page>;
    }
}
