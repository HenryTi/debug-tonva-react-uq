import * as _ from 'lodash';
import { JSONContent } from '../viewModel';
import { VmArr } from './vmArr';
import { Coordinator } from "../coordinator";
import { VmForm } from './vmForm';
import { VmFieldBand, VmArrBand, VmSubmitBand, VmFieldsBand } from './vmBand';
import { VmIntField, VmTuidField, VmDecField, VmStringField, VmTextField } from './vmField';
import { VmSubmit } from './vmSubmit';
export class CrForm extends Coordinator {
    constructor(crApi, options, values) {
        super(crApi);
        this.options = _.clone(options);
        this.options.readOnly = options.readOnly === true;
        //this.readOnly = readOnly;
        //this.vmUsq = vmUsq;
        //this.formValues = this.buildFormValues(this.fields);
        //this.buildBands(ui);
        this.vmForm = new VmForm(this.buildBands(), values);
    }
    buildBands() {
        let { ui, readOnly, className, onSubmit } = this.options;
        return {
            readOnly: readOnly,
            bands: ui === undefined ? this.bandsOnFly() : this.bandsFromUI(ui),
            //onSubmit: onSubmit,
            className: className,
        };
    }
    bandsOnFly() {
        let bands = [];
        let { fields, arrs } = this.options;
        this.bandsFromFields(bands, fields);
        if (arrs !== undefined) {
            for (let arr of arrs)
                bands.push(this.bandFromArr(arr));
        }
        return bands;
    }
    bandsFromFields(bands, fields) {
        if (fields === undefined)
            return;
        for (let field of fields)
            bands.push(this.bandFromField(field));
    }
    bandsFromUI(ui) {
        let { bandUIs } = ui;
        let bands = [];
        if (bandUIs === undefined)
            return bands;
        for (let bandUI of bandUIs) {
            bands.push(this.bandFromUI(bandUI));
        }
        return bands;
    }
    bandFromUI(bandUI) {
        let { band } = bandUI;
        switch (band) {
            default: return this.bandFromFieldUI(bandUI);
            case 'arr': return this.bandFromArrUI(bandUI);
            case 'fields': return this.bandFromFieldsUI(bandUI);
            case 'submit': return this.bandFromSubmitUI(bandUI);
        }
    }
    bandFromFieldUI(bandUI) {
        let { label } = bandUI;
        let vmField = this.vmFieldFromUI(bandUI);
        return new VmFieldBand(label, vmField);
    }
    bandFromArrUI(bandUI) {
        let { label, name } = bandUI;
        let vmArr = this.vmArrFromUI(bandUI);
        return new VmArrBand(label, vmArr);
    }
    bandFromFieldsUI(bandUI) {
        let { label, fieldUIs } = bandUI;
        let vmFields = fieldUIs.map(v => this.vmFieldFromUI(v));
        return new VmFieldsBand(label, vmFields);
    }
    bandFromSubmitUI(bandUI) {
        let vmSubmit = new VmSubmit();
        return new VmSubmitBand(vmSubmit);
    }
    vmFieldFromField(field) {
        let { name, type } = field;
        switch (type) {
            case 'tinyint':
            case 'smallint':
            case 'int':
                return new VmIntField(this.vmForm, name);
            case 'bigint':
                let tuid = field.tuid;
                return tuid !== undefined ?
                    new VmTuidField(this.vmForm, name) :
                    new VmIntField(this.vmForm, name);
            case 'dec':
                return new VmDecField(this.vmForm, name);
            case 'char':
                return new VmStringField(this.vmForm, name);
            case 'text':
                return new VmTextField(this.vmForm, name);
        }
    }
    bandFromField(field) {
        let { name } = field;
        let vmField = this.vmFieldFromField(field);
        return new VmFieldBand(name, vmField);
    }
    bandFromArr(arr) {
        let { name, fields } = arr;
        let row = JSONContent;
        let bands = [];
        this.bandsFromFields(bands, fields);
        let vmArr = new VmArr(this.vmForm, row, bands);
        return new VmArrBand(name, vmArr);
    }
    vmFieldFromUI(fieldUI) {
        return;
    }
    vmArrFromUI(arrBandUI) {
        return;
    }
}
//# sourceMappingURL=cfForm.js.map