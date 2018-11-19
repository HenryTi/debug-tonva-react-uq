import { observer } from "mobx-react";
import React from "react";
import { FA } from "tonva-react-form";
import { Page } from "tonva-tools";
import { CQuery, VQueryMain } from "tonva-react-usql";
export class CGetMessage extends CQuery {
    get VQueryMain() { return VMain; }
}
export class VMain extends VQueryMain {
    constructor() {
        super(...arguments);
        this.queryResult = observer((result) => {
            let ret0 = result.ret[0];
            let rightClose = React.createElement("button", { className: "btn btn-outline-success", onClick: this.again },
                React.createElement(FA, { name: "search" }),
                " \u518D\u67E5\u8BE2");
            return React.createElement(Page, { header: this.label, right: rightClose },
                "\u91CD\u8F7D\u7684CGetMessage ",
                React.createElement("br", null),
                ret0.fromUser.content(),
                React.createElement("pre", null, JSON.stringify(ret0, undefined, '\t')));
        });
    }
}
//# sourceMappingURL=cGetMessge.js.map