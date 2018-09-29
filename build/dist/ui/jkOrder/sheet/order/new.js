import * as React from 'react';
import { Page } from "tonva-tools";
import { dictionary as x } from '../../res';
import { VSheetNew } from "../../../../ui-usql";
export class VOrderNew extends VSheetNew {
    constructor() {
        super(...arguments);
        this.view = () => React.createElement(Page, { header: this.label },
            React.createElement("div", null, x.order.top),
            this.vForm.render());
    }
}
//# sourceMappingURL=new.js.map