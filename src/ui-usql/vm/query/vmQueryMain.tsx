import * as React from 'react';
import { observer } from 'mobx-react';
import { TonvaForm, List, SubmitResult, FA } from 'tonva-react-form';
import { Page, nav } from 'tonva-tools';
import { Tuid, Query, Entity } from '../../entities';
import { VmForm } from '../form';
import { VmEntity } from '../VM';

export class VmQueryMain extends VmEntity<Query> {
    protected vmForm: VmForm;

    async showEntry(param?:any):Promise<void> {
        this.vmForm = this.createForm(param);
        //this.vmForm.onSubmit = this.onSubmit;
        this.open(this.view);
    }

    onSubmit = async () => {
        await this.entity.resetPage(30, this.vmForm.values);
        await this.entity.loadPage();
        //this.replacePage(<QueryResultPage vm={this} />);
        nav.pop();
        this.open(this.queryResultPage);
    }

    again = () => {
        this.vmForm.reset();
        //this.replacePage(<QueryPage vm={this} />);
        nav.pop();
        this.open(this.view);
    }

    renderExtra() {
        return;
    }

    protected view = () => <Page header={this.label}>
        {this.vmForm.render('mx-3 my-2')}
        {this.renderExtra()}
    </Page>;

    protected queryResultPage = () => {
        let {name, list} = this.entity;
        let rightClose = <button
            className="btn btn-outline-success btn-sm"
            onClick={this.again}>
            <FA name="search" /> 再查询
        </button>;
        return <Page header={this.label} right={rightClose}>
            <List items={list} item={{}} />
        </Page>;
    }
}
