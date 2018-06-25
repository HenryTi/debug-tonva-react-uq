import { VmFormRow, VmFormFieldRowNumber, VmFormFieldRowString, VmFormFieldRowUnkown } from "./row";
import { Field } from "../field";
import { VmForm } from ".";

export class FormRowBuilder {
    buildRows(vmForm: VmForm, fields: Field[], fieldUIs?: any[]): VmFormRow[] {
        if (fieldUIs === undefined) {
            return fields.map(v => this.buildRow(vmForm, v, undefined));
        }
        let ret:VmFormRow[] = [];
        fieldUIs.map(v => {
            let {name} = v;
            let field = fields.find(f => f.name === name);
            if (field === undefined) return;
            ret.push(this.buildRow(vmForm, field, v));
        });
        return ret;
    }

    buildRow(vmForm: VmForm, field: Field, ui?: any): VmFormRow {
        switch (field.type) {
            case 'tinyint':
            case 'smallint':
            case 'int':
            case 'bigint':
                return new VmFormFieldRowNumber(vmForm, field);
                /*
                let tuidName = field.tuid;
                if (tuidName === undefined) return new VmFormFieldRowNumber(field);
                return new VmTuidInput(key, field, this.vmApi.getTuid(tuidName));
                */
            case 'char':
            case 'text':
                return new VmFormFieldRowString(vmForm, field);
            default: return new VmFormFieldRowUnkown(vmForm, field);
        }
    }
}
