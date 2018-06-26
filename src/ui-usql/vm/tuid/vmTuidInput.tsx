import * as React from 'react';
import { Tuid } from '../../entities';
import { ViewModel } from '../viewModel';
import { TypeContent } from './tuidContent';
import { nav } from 'tonva-tools';
import { VmTuidPicker, TypeVmTuidPicker } from './vmTuidPicker';
import { VmApi } from '../vmApi';
import { VmFormRowTuidInput } from './vmFormRowTuidInput';

export type TypeVmTuidInput = typeof VmTuidInput; // new (vmApi:VmApi, tuid: Tuid, vmFormRowTuidInput: VmFormRowTuidInput, tuidContent: TypeContent) => VmTuidInput;
export type TypeIdFromValue = (values) => number;

export interface PickerConfig {
    picker: TypeVmTuidPicker;
    row: TypeContent;
    idFromValue?: TypeIdFromValue,
}

export class VmTuidInput extends ViewModel {
    protected vmApi:VmApi;
    protected tuid: Tuid;
    protected tuidContent: TypeContent;
    protected vmFormRowTuidInput: VmFormRowTuidInput;
    pickerConfig: PickerConfig;

    constructor(vmApi:VmApi, tuid: Tuid, 
        vmFormRowTuidInput: VmFormRowTuidInput, 
        tuidContent: TypeContent, 
        pickerConfig: PickerConfig
    ) {
        super();
        this.tuid = tuid;
        this.tuidContent = tuidContent;
        this.vmFormRowTuidInput = vmFormRowTuidInput;
        this.pickerConfig = pickerConfig;
        this.onClick = this.onClick.bind(this);
    }
    protected onClick() {
        let vmTuidSelect = new this.pickerConfig.picker(this.vmApi, this.tuid, this);
        nav.push(vmTuidSelect.renderView());
    }
    idChanged(id:number) {
        this.vmFormRowTuidInput.setValue(id);
        this.tuid.useId(id);
    }
    renderView() {
        let value = this.tuid.getId(this.vmFormRowTuidInput.getValue());
        let content = !value?
            <>点击选择 {this.tuid.name}</> : 
            <this.tuidContent values={value} />;
        return <button className="form-control btn btn-outline-info"
            type="button"
            style={{textAlign:'left', paddingLeft:'0.75rem'}}
            onClick={this.onClick}>
            {content}
        </button>;
    }
}
