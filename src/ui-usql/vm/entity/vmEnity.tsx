import * as React from 'react';
import { observable } from 'mobx';
import { Entity, Tuid } from '../../entities';
import { ViewModel } from '../viewModel';
import { FA } from 'tonva-react-form';
import { VmApi, VmEntityFormRowBuilder } from '../vmApi';
import { VmForm, VmFormRow } from '../vmForm';
import { Field } from '../field';
import { FormRowBuilder } from '../vmForm/rowBuilder';
import { VmTuidInput, TypeTuidContent, TypeVmTuidInput } from '../tuid';

export interface FieldFace {
    label?: string;
    notes?: string;
    placeholder?: string;
    input?: any; //TuidInput;
    //mapper?: FieldMapper;
}
export interface FieldFaces {
    [name:string]: FieldFace;
}

export abstract class VmEntity extends ViewModel {
    protected entity: Entity;
    protected vmApi:VmApi;

    constructor(vmApi:VmApi, entity: Entity) {
        super();
        this.vmApi = vmApi;
        this.entity = entity;
    }

    values: any;
    get icon() {return vmLinkIcon('text-info', 'circle-thin')}
    get caption() { return this.entity.name; }

    protected buildObservableValues(fields: Field[]) {
        let len = fields.length;
        let v: {[p:string]: any} = {};
        for (let i=0; i<len; i++) {
            v[fields[i].name] = null;
        }
        this.values = observable(v);
    }

    protected fieldFaces: FieldFaces;
    protected mapFields(schemaFields: any[]): any[] {
        if (schemaFields === undefined) return;
        let nfc = this.fieldFaces;
        return schemaFields.map(sf => this.tfmMap(sf, nfc !== undefined && nfc[sf.name]));
    }

    protected tfmMap(sf: any, ff: FieldFace) {
        let ret: any;
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
            if (face === undefined) ret.face = face = {};
        }
        else {
            let fm = undefined; //ff.mapper || tfm[type];
            if (fm === undefined) {
                console.log('type field mapper not defined');
                return;
            }
            ret = fm(sf);
            let { label, notes, placeholder, input } = ff;
            if (label !== undefined) ret.label = label;
            face = ret.face;
            if (face !== undefined) {
                if (notes !== undefined) face.notes = notes;
                if (placeholder !== undefined) face.placeholder = placeholder;
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

    newVmTuidInput(field:Field, tuid:Tuid): TypeVmTuidInput {
        return this.vmApi.newVmTuidInput(field, tuid);
    }

    newTuidContent(field:Field, tuid:Tuid): TypeTuidContent {
        return this.vmApi.newTuidContent(field, tuid);
    }

    protected newFormRowBuilder(): FormRowBuilder {
        return new VmEntityFormRowBuilder(this.vmApi, this);
    }

    get VmForm(): new (values:any, fields: Field[], fieldUIs?:any[], className?:string, rowBuilder?: FormRowBuilder) => VmForm {
        return this.vmApi.VmForm;
    }

    newVmForm(values, fields:Field[], fieldUIs:any[], className:string):VmForm {
        return new this.VmForm(values, fields, fieldUIs, className, this.newFormRowBuilder());
    }
}

export function vmLinkIcon(cls:string, faName:string) {
    return <FA className={cls} size="lg" name={faName} fixWidth={true} />;
}
