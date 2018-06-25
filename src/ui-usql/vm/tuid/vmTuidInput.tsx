import * as React from 'react';
import { Tuid } from '../../entities';
import { ViewModel } from '../viewModel';
import { TypeContent } from './tuidContent';
import { nav } from 'tonva-tools';
import { VmTuidSelect } from './vmTuidSelect';
import { VmApi } from '../vmApi';
import { VmFormRowTuidInput } from './vmFormRowTuidInput';

export type TypeVmTuidInput = new (vmApi:VmApi, tuid: Tuid, vmFormRowTuidInput: VmFormRowTuidInput, tuidContent: TypeContent) => VmTuidInput;

export class VmTuidInput extends ViewModel {
    protected vmApi:VmApi;
    protected tuid: Tuid;
    protected tuidContent: TypeContent;
    vmFormRowTuidInput: VmFormRowTuidInput;

    constructor(vmApi:VmApi, tuid: Tuid, vmFormRowTuidInput: VmFormRowTuidInput, tuidContent: TypeContent) {
        super();
        this.tuid = tuid;
        this.tuidContent = tuidContent;
        this.vmFormRowTuidInput = vmFormRowTuidInput;
        this.onClick = this.onClick.bind(this);
    }
    protected onClick() {
        let vmTuidSelect = new VmTuidSelect(this.vmApi, this.tuid, this);
        nav.push(vmTuidSelect.renderView());
    }
    renderView() {
        return <button className="form-control btn btn-outline-info"
            type="button"
            style={{textAlign:'left', paddingLeft:'0.75rem'}}
            onClick={this.onClick}>
            tuid: {this.tuid.name + ' - ' + this.vmFormRowTuidInput.getValue()}
        </button>;
    }
}
