import * as React from 'react';
import { Button } from 'reactstrap';
import { ViewModel } from "../viewModel";
export class VmSubmit extends ViewModel {
    constructor() {
        super(...arguments);
        this.view = () => React.createElement(Button, null);
    }
}
//# sourceMappingURL=vmSubmit.js.map