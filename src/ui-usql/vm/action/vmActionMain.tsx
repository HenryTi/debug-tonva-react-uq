import * as React from 'react';
import { Page } from 'tonva-tools';
import { VmForm } from '../form';
import { Vm, Vm_Entity } from '../VM';
import { CrAction, ActionUI } from './crAction';
import { Action } from '../../entities';

export class VmActionMain extends Vm_Entity<Action> {
    protected coordinator: CrAction;
    private vmForm: VmForm;
    private returns: any;

    private onSubmit = async () => {
        this.returns = await this.coordinator.submit(this.vmForm.values);
        this.close();
        this.open(this.resultPage);
    }

    protected async showEntryPage(param?:any):Promise<void> {
        this.vmForm = this.coordinator.createVmFieldsForm();
        this.vmForm.onSubmit = this.onSubmit;
        this.open(this.mainPage);
    }

    protected mainPage = () => {
        let {label} = this.coordinator;
        return <Page header={label}>
            {this.vmForm.render('mx-3 my-2')}
        </Page>;
    }

    protected resultPage = () => {
        let {label} = this.coordinator;
        return <Page header={label} back="close">
            完成！
            <pre>
                {JSON.stringify(this.returns, undefined, ' ')}
            </pre>
        </Page>;
    }
}
