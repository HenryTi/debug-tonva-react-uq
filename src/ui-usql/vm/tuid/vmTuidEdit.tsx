import * as React from 'react';
import { observer } from 'mobx-react';
import { FA } from 'tonva-react-form';
import { Button } from 'reactstrap';
import { Page, nav } from 'tonva-tools';
import { VmForm } from '../form';
import { Vm, VmEntity } from '../VM';
import { CrTuidMain, TuidUI } from './crTuid';
import { TuidMain, Tuid } from '../../entities';

export type TypeVmTuidEdit = typeof VmTuidEdit;

export class VmTuidEdit extends VmEntity<Tuid, TuidUI> {
    private vmForm: VmForm;
    private id: number;
    protected coordinator: CrTuidMain;

    async showEntry(param?:any):Promise<void> {
        this.vmForm = this.createForm(this.onSubmit, param);
        if (param !== undefined) {
            this.id = param.id;
        }
        this.open(this.editView);
    }

    protected get editView() {
        return () => <Page header={(this.id===undefined? '新增':'编辑') + ' - ' + this.label}>
            {this.vmForm.render('mx-3 my-2')}
        </Page>;
    }

    /*
    protected async beforeStart(param?:any) {
        this.vmForm = this.createVmFieldsForm();
        if (param !== undefined) {
            this.id = param.id;
            this.vmForm.values = param;
        }
        this.vmForm.onSubmit = this.onSubmit;
    }
    */

    protected next = async () => {
        this.vmForm.reset();
        nav.pop();
        //this.popPage();
    }

    protected finish = () => {
        nav.pop(2);
        this.event('edit-end');
    }

    protected resetForm() {
        this.vmForm.reset();
    }

    protected onSubmit = async () => {
        let {values} = this.vmForm;
        let ret = await this.coordinator.entity.save(this.id, values);
        let {id} = ret;
        if (id < 0) {
            let {unique} = this.coordinator.entity;
            if (unique !== undefined) {
                for (let u of unique) {
                    this.vmForm.setError(u, '不能重复');
                }
            }
            return;
        }
        nav.push(<Page header={this.label + '提交成功'} back="none">
            <div className='m-3'>
                <span className="text-success">
                    <FA name='check-circle' size='lg' /> 成功提交！
                </span>
                <div className='mt-5'>
                    <Button className="mr-3" color="primary" onClick={this.next}>继续录入</Button>
                    <Button color="primary" outline={true} onClick={this.finish}>不继续</Button>
                </div>
            </div>
        </Page>);
        return;
    }

    //protected view = TuidNewPage;
}
/*
const TuidNewPage = observer(({vm}:{vm:VmTuidEdit}) => {
    let {label, id, vmForm} = vm;
    return <Page header={(id===undefined? '新增':'编辑') + ' - ' + label}>
        {vmForm.render('mx-3 my-2')}
    </Page>;
});
*/