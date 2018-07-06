import * as React from 'react';
import { observer } from 'mobx-react';
import { Button, ButtonProps } from 'reactstrap';
import { Page, nav } from 'tonva-tools';
import { List, Muted } from 'tonva-react-form';
import { VmSheetNew, VmSheetEdit, VmFieldsForm } from '../../../../ui-usql';

export class VmSheetNew单据 extends VmSheetNew {
    showField1 = () => {
        this.vmFieldsForm.showBands(['f1'], 'f1');
    }

    showField2 = () => {
        this.vmFieldsForm.showBands(['f2'], 'f2');
    }

    showAll = () => {
        this.vmFieldsForm.showBands(undefined);
    }

    async start() {
        //nav.push(this.renderView());
        //alert('started');
        nav.push(<SelectId1 vm={this} />)
    }

    onArticleSelected = () => {
        this.vmFieldsForm.setValue('id1', 1);
        nav.replace(<InputArr1Row vm={this} />);
    }

    onInputF1 = async () => {
        this.vmFieldsForm.showBands(['f1'], 'f1', this.onInputF2);
        nav.replace(<InputF1 vm={this} />);
    }
    
    onInputF2 = async () => {
        this.vmFieldsForm.showBands(['f2'], 'f2', this.onShowAll);
        nav.replace(<InputF1 vm={this} />);
    }

    onShowAll = async () => {
        this.vmFieldsForm.showBands(undefined);
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
    let {vmFieldsForm, showAll, showField1, showField2} = vm;
    return <Page header={vm.caption}>
        <div className="p-3">现在输入F1字段</div>
        {vmFieldsForm.renderView()}
    </Page>
}

const InputF2 = ({vm}:{vm:VmSheetNew单据}) => {
    let {vmFieldsForm, showAll, showField1, showField2} = vm;
    return <Page header={vm.caption}>
        <div className="p-3">现在输入F2字段</div>
        {vmFieldsForm.renderView()}
    </Page>
}

const ShowAll = ({vm}:{vm:VmSheetNew单据}) => {
    let {vmFieldsForm, showAll, showField1, showField2} = vm;
    return <Page header={vm.caption}>
        <div className="p-3">自己的单据程序</div>
        {vmFieldsForm.renderView()}
    </Page>;
}

const AddNew = ({vm}:{vm:VmSheetNew单据}) => {
    let {vmFieldsForm, showAll, showField1, showField2} = vm;
    return <Page header={vm.caption}>
        <div className="p-3">自己的单据程序</div>
        {vmFieldsForm.renderView()}
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
