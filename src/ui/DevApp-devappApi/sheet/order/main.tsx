import * as React from 'react';
import { Page } from 'tonva-tools';
import { Button } from 'reactstrap';
import { List, Muted } from 'tonva-react-form';
import { VmSheetMain }  from '../../../../ui-usql';

export class VmSheetMainOrder extends VmSheetMain {
    protected view = Main;
}

const Main = ({vm}:{vm:VmSheetMain}) => {
    let {label, entity, newClick, schemaClick, renderState, sheetStateClick, archivesClick}  = vm;
    return <Page header={label}>
        <div className="mx-3 my-2">
            定制的Order
        </div>
        <div className="mx-3 my-2">
            <Button className="mr-2" color="primary" onClick={newClick}>新建</Button>
            <Button className="mr-2" color="primary" onClick={schemaClick}>模板</Button>
        </div>
        <List className="my-2"
            header={<Muted>待处理{label}</Muted>}
            none="[ 无 ]"
            items={entity.statesCount.filter(row=>row.count)}
            item={{render:renderState, onClick:sheetStateClick}} />
        <div className="mx-3 my-2">
            <Button color="primary" onClick={archivesClick}>已归档{label}</Button>
        </div>
    </Page>;
}
