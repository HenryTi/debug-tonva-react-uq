import * as React from 'react';
import { Button } from 'reactstrap';
import { tonvaDebug } from 'tonva-react-form';
import { nav, Page } from 'tonva-tools';
import { VmSheet } from './vmSheet';
import { VmView } from './vmView';

export class VmSheetAction extends VmSheet {
    brief: any;
    sheetData: any;
    flows: any[];
    vmView: VmView;

    async start(sheetId:number) {
        let data = await this.entity.getSheet(sheetId);
        let {brief, data:sheetData, flows} = data;
        this.brief = brief;
        this.sheetData = sheetData;
        this.flows = flows;
        this.vmView = new VmView(this.vmApi, this.entity, this.ui, this.sheetData, this.brief.state, flows);
        super.start();
    }

    actionClick = async (action:any) => {
        let {id, flow, state} = this.brief;
        let res = await this.entity.action(id, flow, state, action.name);
        alert(JSON.stringify(res));
        await this.back();
    }

    deleteClick = async () => {
        alert('单据作废：程序正在设计中');
    }

    editClick = async () => {
        alert('修改单据：程序正在设计中');
    }

    protected view = SheetAction;
}

const SheetAction = ({vm}:{vm:VmSheetAction}) => {
    let {label, entity, brief, actionClick, vmView, deleteClick, editClick} = vm;
    let state = brief.state;
    let stateLabel = vm.getStateLabel(state);
    let {states} = entity;
    let s = states.find(v => v.name === state);
    let actionButtons, startButtons;
    if (s === undefined) {
        let text:string, cn:string;
        switch (state) {
            default:
                text = '不认识的单据状态\'' + state + '\'';
                cn = 'text-info';
                break;
            case '-': 
                text = '已作废';
                cn = 'text-danger';
                break;
            case '#':
                text = '已归档';
                cn = 'text-success';
                break;
        }
        actionButtons = <div className={cn}>[{text}]</div>;
    }
    else {
        actionButtons = <div className="flex-grow-1">{s.actions.map((v,index) => 
            <Button
                key={index}
                className="mr-2"
                color="primary"
                onClick={()=>actionClick(v)}
            >
                {vm.getActionLabel(state, v.name)}
            </Button>)}
        </div>;
        if (state === '$') {
            startButtons = <div>
                <Button outline={true} className="ml-2" color="info" onClick={editClick}>修改</Button>
                <Button outline={true} className="ml-2" color="danger" onClick={deleteClick}>作废</Button>
            </div>
        }
    };
    return <Page header={label + ':' + stateLabel + '-' + brief.no}>
        <div className="my-3">
            <div className="d-flex mx-3 mb-3">
                {actionButtons}
                {startButtons}
            </div>
            {vmView.render()}
        </div>
    </Page>;
}
