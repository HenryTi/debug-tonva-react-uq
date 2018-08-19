import * as React from 'react';
import { FA } from 'tonva-react-form';
/*
export abstract class VmEntity extends VmPage {
    entity: Entity;
    protected ui: EntityUI;
    label: string;
    crUsq:CrUsq;

    constructor(crUsq:CrUsq, entity: Entity, ui?:EntityUI) {
        super();
        this.crUsq = crUsq;
        this.entity = entity;
        this.ui = ui;
        this.label = this.getLabel();
        this.init();
    }

    protected init() {}
    protected getRes() {
        return this.ui && this.ui.res;
    }
    protected getLabel() {
        let res = this.getRes();
        return (res && res.label) || (this.ui && this.ui.label) || this.entity.name;
    }

    protected navVm = async <T extends VmEntity>(vmType: new (crUsq:CrUsq, entity:Entity, ui:EntityUI) => T, param?:any) => {
        await this.crUsq.navVm(vmType, this.entity, this.ui, param);
    }

    protected createVmFieldsForm() {
        let ret = this.newVmFieldsForm();
        ret.init(this.fieldsFormOptions);
        return ret;
    }

    protected newVmFieldsForm():VmForm {
        return new VmForm();
    }

    protected get fieldsFormOptions():VmFormOptions {
        let {fields, arrFields} = this.entity;
        return {
            fields: fields,
            arrs: arrFields,
            crUsq: this.crUsq,
            ui: this.ui && this.ui.res,
        }
    }

    async start(param?:any):Promise<void> {
        await this.loadSchema();
        await super.start(param);
    }

    returns: any;
    get icon() {return vmLinkIcon('text-info', 'circle-thin')}

    async loadSchema() {
        await this.entity.loadSchema();
    }

    typeVmTuidControl(field:Field, tuid:Tuid): TypeVmTuidControl {
        return this.crUsq.typeVmTuidControl(tuid);
    }

    typeTuidContent(field:Field, tuid:Tuid): TypeContent {
        return this.crUsq.typeTuidContent(tuid);
    }

    pickerConfig(field:Field, tuid:Tuid): PickerConfig {
        return this.crUsq.pickerConfig(tuid);
    }
    //renderForm = (className) => <div>old VMForm</div>;
}
*/
export function vmLinkIcon(cls, faName) {
    return React.createElement(FA, { className: cls, size: "lg", name: faName, fixWidth: true });
}
//# sourceMappingURL=vmEntity.js.map