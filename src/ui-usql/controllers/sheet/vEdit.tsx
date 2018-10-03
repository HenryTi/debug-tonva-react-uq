import * as React from 'react';
import { Page } from 'tonva-tools';
import { VForm, FormMode } from '../form';
import { VSheetView } from './vSheetView';
import { SheetData } from './cSheet';

export class VSheetEdit extends VSheetView { //VEntity<Sheet, SheetUI, CSheet> {
    async showEntry(param: SheetData) {
        this.vForm = this.createForm(this.onSubmit, param.data, FormMode.edit);
        this.openPage(this.view);
    }

    onSubmit = (values:any):Promise<void> => {
        alert('not implemented');
        return;
    }

    protected view = () => <Page header={this.label}>
        {this.vForm.render()}
    </Page>;
}
