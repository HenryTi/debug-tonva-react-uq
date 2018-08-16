import * as React from 'react';
import { ViewModel } from "../viewModel";
export class VmField extends ViewModel {
    constructor(vmForm, name) {
        super();
        this.view = () => React.createElement("div", null);
        this.vmForm = vmForm;
        this.name = name;
    }
}
export class VmInputField extends VmField {
}
export class VmNumberField extends VmInputField {
}
export class VmIntField extends VmNumberField {
}
export class VmDecField extends VmNumberField {
}
export class VmStringField extends VmInputField {
}
export class VmTextField extends VmInputField {
}
export class VmTuidField extends VmInputField {
}
//# sourceMappingURL=vmField.js.map