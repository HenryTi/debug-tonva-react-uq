import * as React from 'react';
import { Button, ButtonProps } from 'reactstrap';
import { Page } from 'tonva-tools';
import { List, Muted } from 'tonva-react-form';
import { VmSheet } from './vmSheet';
import { VmForm } from '../form';
import { Vm_Entity } from '../VM';
import { Sheet } from '../../entities';

export class VmSheetNew extends Vm_Entity<Sheet> {
    vmForm: VmForm;

    protected async showEntryPage(param?:any) {
        this.vmForm = this.coordinator.createVmFieldsForm();
        this.vmForm.onSubmit = this.onSubmit;
        this.open(this.view);
    }

    onSubmit = async (values:any):Promise<void> => {
        let ret = await this.entity.save(this.label, values);
        alert('[' + this.label + '] 已保存: ' + JSON.stringify(ret));
        this.close();
    }

    protected view = () => <Page header={this.label}>
        {this.vmForm.render()}
    </Page>;
}
