var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import * as React from 'react';
import { ViewModel } from "../viewModel";
import { observable } from 'mobx';
export class VmFormRow extends ViewModel {
    constructor(form, key, label) {
        super();
        this.form = form;
        this.key = key;
        this.label = label;
    }
    renderContent() {
        return React.createElement("div", { className: "form-control-plaintext" }, "VMFormRow base");
    }
    renderControl() {
        return React.createElement("div", { className: "col-sm-10" }, this.renderContent());
    }
    renderView() {
        return React.createElement("div", { key: this.key, className: 'form-group row' },
            React.createElement("label", { className: 'col-sm-2 col-form-label' }, this.label),
            this.renderControl());
    }
}
export class VmFormFieldRow extends VmFormRow {
    constructor(form, field, ui) {
        let fn = field.name;
        let _label = fn;
        if (ui !== undefined) {
            let { label } = ui;
            if (label !== undefined)
                _label = label;
        }
        super(form, fn, _label);
        this.field = field;
        this.ui = ui;
    }
    renderContent() {
        return this.renderInput();
    }
    getValue() { return this.form.getValue(this.field.name); }
    setValue(value) { this.form.setValue(this.field.name, value); }
    parse(text) { return text; }
}
export class VmFormFieldRowUnkown extends VmFormFieldRow {
    renderInput() {
        return React.createElement("div", { className: "form-control-plaintext" },
            "unknown field: ",
            JSON.stringify(this.field));
    }
}
export class VmFormFieldRowInput extends VmFormFieldRow {
    constructor(form, field, ui) {
        super(form, field, ui);
        this.ref = this.ref.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    renderError() {
        if (this.error === undefined)
            return;
        return React.createElement("div", null, this.error);
    }
    renderContent() {
        return React.createElement(React.Fragment, null,
            this.renderInput(),
            this.renderError());
    }
    ref(input) {
        this.input = input;
        if (input) {
            let v = this.getValue();
            if (v !== null)
                this.input.value = v;
        }
    }
    onFocus() {
        this.error = undefined;
    }
    onBlur() {
        this.error = 'error';
    }
    onChange(evt) {
        this.setValue(this.parse(evt.currentTarget.value));
    }
    renderInput() {
        return React.createElement("input", { className: "form-control", ref: this.ref, type: this.inputType, onFocus: this.onFocus, onBlur: this.onBlur, onChange: this.onChange });
    }
}
__decorate([
    observable
], VmFormFieldRowInput.prototype, "error", void 0);
export class VmFormFieldRowNumber extends VmFormFieldRowInput {
    constructor() {
        super(...arguments);
        this.inputType = 'number';
    }
    parse(text) {
        try {
            let ret = Number(text);
            return (ret === NaN) ? null : ret;
        }
        catch (_a) {
            return null;
        }
    }
}
export class VmFormFieldRowString extends VmFormFieldRowInput {
    constructor() {
        super(...arguments);
        this.inputType = 'text';
    }
}
//# sourceMappingURL=row.js.map