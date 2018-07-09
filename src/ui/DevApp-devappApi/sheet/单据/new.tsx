import * as React from 'react';
import { observer } from 'mobx-react';
import { Button, ButtonProps } from 'reactstrap';
import { Page, nav } from 'tonva-tools';
import { List, Muted } from 'tonva-react-form';
import { VmSheetNew, VmSheetEdit, VmForm, VmTuidPicker, RowContent } from '../../../../ui-usql';
//import { VmTuidPicker } from '../../../../ui-usql/vm/vmForm';

export class VmSheetNew单据 extends VmSheetNew {
    showField1 = () => {
        this.vmForm.showBands(['f1'], 'f1');
    }

    showField2 = () => {
        this.vmForm.showBands(['f2'], 'f2');
    }

    showAll = () => {
        this.vmForm.showBands(undefined);
    }

    async start() {
        //nav.push(this.renderView());
        //alert('started');
        let tuid = this.entity.getFieldTuid('id1');
        let vmTuidPicker = new VmTuidPicker(this.vmApi, '选择Id1', tuid, this.onArticleSelected, RowContent);
        //nav.push(<SelectId1 vm={this} />)
        vmTuidPicker.start();
    }

    onArticleSelected = async (item:any) => {
        this.vmForm.setValue('id1', item.id);
        nav.push(<InputArr1Row vm={this} />);
    }

    onInputF1 = async () => {
        this.vmForm.showBands(['f1'], 'f1', this.onInputF2);
        nav.replace(<InputF1 vm={this} />);
    }
    
    onInputF2 = async () => {
        this.vmForm.showBands(['f2'], 'f2', this.onShowAll);
        nav.replace(<InputF1 vm={this} />);
    }

    onShowAll = async () => {
        this.vmForm.showBands(undefined);
        nav.replace(<ShowAll vm={this} />);
    }
    
    protected view = AddNew;
}

const SelectId1 = ({vm}:{vm:VmSheetNew单据}) => {
    let {onArticleSelected} = vm;
    return <Page header="选择Article">
        <div className="p-3">
            这里可以搜索article，然后列表，点击选择。下面按钮是直接id=1
        </div>
        <Button color="primary" onClick={onArticleSelected}>选中Article id=1</Button>
    </Page>;
}

const InputArr1Row = ({vm}:{vm:VmSheetNew单据}) => {
    let {onInputF1} = vm;
    return <Page header="Arr1">
        <div className="p-3">
            这里可以按行输入Arr1
        </div>
        <Button color="primary" onClick={onInputF1}>完输入Arr1 row</Button>
    </Page>;
}

const InputF1 = ({vm}:{vm:VmSheetNew单据}) => {
    let {label, vmForm, showAll, showField1, showField2} = vm;
    return <Page header={label}>
        <div className="p-3">现在输入F1字段</div>
        {vmForm.render()}
    </Page>
}

const InputF2 = ({vm}:{vm:VmSheetNew单据}) => {
    let {label, vmForm, showAll, showField1, showField2} = vm;
    return <Page header={label}>
        <div className="p-3">现在输入F2字段</div>
        {vmForm.render()}
    </Page>
}

const ShowAll = ({vm}:{vm:VmSheetNew单据}) => {
    let {label, vmForm, showAll, showField1, showField2} = vm;
    return <Page header={label}>
        <div className="p-3">自己的单据程序</div>
        {vmForm.render()}
    </Page>;
}

const AddNew = ({vm}:{vm:VmSheetNew单据}) => {
    let {label, vmForm, showAll, showField1, showField2} = vm;
    return <Page header={label}>
        <div className="p-3">自己的单据程序</div>
        {vmForm.render()}
        <div className="px-3">
            <div className="form-group row">
                <div className="offset-sm-2 col-sm-10">
                    <button className="btn btn-primary" onClick={showAll}>all</button> &nbsp; 
                    <button className="btn btn-primary" onClick={showField1}>f1</button> &nbsp; 
                    <button className="btn btn-primary" onClick={showField2}>f2</button>
                </div>
            </div>
        </div>
    </Page>;
};
