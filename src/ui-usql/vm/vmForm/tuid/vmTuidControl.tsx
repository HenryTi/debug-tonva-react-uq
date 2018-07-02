import * as React from 'react';
import { Tuid } from '../../../entities';
import { ViewModel, TypeContent } from '../../viewModel';
import { nav } from 'tonva-tools';
//import { VmTuidPicker, TypeVmTuidPicker } from './vmTuidPicker';
import { VmApi } from '../../vmApi';
import { VmControl } from '../control';
import { FieldUI } from '../formUI';
import { FormValues } from '../vmForm';
//import { VmFormRowTuidInput } from './vmFormRowTuidInput';

//export type TypeVmTuidInput = typeof VmTuidInput; // new (vmApi:VmApi, tuid: Tuid, vmFormRowTuidInput: VmFormRowTuidInput, tuidContent: TypeContent) => VmTuidInput;
export type TypeIdFromValue = (values) => number;

export interface PickerConfig {
    picker: any;//TypeVmTuidPicker;
    row: TypeContent;
    idFromValue?: TypeIdFromValue,
}

export class VmTuidControl extends VmControl {
    protected vmApi:VmApi;

    tuidContent: TypeContent;
    tuid: Tuid;
    pickerConfig: PickerConfig;

    constructor(fieldUI: FieldUI, formValues:FormValues,
        vmApi:VmApi, tuid: Tuid, 
        //vmFormRowTuidInput: VmFormRowTuidInput, 
        tuidContent: TypeContent, 
        pickerConfig: PickerConfig
    ) {
        super(fieldUI, formValues);
        this.tuid = tuid;
        this.tuidContent = tuidContent;
        this.pickerConfig = pickerConfig;
    }
    onClick = () => {
        let vmTuidSelect = new this.pickerConfig.picker(this.vmApi, this.tuid, this);
        nav.push(vmTuidSelect.renderView());
    }
    idChanged(id:number) {
        this.value =id;
        this.tuid.useId(id);
    }

    protected view = Control;
}

const Control = ({vm}:{vm:VmTuidControl}) => {
    let {tuid, onClick} = vm;
    let value = tuid.getId(vm.value);
    let content = !value?
        <>点击选择 {tuid.name}</> : 
        <vm.tuidContent {...value} />;
    return <button className="form-control btn btn-outline-info"
        type="button"
        style={{textAlign:'left', paddingLeft:'0.75rem'}}
        onClick={onClick}>
        {content}
    </button>;
}
