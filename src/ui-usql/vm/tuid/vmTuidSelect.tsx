import * as React from 'react';
import { VmTuid } from '../entity';
import { Page, nav } from 'tonva-tools';
import { VmApi } from '../vmApi';
import { Tuid } from '../../entities';
import { VmTuidInput } from './vmTuidInput';
import { Button } from 'reactstrap';
import { TypeContent, ContentProps } from './tuidContent';
import { List } from 'tonva-react-form';

export class VmTuidSelect extends VmTuid {
    vmTuidInput: VmTuidInput;

    constructor(vmApi: VmApi, tuid: Tuid, vmTuidInput: VmTuidInput) {
        super(vmApi, tuid);
        this.vmTuidInput = vmTuidInput;
    }
    renderView() {
        return <TuidSelect vm={this} row={Row} />;
    }
}

class Row extends React.Component<ContentProps> {
    render() {
        return <div className="px-3 py-2">{JSON.stringify(this.props.values)}</div>;
    }
}

export class TuidSelect extends React.Component<{vm:VmTuidSelect, row: TypeContent}> {
    private rows = [
        {id: 1, name: 'ddd'},
        {id: 2, name: 'xxx'},
    ];
    constructor(props) {
        super(props);
        this.itemRender = this.itemRender.bind(this);
        this.itemClick = this.itemClick.bind(this);
    }
    private itemRender(item:any, index:number):JSX.Element {
        return <this.props.row values={item} />
    }
    private itemClick(item:any) {
        this.props.vm.vmTuidInput.vmFormRowTuidInput.setValue(item.id);
        nav.pop();
    }
    render() {
        return <Page header={'选择 - ' + this.props.vm.entity.name}>
            <List
                items={this.rows} 
                item={{render: this.itemRender, onClick: this.itemClick}} />
        </Page>;
    }
}