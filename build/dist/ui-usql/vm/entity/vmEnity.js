import * as React from 'react';
import { observable } from 'mobx';
import { ViewModel } from '../viewModel';
import { FA } from 'tonva-react-form';
import { VmEntityFormRowBuilder } from '../vmApi';
export class VmEntity extends ViewModel {
    constructor(vmApi, entity) {
        super();
        this.vmApi = vmApi;
        this.entity = entity;
    }
    get icon() { return vmLinkIcon('text-info', 'circle-thin'); }
    get caption() { return this.entity.name; }
    buildObservableValues(fields) {
        let len = fields.length;
        let v = {};
        for (let i = 0; i < len; i++) {
            v[fields[i].name] = null;
        }
        this.values = observable(v);
    }
    mapFields(schemaFields) {
        if (schemaFields === undefined)
            return;
        let nfc = this.fieldFaces;
        return schemaFields.map(sf => this.tfmMap(sf, nfc !== undefined && nfc[sf.name]));
    }
    tfmMap(sf, ff) {
        let ret;
        let { type, tuid, url } = sf;
        //let tuidInput: TuidInput = {};
        //let tfm = this.typeFieldMappers;
        let face;
        if (ff === undefined) {
            let fm = undefined; //tfm[type];
            if (fm === undefined) {
                console.log('type field mapper not defined');
                return;
            }
            ret = fm(sf);
            face = ret.face;
            if (face === undefined)
                ret.face = face = {};
        }
        else {
            let fm = undefined; //ff.mapper || tfm[type];
            if (fm === undefined) {
                console.log('type field mapper not defined');
                return;
            }
            ret = fm(sf);
            let { label, notes, placeholder, input } = ff;
            if (label !== undefined)
                ret.label = label;
            face = ret.face;
            if (face !== undefined) {
                if (notes !== undefined)
                    face.notes = notes;
                if (placeholder !== undefined)
                    face.placeholder = placeholder;
                //if (input !== undefined) _.merge(tuidInput, input);
            }
        }
        if (tuid !== undefined) {
            return;
            /*
            let tuidUI = this.entitiesUI.tuid.coll[tuid];
            if (tuidUI !== undefined) {
                _.merge(tuidInput, tuidUI.input);
            }
            let input0 = this.entitiesUI.getTuidInput(tuid, url);
            _.merge(tuidInput, input0, face.input);
            face.ui = tuidUI;
            face.input = tuidInput;
            */
        }
        if (sf.null === false) {
            ret.field.required = true;
        }
        return ret;
    }
    typeVmTuidInput(field, tuid) {
        return this.vmApi.typeVmTuidInput(field, tuid);
    }
    typeTuidContent(field, tuid) {
        return this.vmApi.typeTuidContent(field, tuid);
    }
    newFormRowBuilder() {
        return new VmEntityFormRowBuilder(this.vmApi, this);
    }
    get VmForm() {
        return this.vmApi.VmForm;
    }
    newVmForm(values, fields, fieldUIs, className) {
        return new this.VmForm(values, fields, fieldUIs, className, this.newFormRowBuilder());
    }
}
export function vmLinkIcon(cls, faName) {
    return React.createElement(FA, { className: cls, size: "lg", name: faName, fixWidth: true });
}
//# sourceMappingURL=vmEnity.js.map