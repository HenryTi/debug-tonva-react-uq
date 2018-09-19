import { observer } from "mobx-react";
import React from "react";
import { FA } from "tonva-react-form";
import { Page } from "tonva-tools";
import { CQuery, VQueryMain } from "../../../../ui-usql";
export class CrGetMessage extends CQuery {
    get VmQueryMain() { return VmMain; }
}
export class VmMain extends VQueryMain {
    constructor() {
        super(...arguments);
        this.queryResult = observer((result) => {
            let ret0 = result.ret[0];
            let rightClose = React.createElement("button", { className: "btn btn-outline-success btn-sm", onClick: this.again },
                React.createElement(FA, { name: "search" }),
                " \u518D\u67E5\u8BE2");
            return React.createElement(Page, { header: this.label, right: rightClose },
                "\u91CD\u8F7D\u7684CrGetMessage ",
                React.createElement("br", null),
                ret0.fromUser.content(),
                React.createElement("pre", null, JSON.stringify(ret0, undefined, '\t')));
        });
    }
}
//# sourceMappingURL=crGetMessge.js.map