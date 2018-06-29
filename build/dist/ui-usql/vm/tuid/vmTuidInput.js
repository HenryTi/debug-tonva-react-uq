import * as React from 'react';
import { ViewModel } from '../viewModel';
import { nav } from 'tonva-tools';
export class VmTuidInput extends ViewModel {
    constructor(vmApi, tuid, vmFormRowTuidInput, tuidContent, pickerConfig) {
        super();
        this.tuid = tuid;
        this.tuidContent = tuidContent;
        this.vmFormRowTuidInput = vmFormRowTuidInput;
        this.pickerConfig = pickerConfig;
        this.onClick = this.onClick.bind(this);
    }
    onClick() {
        let vmTuidSelect = new this.pickerConfig.picker(this.vmApi, this.tuid, this);
        nav.push(vmTuidSelect.renderView());
    }
    idChanged(id) {
        this.vmFormRowTuidInput.setValue(id);
        this.tuid.useId(id);
    }
    renderView() {
        let value = this.tuid.getId(this.vmFormRowTuidInput.getValue());
        let content = !value ?
            React.createElement(React.Fragment, null,
                "\u70B9\u51FB\u9009\u62E9 ",
                this.tuid.name) :
            React.createElement(this.tuidContent, Object.assign({}, value));
        return React.createElement("button", { className: "form-control btn btn-outline-info", type: "button", style: { textAlign: 'left', paddingLeft: '0.75rem' }, onClick: this.onClick }, content);
    }
}
//# sourceMappingURL=vmTuidInput.js.map