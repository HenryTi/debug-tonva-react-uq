import * as React from 'react';
import { Button, ButtonProps } from 'reactstrap';
import { Page } from 'tonva-tools';
import { List, Muted } from 'tonva-react-form';
import { VmSheet } from './vmSheet';
import { VmFieldsForm } from '../vmFieldsForm';

export class VmSheetEdit extends VmSheet {
    vmFieldsForm: VmFieldsForm;

    async load() {
        await super.load();
        let {schema} = this.entity;
        let {fields, arrs} = schema;
        this.vmFieldsForm = new VmFieldsForm({
            fields: fields,
            arrs: arrs,
            vmApi: this.vmApi,
            ui: this.ui && this.ui.res
        });
    }

    protected view = Edit;
}

const Edit = ({vm}:{vm:VmSheetEdit}) => {
    let {vmFieldsForm} = vm;
    return <Page header={vm.caption}>
        {vmFieldsForm.renderView()}
    </Page>;
}
