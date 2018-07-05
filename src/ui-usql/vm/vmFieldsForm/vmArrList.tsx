import * as React from 'react';
import * as _ from 'lodash';
import { List, FA } from 'tonva-react-form';
import { Page, nav } from 'tonva-tools';
import { ViewModel, JSONContent, RowContent } from '../viewModel';
import { Arr } from '../field';
import { ArrValues, VmFieldsForm } from './vmFieldsForm';
import { ArrBandUIX, SubmitBandUIX } from './formUIX';
import { VmApi } from '../vmApi';
import { SubmitBand } from './band';
import { SubmitBandUI } from './formUI';

export class VmArrList extends ViewModel {
    protected rowValues: any;
    arr: Arr;
    arrValues: ArrValues;
    arrBandUI: ArrBandUIX;
    row: any;
    vmFieldsForm: VmFieldsForm;
    
    constructor(vmApi:VmApi, arr:Arr, arrValues:ArrValues, arrBandUI:ArrBandUIX) {
        super();
        this.arr = arr;
        this.arrValues = arrValues;
        this.arrBandUI = arrBandUI;
        this.row = arrBandUI.row || RowContent;
        let bands = this.arrBandUI.bands.slice();
        let submitBand:SubmitBandUI = {
            type: 'submit',
            content: '{save} 完成',                    // 显示在按钮上的文本
            //band: SubmitBand,
            //key: '$submit',
            //onSubmit: undefined, // this.onSubmit
        };
        bands.push(submitBand);
        this.vmFieldsForm = new VmFieldsForm({
            fields: arr.fields,
            vmApi: vmApi,
            ui: {
                bands: bands,
                className: undefined,
            },
            onSubmit: this.onSubmit,
        });
    }

    renderItem = (item:any, index:number) => {
        return <this.row {...item} />;
    }

    itemClick = (item:any) => {
        this.rowValues = item;
        this.vmFieldsForm.setValues(item);
        nav.push(<RowPage vm={this} />);
    }

    addClick = () => {
        this.rowValues = undefined;
        nav.push(<RowPage vm={this} />);
        //this.arrValues.list.push({a:1,b:2,c:3});
    }

    onSubmit = async () => {
        let values = this.vmFieldsForm.getValues();
        if (this.rowValues === undefined)
            this.arrValues.list.push(values);
        else
            _.merge(this.rowValues, values);
        nav.pop();
        this.vmFieldsForm.reset();
    }

    renderView() {
        let header = <div className="">
            <div className="flex-fill align-self-center">{this.arrBandUI.label}</div>
            <button onClick={this.addClick}
                type="button" 
                className="btn btn-primary btn-sm">
                <FA name="plus" />
            </button>
        </div>;
        return <List
            header={header}
            items={this.arrValues.list} 
            item={{render: this.renderItem, onClick: this.itemClick}} />;
    }
}

const RowPage = ({vm}:{vm:VmArrList}) => {
    let {arrBandUI, vmFieldsForm, onSubmit} = vm;
    let {label} = arrBandUI;
    
    return <Page header={label}>
        {vmFieldsForm.renderView()}
    </Page>
}
