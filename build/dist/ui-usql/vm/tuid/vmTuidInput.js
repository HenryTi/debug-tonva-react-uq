import * as React from 'react';
import { ViewModel } from '../viewModel';
import { nav } from 'tonva-tools';
import { VmTuidSelect } from './vmTuidSelect';
export class VmTuidInput extends ViewModel {
    constructor(vmApi, tuid, vmFormRowTuidInput, tuidContent) {
        super();
        this.tuid = tuid;
        this.tuidContent = tuidContent;
        this.vmFormRowTuidInput = vmFormRowTuidInput;
        this.onClick = this.onClick.bind(this);
    }
    onClick() {
        let vmTuidSelect = new VmTuidSelect(this.vmApi, this.tuid, this);
        nav.push(vmTuidSelect.renderView());
    }
    renderView() {
        return React.createElement("button", { className: "form-control btn btn-outline-info", type: "button", style: { textAlign: 'left', paddingLeft: '0.75rem' }, onClick: this.onClick },
            "tuid: ",
            this.tuid.name + ' - ' + this.vmFormRowTuidInput.getValue());
    }
}
//# sourceMappingURL=vmTuidInput.js.map