var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { observer } from "mobx-react";
import React from "react";
import { FA } from "tonva-react-form";
import { Page } from "tonva-tools";
import { CQuery, VQueryMain } from "../../../../ui-usql";
var CGetMessage = /** @class */ (function (_super) {
    __extends(CGetMessage, _super);
    function CGetMessage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(CGetMessage.prototype, "VQueryMain", {
        get: function () { return VMain; },
        enumerable: true,
        configurable: true
    });
    return CGetMessage;
}(CQuery));
export { CGetMessage };
var VMain = /** @class */ (function (_super) {
    __extends(VMain, _super);
    function VMain() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.queryResult = observer(function (result) {
            var ret0 = result.ret[0];
            var rightClose = React.createElement("button", { className: "btn btn-outline-success", onClick: _this.again },
                React.createElement(FA, { name: "search" }),
                " \u518D\u67E5\u8BE2");
            return React.createElement(Page, { header: _this.label, right: rightClose },
                "\u91CD\u8F7D\u7684CGetMessage ",
                React.createElement("br", null),
                ret0.fromUser.content(),
                React.createElement("pre", null, JSON.stringify(ret0, undefined, '\t')));
        });
        return _this;
    }
    return VMain;
}(VQueryMain));
export { VMain };
//# sourceMappingURL=cGetMessge.js.map