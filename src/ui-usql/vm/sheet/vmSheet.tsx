import * as React from 'react';
import { Page } from 'tonva-tools';
import {List, Muted, LMR, EasyDate, FA} from 'tonva-react-form';
import { Tuid, Sheet, Entity } from '../../entities';
import { VmEntity, vmLinkIcon, EntityUI } from '../entity';
import { VmApi } from '../vmApi';
import { VmSheetMain } from './vmMain';
import { VmSheetNew } from './vmNew';
import { VmSheetEdit } from './vmEdit';

export interface SheetUI extends EntityUI {
    res: any;
    main: typeof VmSheetMain;
    new: typeof VmSheetNew;
    edit: typeof VmSheetEdit;
}

export abstract class VmSheet extends VmEntity {
    protected ui: SheetUI;

    constructor(vmApi:VmApi, sheet:Sheet, ui?:SheetUI) {
        super(vmApi, sheet, ui);
    }

    entity: Sheet;

    get icon() {return vmLinkIcon('text-primary', 'wpforms')}

    protected typeFlowRow = FlowRow;
    flowRow = (item:any, index:number) => <this.typeFlowRow item={item} />

    className: string;
    sheetState: string;
    data: any;
    flows: any[];

    typeSheetView = SheetView;
}

const FlowRow = (item) => {
    let {date, user, preState, state, action} = item;
    if (action === undefined) action = <><FA className="text-primary" name="pencil-square-o" /> 制单</>;
    let to;
    switch (state) {
        case '$': break;
        case '#': to = <><FA className="text-success" name="file-archive-o" /></>; break;
        default: to = <><FA className="text-muted" name="arrow-right" /> &nbsp; {state}</>; break;
    }
    return <div className="row">
        <div className="col-sm"><div className="pl-3 py-2">{action}</div></div>
        <div className="col-sm"><div className="p-2">{to}</div></div>
        <div className="col-sm text-right"><div className="p-2"><Muted><EasyDate date={date} /></Muted></div></div>
    </div>;
}

const SheetView = ({vm}:{vm: VmSheet}) => {
    let {className, sheetState, data, flows, flowRow} = vm;
    let removed;
    if (sheetState === '-')
        removed = <div className="mx-3 my-2" style={{color:'red'}}>本单据作废</div>;
    let flow = <List header={<Muted>流程</Muted>}
        items={flows}
        item={{render:flowRow}}/>
    return <div className={className}>
        {removed}
        /* ddd */
        {flow}
    </div>;
}
/*
<MainDetailsView
ui={ui}
mainDetails={this.mainDetails} 
values={data} />
*/