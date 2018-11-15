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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
var VAppMain = /** @class */ (function (_super) {
    __extends(VAppMain, _super);
    function VAppMain() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.appPage = function () {
            var _a = _this.controller, caption = _a.caption, cUsqArr = _a.cUsqArr;
            var content;
            if (cUsqArr.length === 0) {
                content = React.createElement("div", { className: "p-3 text-info" },
                    React.createElement(FA, { name: "minus-circle", className: "text-danger", size: "lg" }),
                    " \u00A0 \u6B64APP\u6CA1\u6709\u7ED1\u5B9A\u4EFB\u4F55\u7684USQ");
            }
            else {
                content = cUsqArr.map(function (v, i) { return React.createElement("div", { key: i }, v.render()); });
            }
            return React.createElement(Page, { header: caption, logout: function () { meInFrame.unit = undefined; } },
                React.createElement("div", { className: "p-3" }, "\u81EA\u5B9A\u4E49\u7A0B\u5E8F\u754C\u9762\u4E86\u3002\u663E\u793A\u8FD9\u4E00\u6BB5\uFF0C\u81EA\u5B9A\u4E49\u8D77\u4F5C\u7528\u4E86\u3002\u53EF\u4EE5\u5728\u8FD9\u91CC\u653E\u7F6E\u4EFB\u4F55\u5185\u5BB9"),
                content);
        };
        return _this;
    }
    VAppMain.prototype.showEntry = function (param) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.openPage(this.appPage);
                return [2 /*return*/];
            });
        });
    };
    return VAppMain;
}(VPage));
var ui = {
    CApp: CMyApp,
    //App: App,
    //"DevApp/devappApi": DevApp_devappApi,
    res: res,
    main: VAppMain,
    usqs: {
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