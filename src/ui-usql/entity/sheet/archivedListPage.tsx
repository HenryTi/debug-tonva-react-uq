import * as React from 'react';
import {nav, Page} from 'tonva-tools';
import {List} from 'tonva-react-form';
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
        this.click = this.click.bind(this);
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
        return <div>
            {row.processing===1? '... ' : ''}
            id:{row.id}, no:{row.no}, discription:{row.discription}, date:{row.date}
        </div>;
    }
    render() {
        return <Page header={this.props.sheet.props.name + ': 已归档'}>
            SheetState: {this.props.sheet.props.name}
            <List items={this.state.rows} item={{render:this.mapper, onClick:this.click}} />
        </Page>;
    }
}
