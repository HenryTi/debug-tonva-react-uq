import * as React from 'react';
import { Button } from 'reactstrap';
import { ViewModel } from "../viewModel";
export class VmSubmit extends ViewModel {
    constructor(vmForm) {
        super();
        this.view = () => React.createElement(Button, null, "Submit");
        this.vmForm = vmForm;
    }
}
//# sourceMappingURL=vmSubmit.js.map