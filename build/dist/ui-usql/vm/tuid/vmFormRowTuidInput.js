import { VmFormFieldRow } from "../vmForm";
export class VmFormRowTuidInput extends VmFormFieldRow {
    constructor(vmApi, form, field, ui, tuid, typeVmTuidInput, typeTuidContent) {
        super(form, field, ui);
        this.vmTuidInput = new typeVmTuidInput(vmApi, tuid, this, typeTuidContent);
    }
    renderInput() {
        return this.vmTuidInput.renderView();
    }
}
//# sourceMappingURL=vmFormRowTuidInput.js.map