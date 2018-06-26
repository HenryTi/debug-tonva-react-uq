var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import * as React from 'react';
import { observer } from 'mobx-react';
import { ViewModel } from '../../viewModel';
import { observable } from 'mobx';
export class VmForm extends ViewModel {
    constructor(vmApi, className, fields) {
        super();
        this.formRows = [];
        this.vmApi = vmApi;
        this.className = className;
        this.fields = fields;
        this.buildRows();
    }
    buildRows() {
        let len = this.fields.length;
        for (let i = 0; i < len; i++) {
            let field = this.fields[i];
            this.formRows.push(this.buildRow(i, field));
        }
    }
    buildRow(key, field) {
        switch (field.type) {
            case 'tinyint':
            case 'smallint':
            case 'int':
                return new VmNumber(key, field);
            case 'bigint':
                let tuidName = field.tuid;
                if (tuidName === undefined)
                    return new VmNumber(key, field);
                return new VmTuidInput(key, field, this.vmApi.getTuid(tuidName));
            case 'char':
            case 'text':
                return new VmString(key, field);
            default: return new VmFormRow(key, field);
        }
    }
    renderView() {
        return React.createElement(Form, { vm: this });
    }
}
let Form = class Form extends React.Component {
    render() {
        let { vm } = this.props;
        let { formRows, className } = vm;
        return React.createElement("form", { className: className }, formRows.map(v => v.renderView()));
    }
};
Form = __decorate([
    observer
], Form);
export class VmFormRow extends ViewModel {
    //private label:any;
    constructor(key, field) {
        super();
        this.key = key;
        this.field = field;
        //this.label = label;
    }
    renderInput() {
        return React.createElement("div", { className: "form-control-plaintext" },
            "unknow field type: ",
            JSON.stringify(this.field));
    }
    renderError() {
        if (this.error === undefined)
            return;
        return React.createElement("div", null, this.error);
    }
    renderControl() {
        return React.createElement("div", { className: "col-sm-10" },
            this.renderInput(),
            this.renderError());
    }
    renderView() {
        return React.createElement("div", { key: this.key, className: 'form-group row' },
            React.createElement("label", { className: 'col-sm-2 col-form-label' }, this.field.name),
            this.renderControl());
    }
}
__decorate([
    observable
], VmFormRow.prototype, "error", void 0);
export class VmTuidInput extends VmFormRow {
    constructor(key, field, tuid) {
        super(key, field);
        this.tuid = tuid;
    }
    renderInput() {
        return React.createElement("div", { className: "form-control-plaintext" },
            "tuid: ",
            this.tuid.name);
    }
}
export class VmInput extends VmFormRow {
    constructor(key, field) {
        super(key, field);
        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }
    onFocus() {
        this.error = undefined;
    }
    onBlur() {
        this.error = 'error';
    }
    renderInput() {
        return React.createElement("input", { className: "form-control", type: this.inputType, onFocus: this.onFocus, onBlur: this.onBlur });
    }
}
export class VmNumber extends VmInput {
}
export class VmString extends VmInput {
}
//# sourceMappingURL=vmForm.js.map