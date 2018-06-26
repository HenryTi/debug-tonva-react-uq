import { VmFormFieldRow, VmForm } from "../vmForm";
import { TypeVmTuidInput, VmTuidInput, PickerConfig } from "./vmTuidInput";
import { TypeContent } from "./tuidContent";
import { Field } from "../field";
import { Tuid } from "../../entities";
import { VmApi } from "../vmApi";

export class VmFormRowTuidInput extends VmFormFieldRow {
    protected vmTuidInput:VmTuidInput;
    constructor(vmApi:VmApi, form:VmForm, field: Field, 
        ui: any, 
        tuid: Tuid,
        typeVmTuidInput:TypeVmTuidInput,
        typeTuidContent:TypeContent,
        pickerConfig:PickerConfig
    ){
        super(form, field, ui);
        this.vmTuidInput = new typeVmTuidInput(vmApi, tuid, this, typeTuidContent, pickerConfig);
    }

    renderInput() {
        return this.vmTuidInput.renderView();
    }
}
