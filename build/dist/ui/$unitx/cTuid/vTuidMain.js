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
import * as React from 'react';
import { VTuidMain } from "../../../ui-usql";
import { Page } from 'tonva-tools';
import { SearchBox, List, Muted } from 'tonva-react-form';
import { Button } from 'reactstrap';
var MyVTuidMain = /** @class */ (function (_super) {
    __extends(MyVTuidMain, _super);
    function MyVTuidMain() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(MyVTuidMain.prototype, "view", {
        get: function () {
            var _this = this;
            var _a = this.controller, label = _a.label, proxyLinks = _a.proxyLinks;
            return function () { return React.createElement(Page, { header: label }, proxyLinks === undefined ?
                React.createElement(React.Fragment, null,
                    React.createElement(SearchBox, { className: "w-100", onSearch: _this.onSearch, placeholder: '搜索' + label }),
                    "\u6539\u5199\u7684TuidMain",
                    React.createElement("div", { className: 'my-3' },
                        React.createElement(Button, { className: "ml-3", color: "primary", onClick: _this.onNew }, "\u65B0\u589E"),
                        React.createElement(Button, { className: "ml-3", color: "primary", onClick: _this.onList }, "\u5217\u8868"))) :
                React.createElement(List, { className: "my-2", header: React.createElement(Muted, null,
                        label,
                        " \u4EE3\u7406\u4E0B\u5217Tuid"), items: proxyLinks, item: { render: _this.entityRender, onClick: _this.entityClick } })); };
        },
        enumerable: true,
        configurable: true
    });
    return MyVTuidMain;
}(VTuidMain));
export { MyVTuidMain };
//# sourceMappingURL=vTuidMain.js.map