import * as React from 'react';
import { VmFormFieldRow, VmForm } from "../vmForm";
import { Field } from '../field';
import { Tuid } from '../../entities';
import { ViewModel } from '../viewModel';
import { VmTuid } from '../entity';
import { VmApi } from '../vmApi';

export class VmFormRowTuidInput extends VmFormFieldRow {
    protected vmApi: VmApi;
    protected tuid: Tuid;
    protected vmTuidInput: VmTuidInput;
    constructor(form:VmForm, field: Field, ui: any, vmApi:VmApi, tuidName:string) {
        super(form, field, ui);
        this.vmApi = vmApi;
        this.tuid = this.vmApi.getTuid(tuidName);
        this.vmTuidInput = new VmTuidInput(this.vmApi, this.tuid);
    }
    renderInput() {
        return this.vmTuidInput.renderView();
    }
}

export class VmTuidContent extends ViewModel {
    protected values: any;
    protected vmApi: VmApi;
    protected tuid: Tuid;
    constructor(vmApi: VmApi, tuid: Tuid) {
        super();
        this.vmApi = vmApi;
        this.tuid = tuid;
    }
    renderView() {
        return <span>
            tuid: {JSON.stringify(this.values)}
        </span>;
    }
}

export class VmTuidInput extends ViewModel {
    protected vmApi: VmApi;
    protected tuid: Tuid;
    constructor(vmApi: VmApi, tuid: Tuid) {
        super();
        this.vmApi = vmApi;
        this.tuid = tuid;
        this.onClick = this.onClick.bind(this);
    }
    protected onClick() {

    }
    renderView() {
        return <button className="form-control btn btn-outline-info"
            type="button"
            style={{textAlign:'left', paddingLeft:'0.75rem'}}
            onClick={this.onClick}>
            tuid: {this.tuid.name}
        </button>;
    }
}
