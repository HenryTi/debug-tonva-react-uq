import * as React from 'react';
import { observer } from 'mobx-react';
import { Button, ButtonProps } from 'reactstrap';
import { Page } from 'tonva-tools';
import { List, Muted } from 'tonva-react-form';
import { VmSheetEdit, VmForm } from '../../../../ui-usql';

export class VmSheetEditOrder extends VmSheetEdit {
    showField1 = () => {
        this.vmForm.showBands(['f1'], 'f1');
    }

    showField2 = () => {
        this.vmForm.showBands(['f2'], 'f2');
    }

    showAll = () => {
        this.vmForm.showBands(undefined);
    }

    protected view = Edit;
}

const Edit = ({vm}:{vm:VmSheetEditOrder}) => {
    let {label, vmForm, showAll, showField1, showField2} = vm;
    return <Page header={label}>
        <div className="p-3">自己的Order程序</div>
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
