import * as React from 'react';
import _ from 'lodash';
import { List, Muted } from 'tonva-react-form';
import { Page, nav } from 'tonva-tools';
import { ViewModel, JSONContent } from './viewModel';
import { VForm, FormMode } from './vForm';
export class VArr extends ViewModel {
    constructor(ownerForm, arr, onEditRow) {
        super();
        this.rowPage = () => {
            return React.createElement(Page, { header: this.label, back: "close" }, this.vForm.render('py-3'));
        };
        this.onSubmit = async () => {
            let { valueBoxs } = this.vForm;
            await this.onRowChanged(valueBoxs);
        };
        this.onRowChanged = async (rowValues) => {
            if (this.rowValues === undefined) {
                this.list.push(rowValues);
                if (this.onEditRow === undefined)
                    this.vForm.reset();
                else
                    await this.onEditRow(undefined, this.onRowChanged);
            }
            else {
                _.merge(this.rowValues, rowValues);
                if (this.onEditRow === undefined)
                    nav.pop();
            }
        };
        this.renderItem = (item, index) => {
            if (this.rowContent === undefined)
                return React.createElement("div", { className: "px-3 py-2" },
                    React.createElement(JSONContent, Object.assign({}, item)));
            return React.createElement(this.rowContent, Object.assign({}, item));
        };
        this.showRow = async (rowValues) => {
            if (this.onEditRow !== undefined) {
                await this.onEditRow(rowValues, this.onRowChanged);
                return;
            }
            this.vForm.reset();
            if (rowValues !== undefined)
                this.vForm.setValues(rowValues);
            nav.push(React.createElement(this.rowPage, null));
        };
        this.editRow = async (rowValues) => {
            this.rowValues = rowValues;
            let { vSubmit } = this.vForm;
            if (vSubmit !== undefined) {
                vSubmit.caption = this.editSubmitCaption;
                vSubmit.className = 'btn btn-outline-success';
            }
            this.vForm.mode = this.ownerForm.mode;
            await this.showRow(rowValues);
        };
        this.internalAddRow = async () => {
            this.rowValues = undefined;
            let { vSubmit } = this.vForm;
            vSubmit.caption = this.newSubmitCaption;
            vSubmit.className = 'btn btn-outline-success';
            this.vForm.reset();
            this.vForm.mode = FormMode.new;
            await this.showRow(undefined);
        };
        this.view = () => {
            let button;
            if (this.addRow !== undefined || this.mode !== FormMode.readonly) {
                button = React.createElement("button", { onClick: this.addRow || this.internalAddRow, type: "button", className: "btn btn-link p-0" }, this.ownerForm.arrTitleNewButton);
            }
            let header = this.header || React.createElement("div", { className: "px-3 bg-light small", style: { paddingTop: '1px', paddingBottom: '1px' } },
                React.createElement("div", { className: "flex-fill align-self-center" }, this.label),
                button);
            return React.createElement(List, { className: "pb-3", header: header, none: React.createElement(Muted, { className: "px-3 py-2" }, this.none), items: this.list, item: { render: this.renderItem, onClick: this.editRow } });
        };
        this.ownerForm = ownerForm;
        let { name, fields } = arr;
        this.name = name;
        let { ui, res, mode, inputs, values } = ownerForm;
        let arrsRes = res.arrs;
        let arrRes = arrsRes !== undefined ? arrsRes[name] : {};
        let { label, none, newSubmit, editSubmit } = arrRes;
        this.none = none || ownerForm.none;
        this.newSubmitCaption = newSubmit || ownerForm.arrNewCaption;
        this.editSubmitCaption = editSubmit || ownerForm.arrEditCaption;
        this.label = label || name;
        let arrUI = ((ui && ui.items[name]) || {});
        this.rowContent = arrUI.rowContent; // || JSONContent;
        this.mode = mode;
        if (this.onEditRow === undefined) {
            this.vForm = new VForm({
                fields: fields,
                arrs: undefined,
                ui: arrUI,
                res: arrRes,
                inputs: inputs[name],
                none: ownerForm.none,
                submitCaption: 'submit',
                arrNewCaption: undefined,
                arrEditCaption: undefined,
                arrTitleNewButton: undefined,
                mode: mode,
            }, mode === FormMode.readonly ? undefined : this.onSubmit);
        }
        else {
            this.onEditRow = onEditRow;
        }
        this.list = values[name];
    }
    reset() {
        this.vForm.reset();
        this.list.clear();
    }
    setAddRow(addRow) {
        this.addRow = addRow;
    }
}
//# sourceMappingURL=vArr.js.map