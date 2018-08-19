import * as React from 'react';
export class VmBand {
    constructor(label) {
        this.view = () => React.createElement("div", null);
        this.label = label;
    }
    render() {
        return React.createElement("div", { key: this.key, className: 'form-group row' },
            React.createElement("label", { className: 'col-sm-2 col-form-label' }, this.label),
            React.createElement("div", { className: "col-sm-10" }, this.renderContent()));
    }
    get key() { return this.label; }
    renderContent() {
        return React.createElement("div", { className: "form-control form-control-plaintext bg-white border border-info rounded " }, "content");
    }
}
export class VmFieldBand extends VmBand {
    constructor(label, vmField) {
        super(label);
        this.vmField = vmField;
    }
    get key() { return this.vmField.name; }
    renderContent() {
        return this.vmField.render();
        /*
        <div className="form-control form-control-plaintext bg-white border border-info rounded ">
            {this.vmField.render()}
        </div>;*/
    }
}
export class VmArrBand extends VmBand {
    constructor(label, vmArr) {
        super(label);
        this.vmArr = vmArr;
    }
    get key() { return this.vmArr.name; }
    render() {
        return React.createElement("div", null, "VmArrBand");
    }
}
export class VmFieldsBand extends VmBand {
    constructor(label, vmFields) {
        super(label);
        this.vmFields = vmFields;
    }
    renderContent() {
        return React.createElement("div", { className: "form-control form-control-plaintext bg-white border border-info rounded " }, "fields");
    }
}
export class VmSubmitBand extends VmBand {
    constructor(vmSubmit) {
        super(undefined);
        this.vmSubmit = vmSubmit;
    }
    render() {
        let { vmForm } = this.vmSubmit;
        let { onSubmit, isOk } = vmForm;
        return React.createElement("div", { key: "$submit", className: "form-group row" },
            React.createElement("div", { className: "offset-sm-2 col-sm-10" },
                React.createElement("button", { type: "button", onClick: vmForm.onSubmit, className: "btn btn-primary", disabled: isOk === false }, "Submit")));
    }
}
//# sourceMappingURL=vmBand.js.map