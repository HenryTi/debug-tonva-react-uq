import * as React from 'react';
import {Button, ButtonGroup, Badge} from 'reactstrap';
import {nav, Page, ws} from 'tonva-tools';
import {List, LMR, Muted} from 'tonva-react-form';
import {Sheet} from '../../entities';
import {EntitiesUIProps, SheetUIProps} from '../../ui';
import {EntitiesUI, SheetUI} from '../../ui';
import {SchemaPage} from './schemaPage';
import {SheetNewPage} from './sheetNew';
import {SheetEditPage} from './sheetEdit';
import {SheetStatePage} from './sheetState';
import {ArchivedListPage} from './archivedListPage';

interface State {
    result: any;
    states: any[];
}
export class MainPage extends React.Component<SheetUIProps, State> {
    private wsHandler:number;
    private wsAny:number;
    constructor(props) {
        super(props);
        this.state = {
            result: '',
            states:[]
        }
        this.renderState = this.renderState.bind(this);
        this.sheetStateClick = this.sheetStateClick.bind(this);
        this.onWsReceive = this.onWsReceive.bind(this);
        this.onWsAny = this.onWsAny.bind(this);
    }
    async componentDidMount() {
        this.wsHandler = ws.onWsReceive('sheetAct', this.onWsReceive);
        this.wsAny = ws.onWsReceiveAny(this.onWsAny);
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
        ws.endWsReceive(this.wsHandler);
        ws.endWsReceive(this.wsAny);
    }
    onWsReceive(data:any) {
        alert('ws msg received: ' + JSON.stringify(data));
    }
    onWsAny(data:any) {
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

    renderState(row:any, index:number) {
        let stateName = row.state==='$'? '新单':row.state;
        let badge;
        if (row.count)
            badge = <Badge className="ml-5 align-self-end" color="success">{row.count}</Badge>;
        return <LMR className="px-3 py-2" left={stateName} right={badge} />;
    }

    render() {
        let ui = this.props.ui;
        let entity = ui.entity; 
        let name = entity.name;
        return <Page header={name}>
            <div className="mx-3 my-2">
                <Button className="mr-2" color="primary" onClick={()=>this.newClick()}>新建</Button>
                <Button className="mr-2" color="primary" onClick={()=>this.schemaClick()}>模板</Button>
            </div>
            <List className="my-2"
                header={<Muted>待处理 + {name}</Muted>}
                items={this.state.states}
                item={{render:this.renderState, onClick:this.sheetStateClick}} />
            <div className="mx-3 my-2">
                <Button color="primary" onClick={()=>this.archivesClick()}>已归档{name}</Button>
            </div>
        </Page>;
    }
}
/*
<pre>{JSON.stringify(this.state.result, undefined, ' ')}</pre>
<pre>{JSON.stringify(entity.schema, undefined, ' ')}</pre>
*/
