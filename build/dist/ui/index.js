import React from 'react';
import { VPage, Page, meInFrame } from 'tonva-tools';
import $unitx from './$unitx';
import devApp from './devApp';
import jkOrder from './jkOrder';
import res from './res';
class VAppMain extends VPage {
    constructor() {
        super(...arguments);
        this.appPage = () => {
            let { caption, cUsqArr } = this.controller;
            return React.createElement(Page, { header: caption, logout: () => { meInFrame.unit = undefined; } },
                React.createElement("div", { className: "p-3" }, "\u81EA\u5B9A\u4E49\u7A0B\u5E8F\u754C\u9762\u4E86\u3002\u663E\u793A\u8FD9\u4E00\u6BB5\uFF0C\u81EA\u5B9A\u4E49\u8D77\u4F5C\u7528\u4E86\u3002\u53EF\u4EE5\u5728\u8FD9\u91CC\u653E\u7F6E\u4EFB\u4F55\u5185\u5BB9"),
                cUsqArr.map((v, i) => React.createElement("div", { key: i }, v.render())));
        };
    }
    async showEntry(param) {
        this.openPage(this.appPage);
    }
}
const ui = {
    //App: App,
    //"DevApp/devappApi": DevApp_devappApi,
    res: res,
    main: VAppMain,
    usqs: {
        "$$$/$unitx": $unitx,
        "DevApp/devappApi": devApp,
        "JKDev/jkOrder": jkOrder,
    }
};
//convertUIKeyToLowercase(ui);
export default ui;
//export { CMyApp } from './CApp';
//# sourceMappingURL=index.js.map