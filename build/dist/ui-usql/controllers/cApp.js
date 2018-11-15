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
import * as React from 'react';
import { Page, loadAppUsqs, nav, meInFrame, Controller, VPage, resLang } from 'tonva-tools';
import { List, LMR, FA } from 'tonva-react-form';
import { CUsq } from './usq';
import { centerApi } from '../centerApi';
var CApp = /** @class */ (function (_super) {
    __extends(CApp, _super);
    function CApp(tonvaApp, ui) {
        var _this = _super.call(this, resLang(ui.res, nav.language, nav.culture)) || this;
        _this.cUsqCollection = {};
        _this.renderRow = function (item, index) {
            var id = item.id, nick = item.nick, name = item.name;
            return React.createElement(LMR, { className: "px-3 py-2", right: 'id: ' + id },
                React.createElement("div", null, nick || name));
        };
        _this.onRowClick = function (item) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        meInFrame.unit = item.id; // 25;
                        return [4 /*yield*/, this.start()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        /*
        protected appPage = () => {
            return <Page header={this.caption} logout={()=>{meInFrame.unit = undefined}}>
                {this.cUsqArr.map((v,i) => <div key={i}>{v.render()}</div>)}
            </Page>;
        };
        */
        //<LMR className="px-3 py-2 my-2 bg-light"
        //left={<FA name='cog' fixWidth={true} className="text-info mr-2 pt-1" />}
        //onClick={this.opClick}>设置操作权限</LMR>
        _this.selectUnitPage = function () {
            return React.createElement(Page, { header: "\u9009\u62E9\u5C0F\u53F7", logout: true },
                React.createElement(List, { items: _this.appUnits, item: { render: _this.renderRow, onClick: _this.onRowClick } }));
        };
        var parts = tonvaApp.split('/');
        if (parts.length !== 2) {
            throw 'tonvaApp name must be / separated, owner/app';
        }
        _this.appOwner = parts[0];
        _this.appName = parts[1];
        _this.ui = ui;
        _this.caption = _this.res.caption || 'Tonva';
        return _this;
    }
    CApp.prototype.loadUsqs = function () {
        return __awaiter(this, void 0, void 0, function () {
            var unit, app, id, usqs, _i, usqs_1, appUsq, usqId, usqOwner, usqName, url, urlDebug, ws, access, token, usq, ui, cUsq;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        unit = meInFrame.unit;
                        return [4 /*yield*/, loadAppUsqs(this.appOwner, this.appName)];
                    case 1:
                        app = _a.sent();
                        id = app.id, usqs = app.usqs;
                        this.id = id;
                        _i = 0, usqs_1 = usqs;
                        _a.label = 2;
                    case 2:
                        if (!(_i < usqs_1.length)) return [3 /*break*/, 5];
                        appUsq = usqs_1[_i];
                        usqId = appUsq.id, usqOwner = appUsq.usqOwner, usqName = appUsq.usqName, url = appUsq.url, urlDebug = appUsq.urlDebug, ws = appUsq.ws, access = appUsq.access, token = appUsq.token;
                        usq = usqOwner + '/' + usqName;
                        ui = this.ui && this.ui.usqs && this.ui.usqs[usq];
                        cUsq = this.newCUsq(usq, usqId, access, ui || {});
                        return [4 /*yield*/, cUsq.loadSchema()];
                    case 3:
                        _a.sent();
                        this.cUsqCollection[usq] = cUsq;
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    CApp.prototype.newCUsq = function (usq, usqId, access, ui) {
        var cUsq = new (this.ui.CUsq || CUsq)(usq, this.id, usqId, access, ui);
        Object.setPrototypeOf(cUsq.x, this.x);
        return cUsq;
    };
    Object.defineProperty(CApp.prototype, "cUsqArr", {
        get: function () {
            var ret = [];
            for (var i in this.cUsqCollection) {
                ret.push(this.cUsqCollection[i]);
            }
            return ret;
        },
        enumerable: true,
        configurable: true
    });
    CApp.prototype.getCUsq = function (apiName) {
        return this.cUsqCollection[apiName];
    };
    Object.defineProperty(CApp.prototype, "VAppMain", {
        get: function () { return (this.ui && this.ui.main) || VAppMain; },
        enumerable: true,
        configurable: true
    });
    CApp.prototype.internalStart = function () {
        return __awaiter(this, void 0, void 0, function () {
            var hash, unit, app, id, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        hash = document.location.hash;
                        if (!hash.startsWith('#tvdebug')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.showMainPage()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                    case 2:
                        this.isProduction = hash.startsWith('#tv');
                        unit = meInFrame.unit;
                        if (!(this.isProduction === false && (unit === undefined || unit <= 0))) return [3 /*break*/, 5];
                        return [4 /*yield*/, loadAppUsqs(this.appOwner, this.appName)];
                    case 3:
                        app = _a.sent();
                        id = app.id;
                        this.id = id;
                        return [4 /*yield*/, this.loadAppUnits()];
                    case 4:
                        _a.sent();
                        switch (this.appUnits.length) {
                            case 0:
                                //alert('当前登录的用户不支持当前的APP');
                                //await nav.logout();
                                this.showUnsupport();
                                return [2 /*return*/];
                            case 1:
                                unit = this.appUnits[0].id;
                                if (unit === undefined || unit < 0) {
                                    //alert('当前unit不支持app操作，请重新登录');
                                    //await nav.logout();
                                    this.showUnsupport();
                                    return [2 /*return*/];
                                }
                                meInFrame.unit = unit;
                                break;
                            default:
                                nav.clear();
                                nav.push(React.createElement(this.selectUnitPage, null));
                                return [2 /*return*/];
                        }
                        _a.label = 5;
                    case 5: return [4 /*yield*/, this.showMainPage()];
                    case 6:
                        _a.sent();
                        return [3 /*break*/, 8];
                    case 7:
                        err_1 = _a.sent();
                        nav.push(React.createElement(Page, { header: "App start error!" },
                            React.createElement("pre", null, typeof err_1 === 'string' ? err_1 : err_1.message)));
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    // 如果是独立app，删去显示app之前的页面。
    // 如果非独立app，则不删
    CApp.prototype.clearPrevPages = function () {
        nav.clear();
    };
    CApp.prototype.showUnsupport = function () {
        this.clearPrevPages();
        this.openPage(React.createElement(Page, { header: "APP\u65E0\u6CD5\u8FD0\u884C", logout: true },
            React.createElement("div", { className: "m-3 text-danger container" },
                React.createElement("div", { className: "form-group row" },
                    React.createElement("div", { className: "col-2" },
                        React.createElement(FA, { name: "exclamation-triangle" })),
                    React.createElement("div", { className: "col" }, "\u7528\u6237\u4E0D\u652F\u6301APP")),
                React.createElement("div", { className: "form-group row" },
                    React.createElement("div", { className: "col-2" }, "\u7528\u6237: "),
                    React.createElement("div", { className: "col" }, "" + nav.user.name)),
                React.createElement("div", { className: "form-group row" },
                    React.createElement("div", { className: "col-2" }, "App:"),
                    React.createElement("div", { className: "col" }, this.appOwner + "/" + this.appName)))));
    };
    CApp.prototype.showMainPage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var parts, action, usqId, sheetTypeId, sheetId, cUsq;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadUsqs()];
                    case 1:
                        _a.sent();
                        parts = document.location.hash.split('-');
                        if (!(parts.length > 2)) return [3 /*break*/, 3];
                        action = parts[2];
                        if (!(action === 'sheet' || action === 'sheet_debug')) return [3 /*break*/, 3];
                        usqId = Number(parts[3]);
                        sheetTypeId = Number(parts[4]);
                        sheetId = Number(parts[5]);
                        cUsq = this.getCUsqFromId(usqId);
                        if (cUsq === undefined) {
                            alert('unknown usqId: ' + usqId);
                            return [2 /*return*/];
                        }
                        this.clearPrevPages();
                        //nav.replace(<Page header="Sheet">API: {apiId} 编号：{sheetId}</Page>);
                        return [4 /*yield*/, cUsq.navSheet(sheetTypeId, sheetId)];
                    case 2:
                        //nav.replace(<Page header="Sheet">API: {apiId} 编号：{sheetId}</Page>);
                        _a.sent();
                        return [2 /*return*/];
                    case 3:
                        this.clearPrevPages();
                        //nav.push(<this.appPage />);
                        this.showVPage(this.VAppMain);
                        return [2 /*return*/];
                }
            });
        });
    };
    CApp.prototype.getCUsqFromId = function (usqId) {
        for (var i in this.cUsqCollection) {
            var cUsq = this.cUsqCollection[i];
            if (cUsq.id === usqId)
                return cUsq;
        }
        return;
    };
    CApp.prototype.loadAppUnits = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ret;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, centerApi.userAppUnits(this.id)];
                    case 1:
                        ret = _a.sent();
                        this.appUnits = ret;
                        if (ret.length === 1) {
                            meInFrame.unit = ret[0].id;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return CApp;
}(Controller));
export { CApp };
var VAppMain = /** @class */ (function (_super) {
    __extends(VAppMain, _super);
    function VAppMain() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.appPage = function () {
            var _a = _this.controller, caption = _a.caption, cUsqArr = _a.cUsqArr;
            var content;
            if (cUsqArr.length === 0) {
                content = React.createElement("div", { className: "text-danger" },
                    React.createElement(FA, { name: "" }),
                    " \u6B64APP\u6CA1\u6709\u7ED1\u5B9A\u4EFB\u4F55\u7684USQ");
            }
            else {
                content = cUsqArr.map(function (v, i) { return React.createElement("div", { key: i }, v.render()); });
            }
            return React.createElement(Page, { header: caption, logout: function () { meInFrame.unit = undefined; } }, content);
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
//# sourceMappingURL=CApp.js.map