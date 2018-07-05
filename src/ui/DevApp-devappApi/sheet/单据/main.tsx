import * as React from 'react';
import { Page } from 'tonva-tools';
import { Button } from 'reactstrap';
import { List, Muted } from 'tonva-react-form';
import { VmSheetMain }  from '../../../../ui-usql';

export class VmSheetMain单据 extends VmSheetMain {
    protected view = Main;
}

const Main = ({vm}:{vm:VmSheetMain}) => {
    let {caption, entity, newClick, schemaClick, renderState, sheetStateClick, archivesClick}  = vm;
    return <Page header={caption}>
        <div className="mx-3 my-2">
            定制的单据
        </div>
        <div className="mx-3 my-2">
            <Button className="mr-2" color="primary" onClick={newClick}>新建</Button>
            <Button className="mr-2" color="primary" onClick={schemaClick}>模板</Button>
        </div>
        <List className="my-2"
            header={<Muted>待处理{caption}</Muted>}
            none="[ 无 ]"
            items={entity.statesCount.filter(row=>row.count)}
            item={{render:renderState, onClick:sheetStateClick}} />
        <div className="mx-3 my-2">
            <Button color="primary" onClick={archivesClick}>已归档{caption}</Button>
        </div>
    </Page>;
}
