import * as React from 'react';
import { observer } from 'mobx-react';
import { Field } from '../../../entities';
import { VmField, RedMark } from "./vmField";
import { FieldUI } from '../formUI';
import { FieldCalls, FormValues, FieldCall, VmForm } from '../vmForm';

const buttonStyle:React.CSSProperties = {
    textAlign:'left', 
    paddingLeft:'0.75rem', 
    paddingRight:'0.75rem', 
    overflow: 'hidden'
};

export class VmTuidField extends VmField {
    protected vmForm: VmForm;

    constructor(field:Field, fieldUI: FieldUI, vmForm: VmForm) {
        super(field, fieldUI, vmForm.formValues, vmForm.readOnly);
        this.vmForm = vmForm;
    }

    onClick = async () => {
        if (this.readOnly === true) {
            alert('await super.onClick();');
            return;
        }
        let calls = this.vmForm.calls;
        let call = calls[this.field.name];
        let id:number;
        if (call !== undefined) {
            id = await call(this.vmForm, this.field.tuid, this.vmForm.values);
        }
        else {
            alert('call undefined');
            id = 0;
        }
        alert('id = ' + id);
        this.setValue(id);
        //this.vmContent.setValue(id);
    }
    protected view = observer(() => {
        let content = this.value === undefined?
            <>点击选择</> : 
            'this.vmContent.render()';
        if (this.readOnly === true) {
            return <div 
                className="form-control form-control-plaintext border border-info rounded bg-light cursor-pointer"
                onClick={this.onClick}>
                {content}
            </div>;
        }
        let redDot;
        let {required} = this.fieldUI;
        if (required === true || this.field.null === false) {
            redDot = <RedMark />;
        }
        return <>
            {redDot}
            <button className="form-control btn btn-outline-info"
                type="button"
                style={buttonStyle}
                onClick={this.onClick}>
                {content}
            </button>
        </>;
    })
}
