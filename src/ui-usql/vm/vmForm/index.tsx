import * as React from 'react';
import { ViewModel } from '../viewModel';
import { VmFormRow, VmFormSubmitButtonRow } from './row';
import { FormRowBuilder } from './rowBuilder';
import { Field } from '../field';

export * from './row';

export type TypeVmForm = typeof VmForm;
export class VmForm extends ViewModel {
    protected values: any;
    protected className: string = 'px-2 py-2';
    protected rowBuilder: FormRowBuilder;
    protected fields: Field[];
    protected submitButtonRow: VmFormSubmitButtonRow;
    protected fieldUIs: any[];
    protected rows: VmFormRow[];

    constructor(values:any, fields: Field[], submitButton?:JSX.Element, fieldUIs?:any[], className?:string, rowBuilder?: FormRowBuilder) {
        super();
        this.values = values;
        this.fields = fields;
        this.fieldUIs = fieldUIs;
        this.submitButtonRow = new VmFormSubmitButtonRow(this, submitButton);
        if (className !== undefined) this.className = className;
        this.rowBuilder = rowBuilder || new FormRowBuilder;
        this.rows = this.rowBuilder.buildRows(this, fields, fieldUIs);
    }

    getValue(fieldName: string) { return this.values[fieldName] }
    setValue(fieldName: string, value: any) { this.values[fieldName] = value }

    reset() {
        if (this.rows === undefined) return;
        for (let row of this.rows) {
            row.reset();
        }
    }

    renderView() {
        return <form className={this.className}>
            {this.rows.map(v => v.renderView())}
            {this.submitButtonRow.renderView()}
        </form>
    }
}
