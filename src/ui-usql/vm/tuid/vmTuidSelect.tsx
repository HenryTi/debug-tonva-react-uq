import * as React from 'react';
import { VmTuid } from '../entity';
import { Page, nav } from 'tonva-tools';
import { VmApi } from '../vmApi';
import { Tuid } from '../../entities';
import { VmTuidInput } from './vmTuidInput';
import { Button } from 'reactstrap';

export class VmTuidSelect extends VmTuid {
    vmTuidInput: VmTuidInput;

    constructor(vmApi: VmApi, tuid: Tuid, vmTuidInput: VmTuidInput) {
        super(vmApi, tuid);
        this.vmTuidInput = vmTuidInput;
    }
    renderView() {
        return <TuidSelect vm={this} />;
    }
}

export class TuidSelect extends React.Component<{vm:VmTuidSelect}> {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }
    private onClick() {
        this.props.vm.vmTuidInput.vmFormRowTuidInput.setValue('dddd xxxx');
        nav.pop();
    }
    render() {
        return <Page header={this.props.vm.entity.name}>
            dddd
            <Button onClick={this.onClick}>test</Button>
        </Page>;
    }
}