var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React from 'react';
import { VPage, Page, meInFrame } from 'tonva-tools';
import $unitx from './$unitx';
import devApp from './devApp';
import jkOrder from './jkOrder';
import cart from './cart';
import res from './res';
import { FA } from 'tonva-react-form';
import { CMyApp } from './CMyApp';
class VAppMain extends VPage {
    constructor() {
        super(...arguments);
        this.appPage = () => {
            let { caption, cUqArr: cUsqArr } = this.controller;
            let content;
            if (cUsqArr.length === 0) {
                content = React.createElement("div", { className: "p-3 text-info" },
                    React.createElement(FA, { name: "minus-circle", className: "text-danger", size: "lg" }),
                    " \u00A0 \u6B64APP\u6CA1\u6709\u7ED1\u5B9A\u4EFB\u4F55\u7684USQ");
            }
            else {
                content = cUsqArr.map((v, i) => React.createElement("div", { key: i }, v.render()));
            }
            return React.createElement(Page, { header: caption, logout: () => { meInFrame.unit = undefined; } },
                React.createElement("div", { className: "p-3" }, "\u81EA\u5B9A\u4E49\u7A0B\u5E8F\u754C\u9762\u4E86\u3002\u663E\u793A\u8FD9\u4E00\u6BB5\uFF0C\u81EA\u5B9A\u4E49\u8D77\u4F5C\u7528\u4E86\u3002\u53EF\u4EE5\u5728\u8FD9\u91CC\u653E\u7F6E\u4EFB\u4F55\u5185\u5BB9"),
                content);
        };
    }
    open(param) {
        return __awaiter(this, void 0, void 0, function* () {
            this.openPage(this.appPage);
        });
    }
}
const ui = {
    CApp: CMyApp,
    //App: App,
    //"DevApp/devappApi": DevApp_devappApi,
    res: res,
    main: VAppMain,
    uqs: {
        "$$$/$unitx": $unitx,
        "DevApp/devappApi": devApp,
        "JKDev/jkOrder": jkOrder,
        "百灵威系统工程部/cart": cart,
    }
};
//convertUIKeyToLowercase(ui);
export default ui;
//export { CMyApp } from './CApp';
//# sourceMappingURL=index.js.map