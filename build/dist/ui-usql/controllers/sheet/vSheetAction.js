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
import classNames from 'classnames';
import { Button } from 'reactstrap';
import { Page } from 'tonva-tools';
import { VSheetView } from './vSheetView';
import { FA } from 'tonva-react-form';
var VSheetAction = /** @class */ (function (_super) {
    __extends(VSheetAction, _super);
    function VSheetAction() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.actionClick = function (action) { return __awaiter(_this, void 0, void 0, function () {
            var _a, id, flow, state, res;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.sheetData.brief, id = _a.id, flow = _a.flow, state = _a.state;
                        return [4 /*yield*/, this.controller.action(id, flow, state, action.name)];
                    case 1:
                        res = _b.sent();
                        this.ceasePage();
                        this.openPage(this.acted);
                        return [2 /*return*/];
                }
            });
        }); };
        _this.deleteClick = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                alert('单据作废：程序正在设计中');
                return [2 /*return*/];
            });
        }); };
        _this.editClick = function () { return __awaiter(_this, void 0, void 0, function () {
            var values;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.controller.editSheet(this.sheetData)];
                    case 1:
                        values = _a.sent();
                        this.vForm.setValues(values);
                        return [2 /*return*/];
                }
            });
        }); };
        _this.page = function () {
            var brief = _this.sheetData.brief;
            var state = brief.state, no = brief.no;
            var stateLabel = _this.controller.getStateLabel(state);
            var states = _this.entity.states;
            var s = states.find(function (v) { return v.name === state; });
            var actionButtons, startButtons;
            if (s === undefined) {
                var text = void 0, cn = void 0;
                switch (state) {
                    default:
                        text = '不认识的单据状态\'' + state + '\'';
                        cn = 'text-info';
                        break;
                    case '-':
                        text = '已作废';
                        cn = 'text-danger';
                        break;
                    case '#':
                        text = '已归档';
                        cn = 'text-success';
                        break;
                }
                actionButtons = React.createElement("div", { className: classNames(cn) },
                    "[",
                    text,
                    "]");
            }
            else {
                actionButtons = React.createElement("div", { className: "flex-grow-1" }, s.actions.map(function (v, index) {
                    return React.createElement(Button, { key: index, className: "mr-2", color: "primary", onClick: function () { return _this.actionClick(v); } }, _this.controller.getActionLabel(state, v.name));
                }));
                if (state === '$') {
                    startButtons = React.createElement("div", null,
                        React.createElement(Button, { outline: true, className: "ml-2", color: "info", onClick: _this.editClick }, "\u4FEE\u6539"),
                        React.createElement(Button, { outline: true, className: "ml-2", color: "danger", onClick: _this.deleteClick }, "\u4F5C\u5E9F"));
                }
            }
            ;
            return React.createElement(Page, { header: _this.label + ':' + stateLabel + '-' + no },
                React.createElement("div", { className: "mb-2" },
                    React.createElement("div", { className: "d-flex px-3 py-2 border-bottom bg-light" },
                        actionButtons,
                        startButtons),
                    React.createElement(_this.sheetView, null)));
        };
        _this.acted = function () {
            var discription = _this.sheetData.brief.discription;
            return React.createElement(Page, { header: "\u5DF2\u5904\u7406", back: "close" },
                React.createElement("div", { className: "p-3 d-flex flex-column align-items-center" },
                    React.createElement("div", { className: "p-3" }, discription),
                    React.createElement("div", { className: "text-success" },
                        React.createElement(FA, { name: "check-circle-o" }),
                        " \u5355\u636E\u5DF2\u5904\u7406\uFF01"),
                    React.createElement("div", { className: "p-3" },
                        React.createElement("button", { className: "btn btn-outline-info", onClick: function () { return _this.backPage(); } }, "\u8FD4\u56DE"))));
        };
        return _this;
    }
    VSheetAction.prototype.showEntry = function (sheetData) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.sheetData = sheetData;
                //let {brief, data, flows} = await this.controller.getSheetData(sheetId);
                //this.brief = brief;
                //this.flows = flows;
                //this.data = data;
                //this.state = this.brief.state;
                this.vForm = this.createForm(undefined, sheetData.data);
                this.openPage(this.page);
                return [2 /*return*/];
            });
        });
    };
    return VSheetAction;
}(VSheetView));
export { VSheetAction };
//# sourceMappingURL=vSheetAction.js.map