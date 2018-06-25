import { VmFormFieldRow, VmForm } from "../vmForm";
import { TypeVmTuidInput, VmTuidInput } from "./vmTuidInput";
import { TypeTuidContent } from "./tuidContent";
import { Field } from "../field";
import { Tuid } from "../../entities";
import { VmApi } from "../vmApi";

export class VmFormRowTuidInput extends VmFormFieldRow {
    protected vmTuidInput:VmTuidInput;
    constructor(vmApi:VmApi, form:VmForm, field: Field, ui: any, 
        tuid: Tuid,
        typeVmTuidInput:TypeVmTuidInput,
        typeTuidContent:TypeTuidContent)
    {
        super(form, field, ui);
        this.vmTuidInput = new typeVmTuidInput(vmApi, tuid, this, typeTuidContent);
    }

    renderInput() {
        return this.vmTuidInput.renderView();
    }
}
