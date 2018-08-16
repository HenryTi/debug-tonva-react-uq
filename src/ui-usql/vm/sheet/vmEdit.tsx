import * as React from 'react';
import { Page } from 'tonva-tools';
import { Sheet } from '../../entities';
import { VmForm } from '../form';
import { Vm_Entity } from '../VM';

export class VmSheetEdit extends Vm_Entity<Sheet> {
    vmForm: VmForm;

    protected async showEntryPage(param?:any) {
        this.vmForm = this.coordinator.createVmFieldsForm();
    }

    protected view = () => <Page header={this.label}>
        {this.vmForm.render()}
    </Page>;
}
