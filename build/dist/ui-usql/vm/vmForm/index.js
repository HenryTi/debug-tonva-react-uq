import * as React from 'react';
import { ViewModel } from '../viewModel';
import { VmFormSubmitButtonRow } from './row';
import { FormRowBuilder } from './rowBuilder';
import { observer } from '../../../../node_modules/mobx-react';
export * from './row';
export class VmForm extends ViewModel {
    constructor(values, fields, submitButton, fieldUIs, className, rowBuilder) {
        super();
        this.className = 'px-2 py-2';
        this.view = Form;
        this.values = values;
        this.fields = fields;
        this.fieldUIs = fieldUIs;
        this.submitButtonRow = new VmFormSubmitButtonRow(this, submitButton);
        if (className !== undefined)
            this.className = className;
        this.rowBuilder = rowBuilder || new FormRowBuilder;
        this.rows = this.rowBuilder.buildRows(this, fields, fieldUIs);
    }
    getValue(fieldName) { return this.values[fieldName]; }
    setValue(fieldName, value) { this.values[fieldName] = value; }
    reset() {
        if (this.rows === undefined)
            return;
        for (let row of this.rows) {
            row.reset();
        }
    }
}
const Form = observer(({ vm }) => {
    let { className, rows, submitButtonRow } = vm;
    return React.createElement("form", { className: className },
        rows.map(v => v.renderView()),
        submitButtonRow.renderView());
});
//# sourceMappingURL=index.js.map