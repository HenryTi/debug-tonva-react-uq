import * as React from 'react';
import * as _ from 'lodash';
import { observer } from "mobx-react";
import { VmBand } from './vmBand';
import { BandsBuilder } from './bandsBuilder';
import { Field, ArrFields } from '../../entities';
import { computed, observable, IObservableObject } from 'mobx';
import { VmArr } from './vmArr';
//import { VmControl, buildControl } from './control/control';
import { FieldUI } from './formUI';
import { VmField } from './vmField';

export type FieldCall = (form:VmForm, field:string, values:any) => Promise<any>;
// [arr.field]: FieldCall;
export interface FieldCalls {
    [field:string]: FieldCall;
}

export interface FormValues {
    values: any;
    errors: any;
}

export interface FormOptions {
    fields: Field[];
    arrs?: ArrFields[];
    ui: any;
    res: any;
    calls: FieldCalls;
}

export class VmForm {
    protected fields: Field[];
    protected arrs: ArrFields[];
    protected bands: VmBand[];
    constructor(options: FormOptions, onSubmit: (values:any)=>Promise<void>) {
        this.fields = options.fields;
        this.arrs = options.arrs;
        this.calls = options.calls;
        this.readOnly = onSubmit === undefined;
        this.formValues = this.buildFormValues(this.fields);
        this.bands = this.buildBands(options, onSubmit);
        this.onSubmit = onSubmit;
    }

    onSubmit: (values:any)=>Promise<void>;

    formValues: FormValues;
    readOnly: boolean;
    vmFields: {[name:string]:VmField} = {};
    vmArrs: {[name:string]: VmArr} = {};
    calls: FieldCalls;

    private buildBands(options: FormOptions, onSubmit: (values:any)=>Promise<void>) {
        let bb = new BandsBuilder(this, options, onSubmit);
        return bb.build();
    }

    private onFormSubmit = (event:React.FormEvent<any>) => {
        event.preventDefault();
        return false;
    }

    protected view = observer(({className}:{className:string}) => {
        return <form className={className} onSubmit={this.onFormSubmit}>
            {this.bands.map(v => v.render())}
        </form>;
    });

    get values() {
        let values:any = {};
        _.merge(values, this.formValues.values);
        for (let i in this.vmArrs) {
            values[i] = this.vmArrs[i].list;
        }
        return values;
    }

    setValues(initValues:any) {
        let {values, errors} = this.formValues;
        for (let f of this.fields) {
            let fn = f.name;
            values[fn] = initValues===undefined? null : initValues[fn];
            errors[fn] = undefined;
        }
        // 还要设置arrs的values
        for (let i in this.vmArrs) {
            if (initValues === undefined) continue;
            let list = initValues[i];
            if (list === undefined) continue;
            this.vmArrs[i].list.push(...list);
        }
    }

    @computed get isOk():boolean {
        for (let i in this.vmFields) {
            if (this.vmFields[i].isOk === false) return false;
        }
        return true;
    }
    reset() {
        let {values, errors} = this.formValues;
        for (let f of this.fields) {
            let fn = f.name;
            values[fn] = null;
            errors[fn] = undefined;
        }
        for (let i in this.vmFields) {
            let ctrl = this.vmFields[i];
            ctrl.setValue(null);
        }
        for (let i in this.vmArrs) {
            let vmArr = this.vmArrs[i];
            vmArr.reset();
        }
    }

    getValue(fieldName: string) { return this.formValues.values[fieldName] }
    setValue(fieldName: string, value: any) { this.formValues.values[fieldName] = value }

    setError(fieldName:string, error:string) {this.formValues.errors[fieldName] = error}

    /*
    // 如果要定制control，重载这个函数
    protected buildControl(field: Field, fieldUI: FieldUI, formValues:FormValues):VmControl {
        return buildControl(field, fieldUI, formValues, this.readOnly);
    }
    */
    private buildObservableValues(fields: Field[]):IObservableObject {
        let v: {[p:string]: any} = {};
        for (let f of fields) v[f.name] = null;
        return observable(v);
    }
    private buildFormValues(fields: Field[]):FormValues {
        return {
            values: this.buildObservableValues(fields),
            errors: this.buildObservableValues(fields),
        }
    }

    render(className?:string):JSX.Element {
        return <this.view className={className} />
    }
}
