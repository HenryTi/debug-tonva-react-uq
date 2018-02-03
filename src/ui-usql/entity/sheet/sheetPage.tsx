import * as React from 'react';
import {Button, ButtonGroup} from 'reactstrap';
import {nav, Page} from 'tonva-tools';
import {List} from 'tonva-react-form';
import {Sheet} from '../tv';
import {SchemaPage} from './schemaPage';
import {SheetNewPage} from './sheetNew';
import {SheetEditPage} from './sheetEdit';
import {SheetStatePage} from './sheetState';
import {ArchivedListPage} from './archivedListPage';

interface Props {
    entity: Sheet;
}
interface State {
    result: any;
    states: any[];
}
export class SheetPage extends React.Component<Props, State> {
    data = {
        id1: 1,
        f1: 3,
        f2: 5,
        arr1: [
            {f11:'a', f12:'b'},
            {f11:'a1', f12: 'b1'},
            {f11:'a2', f12: 'b2'},
        ],
    };
    id:number;
    private wsHandler:number;
    constructor(props) {
        super(props);
        this.state = {
            result: '',
            states:[]
        }
        this.sheetStateMapper = this.sheetStateMapper.bind(this);
        this.sheetStateClick = this.sheetStateClick.bind(this);
        this.onWsReceive = this.onWsReceive.bind(this);
    }
    componentDidMount() {
        //this.wsHandler = net.onWsReceive('sheetAct', this.onWsReceive);
        let sheet = this.props.entity;
        sheet.getStateSheetCount().then(res => {
            let rows = sheet.schema.states.map(s => {return {state: s.name, count: 0} });
            res.forEach(r => {
                let fr = rows.find(f=>f.state === r.state);
                if (fr !== undefined) fr.count = r.count;
            });
            this.setState({states: rows});
        });
    }
    conpoentWillUnmount() {
        //net.endWsReceive(this.wsHandler);
    }
    onWsReceive(data:any) {
        alert('ws msg received: ' + JSON.stringify(data));
    }

    newClick() {
        nav.push(<SheetNewPage entity={this.props.entity} item={{}} />);
        /*
        this.props.entity.save('kkk bbb', this.data).then(res => {
            this.setState({result: res})
            this.id = res.id;
            //alert(JSON.stringify(res, undefined, ' '));
        });*/
    }

    schemaClick() {
        nav.push(<SchemaPage entity={this.props.entity} />)
    }

    sheetStateClick(state:any) {
        let stateName = state.state==='$'? '新单':state.state;
        nav.push(<SheetStatePage sheet={this.props.entity} state={state} stateName={stateName} />);
    }

    archivesClick() {
        nav.push(<ArchivedListPage sheet={this.props.entity} />);
    }

    sheetStateMapper(row:any, index:number) {
        let stateName = row.state==='$'? '新单':row.state;
        return <div>
            {stateName} - {row.count}
        </div>;
    }

    render() {
        let entity = this.props.entity; 
        let props = entity.props;
        return <Page>
            <div>SheetEdit: {props.name}</div>
            <ButtonGroup>
                <Button onClick={()=>this.newClick()}>新建</Button>
                <Button onClick={()=>this.schemaClick()}>模板</Button>
            </ButtonGroup>

            <br/><br/>
            <div>状态</div>
            <List items={this.state.states} item={{render:this.sheetStateMapper, onClick:this.sheetStateClick}} />
            <br/>
            <div>
                <Button onClick={()=>this.archivesClick()}>已归档{props.name}</Button>
            </div>
            <br/>
            <pre>{JSON.stringify(this.state.result, undefined, ' ')}</pre>
            <pre>{JSON.stringify(this.props.entity.schema, undefined, ' ')}</pre>
        </Page>;
    }
}
