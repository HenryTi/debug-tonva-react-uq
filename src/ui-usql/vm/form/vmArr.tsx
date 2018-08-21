import * as React from 'react';
import { IObservableArray, observable } from 'mobx';
import * as _ from 'lodash';
import { List, FA } from 'tonva-react-form';
import { Page, nav } from 'tonva-tools';
import { ViewModel, RowContent, TypeContent, JSONContent } from '../viewModel';
import { ArrFields, Field } from '../../entities';
import { VmForm, FieldInputs } from './vmForm';
//import { ArrBandUIX } from './formUIX';
//import { VmApi } from '../vmApi';
import { SubmitBandUI } from './formUI';
import { VmBand } from './vmBand';
//import { VmPage } from '../vmPage';

export type ArrEditRow = (initValues:any, onRowChanged:(rowValues:any)=>void) => Promise<void>;

export class VmArr extends ViewModel {
    /*
    //protected vmApi: VmApi;
    //protected arrBandUI: ArrBandUIX;
    arr: ArrFields;
    vmForm: VmForm;
*/

    protected readOnly: boolean;
    protected label: any;
    protected header: any;
    protected footer: any;
    protected rowValues: any;                 // 仅仅用来判断是不是新增，undefined则是新增
    protected onEditRow: ArrEditRow;
    protected ownerForm:VmForm;
    protected vmForm:VmForm;
    protected rowContent:TypeContent;
    protected newSubmitCaption: string;
    protected editSubmitCaption: string;

    //protected bands:VmBand[];

    name:string;
    list: IObservableArray<any>;

    constructor(ownerForm:VmForm, arr:ArrFields, onEditRow?:ArrEditRow) { //name:string, label, rowContent:TypeContent, bands:VmBand[]) {
        super();
        this.ownerForm = ownerForm;
        let {name, fields} = arr;
        this.name = name;
        //this.rowContent = rowContent;
        //this.bands = bands;
        //this.label = label;
        let {ui, res, readOnly, inputs} = ownerForm;
        let arrsRes = res.arrs;
        let arrRes = arrsRes !== undefined? arrsRes[name] : {};
        this.newSubmitCaption = arrRes.newSubmit || ownerForm.arrNewCaption;
        this.editSubmitCaption = arrRes.editSubmit || ownerForm.arrEditCaption;
        let arrUI = ui && ui[name];
        this.label = arrRes.label || name;
        this.rowContent = JSONContent;
        this.readOnly = readOnly;
        if (this.onEditRow === undefined) {
            this.vmForm = new VmForm({
                fields: fields,
                arrs: undefined,
                ui: arrUI,
                res: arrRes,
                inputs: inputs[name] as FieldInputs,
                submitCaption: 'submit',
                arrNewCaption: undefined,
                arrEditCaption: undefined,
            }, this.onSubmit);
        }
        else {
            this.onEditRow = onEditRow;
        }
        this.list = observable.array([], {deep:true});
        /*
        this.start = this.start.bind(this);
        //this.vmApi = vmApi;
        this.arr = arr;
        this.arrBandUI = arrBandUI;
        let {label, row, form} = arrBandUI;
        this.row = row || RowContent;

        //let bands = this.arrBandUI.bands.slice();
        let submitBand:SubmitBandUI = {
            type: 'submit',
            content: '{save} 完成',                    // 显示在按钮上的文本
        };
        //bands.push(submitBand);
        this.vmForm = new VmForm();
        this.vmForm.init({
            fields: arr.fields,
            //vmApi: vmApi,
            ui: {
                bands: undefined, // bands,
                className: undefined,
            },
            readOnly: this.readOnly,
        });
        this.vmForm.onSubmit = this.onSubmit;
        */
    }

    reset() {
        this.vmForm.reset();
        this.list.clear();
    }

    /*
    afterEditRow = async (values:any):Promise<void> => {
        nav.pop();
        return;
    }

    async showRowPage(rowValues?: any) {
        this.rowValues = rowValues;
        if (rowValues === undefined)
            this.vmForm.reset();
        else
            this.vmForm.setValues(rowValues);
        if (this.onEditRow !== undefined)
            await this.onEditRow(rowValues);
        else
            nav.push(<this.rowPage />);
    }
    */

    protected rowPage = () => {
        return <Page header={this.label}>
            {this.vmForm.render('p-3')}
        </Page>
    }
    private onSubmit = async () => {
        let values = this.vmForm.values;
        await this.onRowChanged(values);
        //if (this.afterEditRow !== undefined) await this.afterEditRow(values);
    }

    private onRowChanged = async (rowValues:any) => {
        if (this.rowValues === undefined) {
            this.list.push(rowValues);
            if (this.onEditRow === undefined)
                this.vmForm.reset();
            else
                await this.onEditRow(undefined, this.onRowChanged);
        }
        else {
            _.merge(this.rowValues, rowValues);
            if (this.onEditRow === undefined) nav.pop();
        }
    }

    private renderItem = (item:any, index:number) => {
        return <div className="px-3 py-2"><this.rowContent {...item} /></div>;
    }
    private showRow = async (rowValues:any):Promise<any> => {
        if (this.onEditRow !== undefined) {
            await this.onEditRow(rowValues, this.onRowChanged);
            return;
        }
        this.vmForm.reset();
        if (rowValues !== undefined) this.vmForm.setValues(rowValues);
        nav.push(<this.rowPage />);
    }
    private editRow = async (rowValues:any): Promise<void> => {
        this.rowValues = rowValues;
        let {vmSubmit} = this.vmForm;
        vmSubmit.caption = this.editSubmitCaption;
        vmSubmit.className = 'btn btn-outline-success';
        await this.showRow(rowValues);
    }
    private addRow = async () => {
        this.rowValues = undefined;
        let {vmSubmit} = this.vmForm;
        vmSubmit.caption = this.newSubmitCaption;
        vmSubmit.className = 'btn btn-outline-success';
        await this.showRow(undefined);
        this.vmForm.reset();
    }

    protected view = () => {
        //let {label, list, renderItem, start, addClick, header, footer, readOnly} = vm;
        let button;
        if (this.readOnly === false) {
            button = <button onClick={this.addRow}
                type="button" 
                className="btn btn-primary btn-sm">
                <FA name="plus" />
            </button>;
        }
        let header = this.header || <div className="">
            <div className="flex-fill align-self-center">{this.label}</div>
            {button}
        </div>;
        return <List
            header={header}
            items={this.list} 
            item={{render: this.renderItem, onClick: this.editRow}} />;
    }
}
/*
const ArrList = ({vm}:{vm:VmArr}) => {
    let {label, list, renderItem, start, addClick, header, footer, readOnly} = vm;
    let button;
    if (readOnly === false) {
        button = <button onClick={addClick}
            type="button" 
            className="btn btn-primary btn-sm">
            <FA name="plus" />
        </button>;
    }
    header = header || <div className="">
        <div className="flex-fill align-self-center">{label}</div>
        {button}
    </div>;
    return <List
        header={header}
        footer={footer}
        items={list} 
        item={{render: renderItem, onClick: start}} />;
};

const RowPage = ({vm}:{vm:VmArr}) => {
    let {label, vmForm} = vm;
    
    return <Page header={label}>
        {vmForm.render()}
    </Page>
}
*/