import * as React from 'react';
import { IObservableArray, observable } from 'mobx';
import * as _ from 'lodash';
import { List, FA } from 'tonva-react-form';
import { Page, nav } from 'tonva-tools';
import { ViewModel, RowContent, TypeContent } from '../viewModel';
import { ArrFields, Field } from '../../entities';
import { VmForm } from './vmForm';
//import { ArrBandUIX } from './formUIX';
//import { VmApi } from '../vmApi';
import { SubmitBandUI } from './formUI';
import { VmBand } from './vmBand';
//import { VmPage } from '../vmPage';

export type ArrEditRow = (initValues:any, onRowChanged:(values:any)=>Promise<void>) => Promise<void>;

export class VmArr extends ViewModel {
    /*
    //protected vmApi: VmApi;
    //protected arrBandUI: ArrBandUIX;
    arr: ArrFields;
    vmForm: VmForm;
    onEditRow: ArrEditRow;
    rowValues: any;                 // 仅仅用来判断是不是新增，undefined则是新增
*/
    protected row: any;
    protected readOnly: boolean;
    protected label: any;
    protected header: any;
    protected footer: any;

    protected ownerForm:VmForm;
    protected vmForm:VmForm;
    protected rowContent:TypeContent;
    protected bands:VmBand[];

    name:string;
    list: IObservableArray<any>;

    constructor(ownerForm:VmForm, name:string, rowContent:TypeContent, bands:VmBand[]) {
        super();
        this.ownerForm = ownerForm;
        this.name = name;
        this.rowContent = rowContent;
        this.bands = bands;
        /*
        this.start = this.start.bind(this);
        //this.vmApi = vmApi;
        this.arr = arr;
        this.arrBandUI = arrBandUI;
        let {label, row, form} = arrBandUI;
        this.readOnly = form.readOnly;
        this.label = label;
        this.row = row || RowContent;
        this.list = observable.array([], {deep:true});

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

    onSubmit = async () => {
        let values = this.vmForm.values;
        //await this.onRowChanged(values);
        if (this.afterEditRow !== undefined) await this.afterEditRow(values);
    }

    afterEditRow = async (values:any):Promise<void> => {
        nav.pop();
        return;
    }
/*
    async start(rowValues?: any) {
        this.rowValues = rowValues;
        if (rowValues === undefined)
            this.vmForm.reset();
        else
            this.vmForm.values = rowValues;
        if (this.onEditRow !== undefined)
            await this.onEditRow(rowValues, this.onRowChanged);
        else
            nav.push(<RowPage vm={this} />);
    }


    onRowChanged = async (rowValues:any) => {
        if (this.rowValues === undefined) {
            let len = this.list.push(rowValues);
            this.rowValues = this.list[len-1];
        }
        else {
            _.merge(this.rowValues, rowValues);
        }
        this.vmForm.values = this.rowValues;
    }
*/

    renderItem = (item:any, index:number) => {
        return <this.row {...item} />;
    }
    addClick = () => this.start(undefined);
    start = (param:any) => {}

    protected view = ({vm}:{vm:VmArr}) => {
        //let {label, list, renderItem, start, addClick, header, footer, readOnly} = vm;
        let button;
        if (this.readOnly === false) {
            button = <button onClick={this.addClick}
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
            item={{render: this.renderItem, onClick: this.start}} />;
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