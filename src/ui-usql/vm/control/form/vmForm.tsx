import * as React from 'react';
import { observer } from 'mobx-react';
import { ViewModel } from '../../viewModel';
import { Field } from '../../field';
import { VmApi } from '../../vmApi';
import { Tuid } from '../../../entities';
import { observable } from 'mobx';

export class VmForm extends ViewModel {
    protected vmApi:VmApi;
    protected fields:Field[];
    constructor(vmApi:VmApi, className:string, fields:Field[]) {
        super();
        this.vmApi = vmApi;
        this.className = className;
        this.fields = fields;
        this.buildRows();
    }
    protected buildRows() {
        let len = this.fields.length;
        for (let i=0; i<len; i++) {
            let field = this.fields[i];
            this.formRows.push(this.buildRow(i, field));
        }
    }

    protected buildRow(key, field:Field): VmFormRow {
        switch (field.type) {
            case 'tinyint':
            case 'smallint':
            case 'int':
            return new VmNumber(key, field);
            case 'bigint':
                let tuidName = field.tuid;
                if (tuidName === undefined) return new VmNumber(key, field);
                return new VmTuidInput(key, field, this.vmApi.getTuid(tuidName));
            case 'char':
            case 'text':
                return new VmString(key, field);
            default: return new VmFormRow(key, field);
        }
    }

    formRows: VmFormRow[] = [];
    className: string;

    renderView() {
        return <Form vm={this} />;
    }
}

@observer
class Form extends React.Component<{vm:VmForm}> {
    render() {
        let {vm} = this.props;
        let {formRows, className} = vm;
        return <form className={className}>
            {formRows.map(v => v.renderView())}
        </form>;
    }
}

export class VmFormRow extends ViewModel {
    private key:any;
    protected field:Field;
    @observable protected error: string;
    //private label:any;
    constructor(key:any, field:Field) {
        super();
        this.key = key;
        this.field = field;
        //this.label = label;
    }

    protected renderInput() {
        return <div className="form-control-plaintext">
            unknow field type: {JSON.stringify(this.field)}
        </div>
    }

    protected renderError() {
        if (this.error === undefined) return;
        return <div>{this.error}</div>
    }

    protected renderControl() {
        return <div className="col-sm-10">
            {this.renderInput()}
            {this.renderError()}
        </div>;
    }

    renderView() {
        return <div key={this.key} className='form-group row'>
            <label className='col-sm-2 col-form-label'>
                {this.field.name}
            </label>
            {this.renderControl()}
        </div>;
    }
}

export class VmTuidInput extends VmFormRow {
    protected tuid:Tuid;
    constructor(key:any, field:Field, tuid:Tuid) {
        super(key, field);
        this.tuid = tuid;
    }
    protected renderInput() {
        return <div className="form-control-plaintext">
            tuid: {this.tuid.name}
        </div>;
    }
}

export abstract class VmInput extends VmFormRow {
    constructor(key:any, field:Field) {
        super(key, field);
        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }

    protected inputType:string;

    protected onFocus() {
        this.error = undefined;
    }

    protected onBlur() {
        this.error = 'error';
    }

    protected renderInput() {
        return <input className="form-control"
            type={this.inputType}
            onFocus={this.onFocus}
            onBlur={this.onBlur} />;
    }
}

export class VmNumber extends VmInput {
}

export class VmString extends VmInput {
}