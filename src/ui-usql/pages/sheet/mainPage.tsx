import * as React from 'react';
import {Button, ButtonGroup} from 'reactstrap';
import {nav, Page} from 'tonva-tools';
import {List} from 'tonva-react-form';
import {Sheet} from '../../entities';
import {EntitiesUIProps, SheetUIProps} from '../../ui';
import {EntitiesUI, SheetUI} from '../../ui';
import {SchemaPage} from './schemaPage';
import {SheetNewPage} from './sheetNew';
import {SheetEditPage} from './sheetEdit';
import {SheetStatePage} from './sheetState';
import {ArchivedListPage} from './archivedListPage';

/*
interface Props {
    entity: Sheet;
}*/
interface State {
    result: any;
    states: any[];
}
export class MainPage extends React.Component<SheetUIProps, State> {
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
    async componentDidMount() {
        //this.wsHandler = net.onWsReceive('sheetAct', this.onWsReceive);
        let ui = this.props.ui;
        let sheet = ui.entity;
        let res = await sheet.getStateSheetCount();
        let rows = sheet.schema.states.map(s => {return {state: s.name, count: 0} });
        res.forEach(r => {
            let fr = rows.find(f=>f.state === r.state);
            if (fr !== undefined) fr.count = r.count;
        });
        this.setState({states: rows});
    }
    conpoentWillUnmount() {
        //net.endWsReceive(this.wsHandler);
    }
    onWsReceive(data:any) {
        alert('ws msg received: ' + JSON.stringify(data));
    }

    newClick() {
        nav.push(<SheetNewPage ui={this.props.ui} data={{}} />);
        /*
        this.props.entity.save('kkk bbb', this.data).then(res => {
            this.setState({result: res})
            this.id = res.id;
            //alert(JSON.stringify(res, undefined, ' '));
        });*/
    }

    schemaClick() {
        nav.push(<SchemaPage ui={this.props.ui} />)
    }

    sheetStateClick(state:any) {
        let stateName = state.state==='$'? '新单':state.state;
        nav.push(<SheetStatePage ui={this.props.ui} data={{state:state, stateName:stateName}} />);
    }

    archivesClick() {
        nav.push(<ArchivedListPage ui={this.props.ui} />);
    }

    sheetStateMapper(row:any, index:number) {
        let stateName = row.state==='$'? '新单':row.state;
        return <div>
            {stateName} - {row.count}
        </div>;
    }

    render() {
        let ui = this.props.ui;
        let entity = ui.entity; 
        let name = entity.name;
        return <Page>
            <div>SheetEdit: {name}</div>
            <ButtonGroup>
                <Button onClick={()=>this.newClick()}>新建</Button>
                <Button onClick={()=>this.schemaClick()}>模板</Button>
            </ButtonGroup>

            <br/><br/>
            <div>状态</div>
            <List 
                items={this.state.states}
                item={{render:this.sheetStateMapper, onClick:this.sheetStateClick}} />
            <br/>
            <div>
                <Button onClick={()=>this.archivesClick()}>已归档{name}</Button>
            </div>
            <br/>
            <pre>{JSON.stringify(this.state.result, undefined, ' ')}</pre>
            <pre>{JSON.stringify(entity.schema, undefined, ' ')}</pre>
        </Page>;
    }
}
