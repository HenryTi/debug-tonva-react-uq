import * as React from 'react';
import { Page } from 'tonva-tools';
import { VmSheetEdit } from '../../../../ui-usql';
export class VmSheetEdit单据 extends VmSheetEdit {
    constructor() {
        super(...arguments);
        this.showField1 = () => {
            this.vmForm.showBands(['f1'], 'f1');
        };
        this.showField2 = () => {
            this.vmForm.showBands(['f2'], 'f2');
        };
        this.showAll = () => {
            this.vmForm.showBands(undefined);
        };
        this.view = Edit;
    }
}
const Edit = ({ vm }) => {
    let { label, vmForm, showAll, showField1, showField2 } = vm;
    return React.createElement(Page, { header: label },
        React.createElement("div", { className: "p-3" }, "\u81EA\u5DF1\u7684\u5355\u636E\u7A0B\u5E8F"),
        vmForm.render(),
        React.createElement("div", { className: "px-3" },
            React.createElement("div", { className: "form-group row" },
                React.createElement("div", { className: "offset-sm-2 col-sm-10" },
                    React.createElement("button", { className: "btn btn-primary", onClick: showAll }, "all"),
                    " \u00A0",
                    React.createElement("button", { className: "btn btn-primary", onClick: showField1 }, "f1"),
                    " \u00A0",
                    React.createElement("button", { className: "btn btn-primary", onClick: showField2 }, "f2")))));
};
//# sourceMappingURL=edit.js.map