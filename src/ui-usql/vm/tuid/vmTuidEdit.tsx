import * as React from 'react';
import { observer } from 'mobx-react';
import { FA } from 'tonva-react-form';
import { Button } from 'reactstrap';
import { Tuid, Entity } from '../../entities';
import { VmEntity, vmLinkIcon } from '../entity/vmEnity';
import { Page, nav } from 'tonva-tools';
import { VmApi } from '../vmApi';
import { TypeContent, TuidContentJSON, VmTuidInput, TypeVmTuidInput } from '../tuid';
import { VmTuidBase } from './vmTuidBase';

export type TypeVmTuidEdit = typeof VmTuidEdit;

export class VmTuidEdit extends VmTuidBase {
    id: number;

    initBind() {
        super.initBind();
        this.next = this.next.bind(this);
        this.finish = this.finish.bind(this);
    }

    async loadId(id: number) {
        this.id = id;
    }

    protected async next() {
        this.resetForm();
        nav.pop();
    }

    protected finish() {
        nav.pop(2);
    }

    protected resetForm() {
        this.resetValues();
        this.vmForm.reset();
    }

    async submit() {
        let ret = await this.entity.save(this.id, this.values);
        if (ret) {
            alert('这里还要判断返回值，先不处理了 \n' + JSON.stringify(ret));
        }
        nav.push(<Page header={this.caption + '提交成功'} back="none">
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

    renderForm(className?:string) {
        let fieldUIs:any[] = undefined;
        let vmForm = this.newVmForm(this.values, 
            this.entity.schema.fields, fieldUIs, className);
        return vmForm.renderView();
    }

    renderView() {
        return <TuidNewPage vm={this} />;
    }
}

@observer
export class TuidNewPage extends React.Component<{vm:VmTuidEdit}> {
    render() {
        let {vm} = this.props;
        let {caption, values} = this.props.vm;
        return <Page header={'新增 - ' + caption}>
            {vm.renderForm('mx-3 my-2')}
        </Page>;
    }
}
