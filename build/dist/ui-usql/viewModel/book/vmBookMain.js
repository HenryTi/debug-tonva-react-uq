import * as React from 'react';
import { Page } from 'tonva-tools';
import { VmBook } from './vmBook';
export class VmBookMain extends VmBook {
    constructor() {
        super(...arguments);
        this.view = () => React.createElement(Page, { header: this.label }, "Book");
    }
}
//# sourceMappingURL=vmBookMain.js.map