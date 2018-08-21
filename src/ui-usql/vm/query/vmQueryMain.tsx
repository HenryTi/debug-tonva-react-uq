import * as React from 'react';
import { observer } from 'mobx-react';
import { TonvaForm, List, SubmitResult, FA } from 'tonva-react-form';
import { Page, nav } from 'tonva-tools';
import { Tuid, Query, Entity } from '../../entities';
import { VmForm } from '../form';
import { VmEntity } from '../VM';

export class VmQueryMain extends VmEntity<Query> {
    protected vmForm: VmForm;
    //protected result: any;

    async showEntry(param?:any):Promise<void> {
        this.vmForm = this.createForm(this.onSubmit, param);
        //this.vmForm.onSubmit = this.onSubmit;
        this.open(this.view);
    }

    onSubmit = async () => {
        let params = this.vmForm.values;
        await this.entity.loadSchema();
        if (this.entity.isPaged === true) {
            await this.entity.resetPage(30, params);
            await this.entity.loadPage();
            //this.replacePage(<QueryResultPage vm={this} />);
            nav.pop();
            this.open(this.pageResult);
        }
        else {
            let data = await this.entity.query(params);
            //let data = await this.unpackReturns(res);
            //return data;
            nav.pop();
            this.open(this.queryResult, data);
        }
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

    protected pageResult = () => {
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

    protected queryResult = observer((result:any) => {
        let rightClose = <button
            className="btn btn-outline-success btn-sm"
            onClick={this.again}>
            <FA name="search" /> 再查询
        </button>;
        return <Page header={this.label} right={rightClose}>
            <pre>{JSON.stringify(result, undefined, '\t')}</pre>
        </Page>;
    })
}
