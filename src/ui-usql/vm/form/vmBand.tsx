import * as React from 'react';
import { VmField } from './vmField';
import { VmArr } from './vmArr';
import { VmSubmit } from './vmSubmit';

export abstract class VmBand {
    protected label: string;
    protected view = () => <div />;

    constructor(label:string) {
        this.label = label;
    }

    render():JSX.Element {
        return <div key={this.key} className='form-group row'>
            <label className='col-sm-2 col-form-label'>
                {this.label}
            </label>
            <div className="col-sm-10">
                {this.renderContent()}
            </div>
        </div>;
    }

    protected get key() {return this.label}

    protected renderContent():JSX.Element {
        return <div className="form-control form-control-plaintext bg-white border border-info rounded ">content</div>;
    }
}

export class VmFieldBand extends VmBand {
    protected vmField:VmField;
    constructor(label:string, vmField:VmField) {
        super(label);
        this.vmField = vmField;
    }

    protected get key() {return this.vmField.name}

    protected renderContent():JSX.Element {
        return this.vmField.render();
        /*
        <div className="form-control form-control-plaintext bg-white border border-info rounded ">
            {this.vmField.render()}
        </div>;*/
    }
}

export class VmArrBand extends VmBand {
    protected vmArr:VmArr;
    constructor(label:string, vmArr:VmArr) {
        super(label);
        this.vmArr = vmArr;
    }

    protected get key() {return this.vmArr.name}

    render():JSX.Element {
        return <div>VmArrBand</div>
    }
}

export class VmFieldsBand extends VmBand {
    protected vmFields: VmField[];
    constructor(label:string, vmFields:VmField[]) {
        super(label);
        this.vmFields = vmFields;
    }

    protected renderContent():JSX.Element {
        return <div className="form-control form-control-plaintext bg-white border border-info rounded ">
            fields
        </div>;
    }
}

export class VmSubmitBand extends VmBand {
    protected vmSubmit: VmSubmit;
    constructor(vmSubmit:VmSubmit) {
        super(undefined);
        this.vmSubmit = vmSubmit;
    }

    render():JSX.Element {
        let {vmForm} = this.vmSubmit;
        let {onSubmit, isOk} = vmForm;
        return <div key="$submit" className="form-group row">
            <div className="offset-sm-2 col-sm-10">
                <button type="button" 
                    onClick={vmForm.onSubmit} 
                    className="btn btn-primary"
                    disabled={isOk === false}>
                    Submit
                </button>
            </div>
        </div>;
    }
}
