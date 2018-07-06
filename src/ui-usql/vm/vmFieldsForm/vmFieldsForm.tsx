import * as React from 'react';
import * as _ from 'lodash';
import { observable, IObservableObject, IObservableArray } from 'mobx';
import { observer } from 'mobx-react';
import { FA } from 'tonva-react-form';
import { ViewModel, JSONContent, RowContent } from '../viewModel';
import { Field, Arr } from '../field';
import { FormUI, BandUI, FieldBandUI, FieldsBandUI, ArrBandUI, SubmitBandUI, FieldUI } from './formUI';
import { FormUIX, BandUIX, FieldBandUIX, FieldsBandUIX, ArrBandUIX, SubmitBandUIX, FieldUIX } from './formUIX';
import { buildControl, VmControl } from './control';
import { ArrBand, FieldBand, FieldsBand, SubmitBand } from './band';
import { VmApi } from '../vmApi';
import { VmTuidControl, PickerConfig } from './tuid';
import { VmArrList } from './vmArrList';

const defaultClassName = 'px-3 py-2';
const defaultSubmitCaption = <><FA name="send-o" /> &nbsp; 提交 &nbsp; </>;

export type TypeVmFieldsForm = typeof VmFieldsForm;
export interface FormValues {
    values: any;
    errors: any;
}
export interface ArrValues {
    formValues: FormValues,
    list: IObservableArray<any>,
};

export interface VmFormOptions {
    fields: Field[];
    arrs?: Arr[];
    //submitButton?:JSX.Element;
    onSubmit?: (values:any) => Promise<void>;
    ui?: FormUI;
    readOnly?: boolean;
    vmApi?: VmApi;                  // 主要用于tuid control的生成，也可以没有
    //buildControl?: (fieldUI: FieldUI, formValues:FormValues, vmApi:VmApi) => VmControl;
}

export class VmFieldsForm extends ViewModel {
    protected fields: Field[];
    protected arrs: Arr[];
    //protected submitButton: JSX.Element;
    protected onSubmit: (values:any) => Promise<void>;
    protected onFieldsInputed: (values:any) => Promise<void>;
    protected readOnly: boolean;
    protected vmApi: VmApi;

    constructor({fields, arrs, onSubmit, ui, readOnly, vmApi}:VmFormOptions) {
        super();
        this.fields = fields;
        this.arrs = arrs;
        this.onSubmit = onSubmit;
        this.readOnly = readOnly === true;
        this.vmApi = vmApi;
        //this.submitButton = submitButton;
        //this.submitButtonRow = new VmFormSubmitButtonRow(this, submitButton);
        //if (className !== undefined) this.className = className;
        //this.rowBuilder = rowBuilder || new FormRowBuilder;
        //this.rows = this.rowBuilder.buildRows(this, fields, fieldUIs);
        this.formValues = this.buildFormValues(this.fields);
        //this.errors = this.buildObservableValues(this.fields);
        this.buildObservableArrs();
        this.buildBands(ui);
    }

    ui: FormUIX;
    formValues: FormValues;
    arrValues: {[name:string]: ArrValues};
    defaultSubmitCaption: any;
    submitCaption: any;

    getValues() {
        let values:any = {};
        _.merge(values, this.formValues.values);
        if (this.arrValues !== undefined) {
            for (let i in this.arrValues) {
                values[i] = this.arrValues[i].list;
            }
        }
        return values;
    }

    setValues(values:any) {
        let v = this.formValues.values;
        for (let f of this.fields) {
            let fn = f.name;
            v[fn] = values[fn];
        }
        // 还要设置arrs的values
    }

    onSubmitButtonClick = async () => {
        let values = this.getValues();
        if (this.onFieldsInputed !== undefined) {
            await this.onFieldsInputed(values);
            return;
        }
        if (this.onSubmit !== undefined) {
            await this.onSubmit(values);
            return;
        }
        let json = JSON.stringify(values);
        alert('submit: \n' + json);
    }

    reset() {
        let vs = this.formValues.values;
        for (let f of this.fields) {
            let fn = f.name;
            vs[fn] = null;
        }
        if (this.arrs !== undefined) {
            for (let arr of this.arrs) {
                let {name, fields} = arr;
                let av = this.arrValues[name];
                av.list.clear();
                vs = av.formValues.values;
                for (let f of fields) {
                    let fn = f.name;
                    vs[fn] = null;
                }
            }
        }
    }

    getValue(fieldName: string) { return this.formValues.values[fieldName] }
    setValue(fieldName: string, value: any) { this.formValues.values[fieldName] = value }

    // 如果要定制control，重载这个函数
    protected buildControl(fieldUI: FieldUIX, formValues:FormValues):VmControl {
        let {type} = fieldUI;
        if (type !== 'tuid') return buildControl(fieldUI, formValues);

        let field = fieldUI.field;
        let tuidName = field.tuid;
        let tuid = this.vmApi.getTuid(tuidName);
        let pickerConfig: PickerConfig = {
            picker: undefined,          // TypeVmTuidPicker;
            row: undefined,             //RowContent, // TypeContent;
            idFromValue: undefined,     // TypeIdFromValue,
        };
        return new VmTuidControl(fieldUI, formValues, this.vmApi, tuid, JSONContent, pickerConfig)
    }

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
    private buildObservableArrs() {
        if (this.arrs === undefined) return;
        this.arrValues = {};
        for (let arr of this.arrs) {
            let {name, fields} = arr;
            this.arrValues[name] = {
                formValues: this.buildFormValues(fields),
                //errors: this.buildObservableValues(fields),
                list: observable([]),
            }
        }
    }

    private buildBands(ui: FormUI) {
        let cn:string, bs: BandUIX[];
        if (ui !== undefined) {
            let {className, bands} = ui;
            cn = className;
            bs = bands;
        }
        this.ui = {
            className: cn || defaultClassName,
            bands: bs === undefined? 
                this.buildOnFly() : 
                this.buildFromBands(bs, this.formValues, this.fields),
            visibleBands: observable([]),
        };
    }

    showBands(fieldNames:string[], submitCaption?:any, onSubmit?:(values:any)=>Promise<void>) {
        if (submitCaption === undefined)
            this.submitCaption = this.defaultSubmitCaption;
        else
            this.submitCaption = this.buildSumitConent(submitCaption);
        this.onFieldsInputed = onSubmit;
        let {bands, visibleBands} = this.ui;
        visibleBands.splice(0, visibleBands.length);
        if (fieldNames === undefined) {
            visibleBands.push(...bands);
            return;
        }
        for (let b of bands) {
            switch (b.type) {
                case 'fields':
                    for (let f of (b as FieldsBandUI).fieldUIs) {
                        if (fieldNames.find(v => v === f.name) !== undefined) {
                            visibleBands.push(b);
                            break;
                        }
                    }
                    break;
                case 'arr':
                default: 
                    if (fieldNames.find(v => v === (b as any).name) !== undefined) {
                        visibleBands.push(b);
                    }
                    break;
                case 'submit':
                    if (submitCaption !== undefined) visibleBands.push(b);
                    break;
            }
        }
    }

    private buildFromBands(bandUIs:BandUI[], formValues:FormValues, fields:Field[]): BandUIX[] {
        let vBands:BandUIX[] = [];
        for (let bandUI of bandUIs) {
            let fieldUIs = (bandUI as FieldsBandUI).fieldUIs;
            if (fieldUIs !== undefined) {
                vBands.push(this.buildFieldsBandUI(bandUI as FieldsBandUI, this.fields, formValues));
                continue;
            }
            let arrBands = (bandUI as ArrBandUI).bands;
            if (arrBands !== undefined) {
                vBands.push(this.buildArrBandUI(bandUI as ArrBandUI));
                continue;
            }
            let type = (bandUI as SubmitBandUI).type;
            if (type === 'submit') {
                vBands.push(this.buildSubmit((bandUI as SubmitBandUI).content || defaultSubmitCaption));
                continue;
            }
            let fieldUI = this.buildFieldBandUI(bandUI as FieldBandUI, fields, formValues);
            if (fieldUI !== undefined) vBands.push(fieldUI);
        }
        return vBands;
    }
    private static buttonContentRegex = /\{\S+\}/gm;
    private buildSumitConent(content:any):any {
        if (typeof content !== 'string') return content;
        let children = [];
        let regex = VmFieldsForm.buttonContentRegex;
        let index = 0;
        for (;;) {
            let ret = regex.exec(content as string);
            if (ret === null) {
                children.push(content.substr(index));
                break;
            }
            children.push(content.substring(index, ret.index));
            let str = ret[0];
            children.push(<FA key={index} name={str.substr(1, str.length-2).trim()} />);
            index = ret.index + str.length;
        }
        return React.createElement(React.Fragment, undefined, children);
    }
    private buildSubmit(content:any): SubmitBandUIX {
        let c = this.buildSumitConent(content);
        this.defaultSubmitCaption = c;
        this.submitCaption = c;
        return {
            key: '$submit',
            type: 'submit',
            content: c,
            onSubmit: this.onSubmitButtonClick,
            band: SubmitBand,
            form: this,
        };
    }
    private buildFieldBandUI(fieldBandUI: FieldBandUI, fields:Field[], formValues:FormValues):FieldBandUIX {
        let ret:FieldBandUIX = _.clone(fieldBandUI);
        let name = ret.name;
        ret.band = FieldBand;
        ret.key = name;
        if (ret.label === undefined) ret.label = name;
        this.buildFieldControl(ret, fields, formValues);
        return ret;
    }
    private buildFieldsBandUI(fieldsBandUI: FieldsBandUI, fields:Field[], formValues:FormValues):FieldsBandUIX {
        let ret:FieldsBandUIX = _.clone(fieldsBandUI);
        let name = ret.fieldUIs[0].name;
        ret.band = FieldsBand;
        ret.key = name;
        if (ret.label === undefined) ret.label = name;
        let fieldUIs = ret.fieldUIs;
        fieldUIs = ret.fieldUIs = fieldUIs.map(v => _.clone(v));
        for (let f of fieldUIs) {
            this.buildFieldControl(f, fields, formValues);
        }
        return ret;
    }
    private buildFieldControl(fieldUI: FieldUIX, fields: Field[], formValues:FormValues) {
        let {name, type} = fieldUI;
        let field = fieldUI.field = fields.find(v => v.name === name);
        let tuid = field.tuid;
        if (tuid !== undefined) fieldUI.type = 'tuid';
        else if (type === undefined) fieldUI.type = this.typeFromField(field);
        fieldUI.control = this.buildControl(fieldUI, formValues);
    }
    private buildArrBandUI(arrBandUI: ArrBandUI):ArrBandUIX {
        let ret:ArrBandUIX = _.clone(arrBandUI);
        let {name, bands} = ret;
        ret.band = ArrBand;
        ret.key = name;
        if (ret.label === undefined) ret.label = name;
        if (this.arrs === undefined) return ret;
        let arr = this.arrs.find(v => v.name === name);
        if (arr === undefined) return ret;
        let arrValue = this.arrValues[name];
        let {formValues} = arrValue;
        ret.bands = this.buildFromBands(bands, formValues, arr.fields);
        let vmList = this.buildArrList(arr, arrValue, ret);
        ret.vmList = vmList;
        return ret;
    }

    private buildOnFly(): BandUIX[] {
        let vBands:BandUI[] = [];
        this.buildFromFields(vBands, this.fields, this.formValues);
        this.buildArrsBands(vBands);
        let submitBand = this.buildSubmit(defaultSubmitCaption);
        vBands.push(submitBand);
        return vBands;
    }
    private buildFromFields(vBands: BandUI[], fields:Field[], formValues:FormValues) {
        for (let field of fields) {
            let {name} = field;
            let type = this.typeFromField(field);
            let band:FieldBandUIX = {
                label: name,
                name: name,
                key: name,
                type: type as any,
                field: field,
                band: FieldBand,
            };
            band.control = this.buildControl(band, formValues);
            vBands.push(band);
        }
    }
    private typeFromField(field:Field) {
        switch (field.type) {
            case 'tinyint':
            case 'smallint':
            case 'int':
                return 'int';
            case 'bigint':
                let tuid = field.tuid;
                if (tuid !== undefined) return 'tuid';
                return 'int';
            case 'dec':
                return 'dec';
            case 'char':
            case 'text':
                return 'string';
        }
    }
    private buildArrBand(vBands:BandUI[], arr: Arr) {
        let {name, fields} = arr;
        let fieldsBandUIs:BandUIX[] = [];
        let arrValue = this.arrValues[name];
        let {formValues} = arrValue;
        this.buildFromFields(fieldsBandUIs, fields, formValues);
        let arrBandUI: ArrBandUIX = {
            type: 'arr',
            key: name,
            label: name,
            row: RowContent,
            bands: fieldsBandUIs,
            band: ArrBand,
        };
        let vmList = this.buildArrList(arr, arrValue, arrBandUI);
        arrBandUI.vmList = vmList;
        vBands.push(arrBandUI);
    }

    private buildArrsBands(vBands:BandUI[]) {
        if (this.arrs === undefined) return;
        for (let arr of this.arrs) this.buildArrBand(vBands, arr);
    }

    private buildArrList(arr:Arr, arrValues: ArrValues, arrBandUI:ArrBandUIX): ViewModel {
        return new VmArrList(this.vmApi, arr, arrValues, arrBandUI);
    }

    protected view = Form;
}

const Form = observer(({vm}:{vm:VmFieldsForm}) => {
    let {ui} = vm;
    let {className, bands, visibleBands} = ui;
    let vBands = bands;
    if (visibleBands !== undefined && visibleBands.length > 0) vBands = visibleBands;
    return <form className={className}>
        {vBands.map(v => {
            let {band:Band, key} = v;
            return <Band key={key} {...v} />
        })}
    </form>;
});
