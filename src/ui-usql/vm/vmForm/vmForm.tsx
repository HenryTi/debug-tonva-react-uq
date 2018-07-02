import * as React from 'react';
import * as _ from 'lodash';
import { observable, IObservableObject, IObservableArray } from 'mobx';
import { observer } from 'mobx-react';
import { ViewModel, JSONContent } from '../viewModel';
import { VmFormRow, VmFormSubmitButtonRow } from './row';
import { FormRowBuilder } from './rowBuilder';
import { Field, Arr } from '../field';
import { FormUI, BandUI, FieldBandUI, FieldsBandUI, ArrBandUI, SubmitUI, FieldUI } from './formUI';
import { buildControl, VmControl } from './control';
import { ArrBand, FieldBand, FieldsBand } from './band';
import { VmApi } from '../vmApi';
import { VmTuidControl } from './tuid/vmTuidControl';
import { PickerConfig } from '../tuid';

const defaultClassName = 'px-3 py-2';
const defaultSubmitCaption = '提交';

export type TypeVmForm = typeof VmForm;
export interface FormValues {
    values: any;
    errors: any;
}

export interface VmFormOptions {
    fields: Field[];
    arrs?: Arr[];
    submitButton?:JSX.Element;
    ui?: FormUI;
    readOnly?: boolean;
    vmApi?: VmApi;                  // 主要用于tuid control的生成，也可以没有
    buildControl?: (fieldUI: FieldUI, formValues:FormValues, vmApi:VmApi) => VmControl;
}

export class VmForm extends ViewModel {
    //protected rowBuilder: FormRowBuilder;
    protected fields: Field[];
    protected arrs: Arr[];
    protected submitButton: JSX.Element;
    //protected controlBuilder: ControlBuilder;
    protected readOnly: boolean;
    protected vmApi: VmApi;

    constructor({fields, arrs, submitButton, ui, readOnly, vmApi}:VmFormOptions) {
        super();
        this.fields = fields;
        this.arrs = arrs;
        this.submitButton = submitButton;
        //this.controlBuilder = controlBuilder || new ControlBuilder();
        this.readOnly = readOnly === true;
        this.vmApi = vmApi;
        //this.submitButtonRow = new VmFormSubmitButtonRow(this, submitButton);
        //if (className !== undefined) this.className = className;
        //this.rowBuilder = rowBuilder || new FormRowBuilder;
        //this.rows = this.rowBuilder.buildRows(this, fields, fieldUIs);
        this.formValues = this.buildFormValues(this.fields);
        //this.errors = this.buildObservableValues(this.fields);
        this.buildObservableArrs();
        this.buildUI(ui);
    }

    ui: FormUI;
    formValues: FormValues;
    //values: any;
    //errors: any;
    arrValues: {[name:string]: {
        formValues: FormValues,
        //values: IObservableObject,
        //errors: IObservableObject,
        list: IObservableArray<any>,
    }};

    //className: string = 'px-2 py-2';
    //submitButtonRow: VmFormSubmitButtonRow;
    //rows: VmFormRow[];
    reset() {}

    getValue(fieldName: string) { return this.formValues.values[fieldName] }
    setValue(fieldName: string, value: any) { this.formValues.values[fieldName] = value }

    protected buildControl(fieldUI: FieldUI, formValues:FormValues):VmControl {
        let {type} = fieldUI;
        if (type !== 'tuid') return buildControl(fieldUI, formValues);

        let field = fieldUI.field;
        let tuidName = field.tuid;
        let tuid = this.vmApi.getTuid(tuidName);
        let pickerConfig: PickerConfig = {
            picker: undefined, // TypeVmTuidPicker;
            row: JSONContent, // TypeContent;
            idFromValue: undefined, // TypeIdFromValue,
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

    private buildUI(ui: FormUI) {
        let cn:string, bs: BandUI[];
        if (ui !== undefined) {
            let {className, bands} = ui;
            cn = className;
            bs = bands;
        }
        this.ui = {
            className: cn || defaultClassName,
            bands: bs === undefined? this. buildOnFly() : this.buildFromBands(bs, this.formValues),
        };
    }

    private buildFromBands(bandUIs:BandUI[], formValues:FormValues): BandUI[] {
        let vBands:BandUI[] = [];
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
            let type = bandUI.type;
            if (type === 'submit') {
                vBands.push({
                    type: 'submit',
                    caption: (bandUI as SubmitUI).caption || defaultSubmitCaption,
                })
                continue;
            }
            let fieldUI = this.buildFieldBandUI(bandUI as FieldBandUI, this.fields, formValues);
            if (fieldUI !== undefined) vBands.push(fieldUI);
        }
        return vBands;
    }
    private buildFieldBandUI(fieldBandUI: FieldBandUI, fields:Field[], formValues:FormValues):FieldBandUI {
        let ret = _.clone(fieldBandUI);
        ret.band = FieldBand;
        ret.key = ret.name;
        this.buildFieldControl(ret, fields, formValues);
        return ret;
    }
    private buildFieldsBandUI(fieldsBandUI: FieldsBandUI, fields:Field[], formValues:FormValues):FieldsBandUI {
        let ret = _.clone(fieldsBandUI);
        ret.band = FieldsBand;
        ret.key = ret.fieldUIs[0].name;
        let fieldUIs = ret.fieldUIs;
        fieldUIs = ret.fieldUIs = fieldUIs.map(v => _.clone(v));
        for (let f of fieldUIs) {
            this.buildFieldControl(f, fields, formValues);
        }
        return ret;
    }
    private buildFieldControl(fieldUI: FieldUI, fields: Field[], formValues:FormValues) {
        let {name} = fieldUI;
        fieldUI.field = fields.find(v => v.name === name);
        fieldUI.control = this.buildControl(fieldUI, formValues);
    }
    private buildArrBandUI(arrBandUI: ArrBandUI):ArrBandUI {
        let ret = _.clone(arrBandUI);
        let {name, bands} = ret;
        ret.band = ArrBand;
        ret.key = name;
        if (this.arrs === undefined) return ret;
        let arr = this.arrs.find(v => v.name === name);
        if (arr === undefined) return ret;
        let {formValues} = this.arrValues[name];
        ret.bands = this.buildFromBands(bands, formValues);
        return ret;
    }

    private buildOnFly(): BandUI[] {
        let vBands:BandUI[] = [];
        this.buildFromFields(vBands, this.fields, this.formValues);
        this.buildArrsBands(vBands);
        return vBands;
    }
    private buildFromFields(vBands: BandUI[], fields:Field[], formValues:FormValues) {
        for (let field of fields) {
            let {name} = field;
            let type = this.typeFromField(field);
            let band:FieldBandUI = {
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
        let fieldsBandUIs:BandUI[] = [];
        let {formValues} = this.arrValues[name];
        this.buildFromFields(fieldsBandUIs, fields, formValues);
        let arrBuidUI: ArrBandUI = {
            type: 'arr',
            label: name,
            row: JSONContent,
            bands: fieldsBandUIs,
            band: ArrBand,
        };
        vBands.push(arrBuidUI);
    }

    private buildArrsBands(vBands:BandUI[]) {
        if (this.arrs === undefined) return;
        for (let arr of this.arrs) this.buildArrBand(vBands, arr);
    }

    protected view = Form;
}

const Form = observer(({vm}:{vm:VmForm}) => {
    let {ui} = vm;
    let {className, bands} = ui;
    return <form className={className}>
        {bands.map(v => {
            let {band:Band, key} = v;
            return <Band key={key} {...v} />
        })}
    </form>;
});
