import * as React from 'react';
import { ViewModel } from '../viewModel';
import { FormRowBuilder } from './rowBuilder';
export * from './row';
export class VmForm extends ViewModel {
    constructor(values, fields, fieldUIs, className, rowBuilder) {
        super();
        this.className = 'px-2 py-2';
        this.values = values;
        this.fields = fields;
        this.fieldUIs = fieldUIs;
        if (className !== undefined)
            this.className = className;
        this.rowBuilder = rowBuilder || new FormRowBuilder;
        this.rows = this.rowBuilder.buildRows(this, fields, fieldUIs);
    }
    getValue(fieldName) { return this.values[fieldName]; }
    setValue(fieldName, value) { this.values[fieldName] = value; }
    renderView() {
        return React.createElement("form", { className: this.className }, this.rows.map(v => v.renderView()));
    }
}
//# sourceMappingURL=index.js.map