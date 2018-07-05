import * as React from 'react';
import { observer } from 'mobx-react';
import { Button, ButtonProps } from 'reactstrap';
import { Page } from 'tonva-tools';
import { List, Muted } from 'tonva-react-form';
import { VmSheetEdit, VmFieldsForm } from '../../../../ui-usql';

export class VmSheetEdit单据 extends VmSheetEdit {
    showField1 = () => {
        this.vmFieldsForm.showBands(['f1'], 'f1');
    }

    showField2 = () => {
        this.vmFieldsForm.showBands(['f2'], 'f2');
    }

    showAll = () => {
        this.vmFieldsForm.showBands(undefined);
    }

    protected view = Edit;
}

const Edit = ({vm}:{vm:VmSheetEdit单据}) => {
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
