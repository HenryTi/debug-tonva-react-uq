import * as React from 'react';
import { ViewModel } from "../viewModel";
export class VmBand extends ViewModel {
    constructor(label) {
        super();
        this.view = () => React.createElement("div", null);
        this.label = label;
    }
}
export class VmFieldBand extends VmBand {
    constructor(label, vmField) {
        super(label);
        this.vmField = vmField;
    }
}
export class VmArrBand extends VmBand {
    constructor(label, vmArr) {
        super(label);
        this.vmArr = vmArr;
    }
}
export class VmFieldsBand extends VmBand {
    constructor(label, vmFields) {
        super(label);
        this.vmFields = vmFields;
    }
}
export class VmSubmitBand extends VmBand {
    constructor(vmSubmit) {
        super(undefined);
        this.vmSubmit = vmSubmit;
    }
}
//# sourceMappingURL=vmBand.js.map