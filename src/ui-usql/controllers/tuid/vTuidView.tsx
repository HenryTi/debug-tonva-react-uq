import * as React from 'react';
import { observer } from 'mobx-react';
import { FA } from 'tonva-react-form';
import { Button } from 'reactstrap';
import { Page } from 'tonva-tools';
import { VForm } from '../form';
import { VEntity } from '../VM';
import { TuidMain } from '../../entities';
import { TuidUI, CTuidMain } from './cTuid';

export type TypeVTuidView = typeof VTuidView;

export class VTuidView extends VEntity<TuidMain, TuidUI, CTuidMain> {
    vForm: VForm;
    id: number;

    async showEntry(param?:any) {
        let data = await this.entity.valueFromId(param)
        this.vForm = this.createForm(undefined, data);
        this.openPage(this.view);
    }

    async loadId(id: number) {
        this.id = id;
    }

    protected next = async () => {
        this.vForm.reset();
        this.closePage();
    }

    protected finish = () => {
        this.closePage(2);
    }

    protected resetForm() {
        this.vForm.reset();
    }

    protected onSubmit = async () => {
        let ret = await this.entity.save(this.id, this.vForm.values);
        if (ret) {
            alert('这里还要判断返回值，先不处理了 \n' + JSON.stringify(ret));
        }
        this.openPage(() => <Page header={this.label + '提交成功'} back="none">
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

    protected view = observer(() => <Page header={this.label}>
            {this.vForm.render('mx-3 my-2')}
    </Page>);
}