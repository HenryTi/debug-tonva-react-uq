import * as React from 'react';
import { Button } from 'reactstrap';
import { ViewModel } from "../viewModel";
import { VmForm } from './vmForm';

export class VmSubmit extends ViewModel {
    vmForm: VmForm;
    constructor(vmForm: VmForm) {
        super();
        this.vmForm = vmForm;
    }
    protected view = () => <Button>Submit</Button>;
}