import * as React from 'react';
import {Button} from 'reactstrap';
import {Page, ListView} from 'tonva-tools';
import {Sheet} from '../tv';
import {unpackSheet} from '../packData';

interface Props {
    stateName: string;
    sheet: Sheet;
    state: any;
    brief: any;
}
interface State {
    res: any;
    data: any;
}
export class SheetActionPage extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            res: undefined,
            data: undefined
        }
    }

    componentDidMount() {
        let sheet = this.props.sheet;
        sheet.getSheet(this.props.brief.id).then(res => {
            let ret = res[0];
            let data;
            if (ret.length === 1) {
                data = unpackSheet(sheet.schema, ret[0].data);
            }
            this.setState({
                data: data,
                res: res
            });
        });
    }
    actionClick(action:any) {
        let {sheet, state, brief} = this.props;
        sheet.action(brief.id, brief.flow, state.state, action.name).then(res => {
            alert(JSON.stringify(res));
        });
    }
    mapper(row:any, index:number) {
        return <li key={index}>id:{row.id}, no:{row.no}, discription:{row.discription}, date:{row.date}</li>
    }
    render() {
        let {sheet, state, stateName, brief} = this.props;
        let s = sheet.schema.states.find(v => v.name === state.state);
        let actions = s.actions;
        return <Page header={sheet.props.name + ':' + stateName + '-' + brief.no}>
            <div>
                {actions.map((v,index) => <Button key={index} onClick={()=>this.actionClick(v)}>
                    {v.name}
                </Button>)}
            </div>
            <pre>{JSON.stringify(this.state.data, undefined, ' ')}</pre>
            <pre>{JSON.stringify(this.state.res, undefined, ' ')}</pre>
        </Page>;
    }
}
