import * as React from 'react';
import { List } from 'tonva-react-form';
import { ViewModel, JSONContent, RowContent } from '../viewModel';
import { Arr } from '../field';
import { ArrValues } from './vmFieldsForm';
import { ArrBandUIX } from './formUIX';

export class VmArrList extends ViewModel {
    arr: Arr;
    arrValues: ArrValues;
    list: any[];
    arrBandUI:ArrBandUIX;
    row: any;
    
    constructor(arr:Arr, arrValues:ArrValues, arrBandUI:ArrBandUIX) {
        super();
        this.arr = arr;
        this.arrValues = arrValues;
        this.arrBandUI = arrBandUI;
        this.row = arrBandUI.row || RowContent;
        this.list = [{a:1,b:2,c:3}, {a:3.3,b:22,c:3}];
    }

    renderItem = (item:any, index:number) => {
        return <this.row {...item} />;
    }

    itemClick = (item:any) => {
        alert(JSON.stringify(item));
    }

    renderView() {
        return <List
            header={this.arrBandUI.label}
            items={this.list} 
            item={{render: this.renderItem, onClick: this.itemClick}} />;
    }
}
