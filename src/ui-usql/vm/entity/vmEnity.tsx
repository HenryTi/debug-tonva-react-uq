import * as React from 'react';
import { observable } from 'mobx';
import { Entity, Tuid } from '../../entities';
import { ViewModel } from '../viewModel';
import { FA } from 'tonva-react-form';
import { VmApi, VmEntityFormRowBuilder } from '../vmApi';
import { VmForm, VmFormRow, TypeVmForm } from '../vmForm';
import { Field } from '../field';
import { FormRowBuilder } from '../vmForm/rowBuilder';
import { VmTuidInput, TypeContent, TypeVmTuidInput, PickerConfig } from '../tuid';
import { nav } from '../../../../node_modules/tonva-tools';

export interface FieldUI {
    label?: string;
    notes?: string;
    placeholder?: string;
    input?: any; //TuidInput;
    //mapper?: FieldMapper;
}
export interface FieldUIs {
    [name:string]: FieldUI;
}

export abstract class VmEntity extends ViewModel {
    protected entity: Entity;
    protected vmApi:VmApi;
    protected ui: any;

    constructor(vmApi:VmApi, entity: Entity, ui?:any) {
        super();
        this.vmApi = vmApi;
        this.entity = entity;
        this.ui = ui;
        this.initBind();
    }

    // init的时候，binding this
    protected initBind() {
        this.onSubmitClick = this.onSubmitClick.bind(this);
    }

    protected async nav<T extends VmEntity>(vmType: new (vmApi:VmApi, entity:Entity) => T) {
        let vm = new vmType(this.vmApi, this.entity);
        await vm.load();
        nav.push(vm.renderView());
    }

    values: any;
    returns: any;
    protected vmForm: VmForm;
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

    protected resetValues() {
        for (let i in this.values) {
            this.values[i] = null;
        }
    }

    protected fieldFaces: FieldUIs;
    protected mapFields(schemaFields: any[]): any[] {
        if (schemaFields === undefined) return;
        let nfc = this.fieldFaces;
        return schemaFields.map(sf => this.tfmMap(sf, nfc !== undefined && nfc[sf.name]));
    }

    protected tfmMap(sf: any, ff: FieldUI) {
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

    typeVmTuidInput(field:Field, tuid:Tuid): TypeVmTuidInput {
        return this.vmApi.typeVmTuidInput(tuid);
    }

    typeTuidContent(field:Field, tuid:Tuid): TypeContent {
        return this.vmApi.typeTuidContent(tuid);
    }

    pickerConfig(field:Field, tuid:Tuid): PickerConfig {
        return this.vmApi.pickerConfig(tuid);
    }

    protected newFormRowBuilder(): FormRowBuilder {
        return new VmEntityFormRowBuilder(this.vmApi, this);
    }

    get VmForm(): TypeVmForm {
        return this.vmApi.VmForm;
    }

    async submit() {}

    async onSubmitClick() {
        await this.submit();
    }

    newSubmitButton():JSX.Element {
        return <button className="btn btn-primary"
            type="button"
            onClick={this.onSubmitClick}>
            提交
        </button>;
    }

    newVmForm(values, fields:Field[], fieldUIs:any[], className:string):VmForm {
        return this.vmForm = new this.VmForm(values, fields, this.newSubmitButton(), fieldUIs, className, this.newFormRowBuilder());
    }
}

export function vmLinkIcon(cls:string, faName:string) {
    return <FA className={cls} size="lg" name={faName} fixWidth={true} />;
}
