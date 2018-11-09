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
import { Page } from 'tonva-tools';
import { FA } from 'tonva-react-form';
import { VSheet } from "./vSheet";
var VSheetSaved = /** @class */ (function (_super) {
    __extends(VSheetSaved, _super);
    function VSheetSaved() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.restart = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.ceasePage();
                        return [4 /*yield*/, this.event('new')];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        _this.actionClick = function (action) { return __awaiter(_this, void 0, void 0, function () {
            var _a, id, flow, state, res;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.ceasePage();
                        _a = this.brief, id = _a.id, flow = _a.flow, state = _a.state;
                        return [4 /*yield*/, this.controller.action(id, flow, state, action.name)];
                    case 1:
                        res = _b.sent();
                        this.openPage(this.acted);
                        return [2 /*return*/];
                }
            });
        }); };
        _this.buttons = React.createElement(React.Fragment, null,
            React.createElement("button", { className: "btn btn-outline-primary mr-3", onClick: _this.restart }, "\u7EE7\u7EED\u5F00\u5355"),
            React.createElement("button", { className: "btn btn-outline-info", onClick: function () { return _this.backPage(); } }, "\u8FD4\u56DE"));
        _this.view = function () {
            var states = _this.entity.states;
            var state = '$';
            var s = states.find(function (v) { return v.name === state; });
            var actionButtons = React.createElement(React.Fragment, null, s.actions.map(function (v, index) {
                return React.createElement("button", { key: index, className: "btn btn-primary mr-3", onClick: function () { return _this.actionClick(v); } }, _this.controller.getActionLabel(state, v.name));
            }));
            return React.createElement(Page, { header: "\u5DF2\u4FDD\u5B58", back: "close" },
                React.createElement("div", { className: "p-3 d-flex flex-column align-items-center" },
                    React.createElement("div", { className: "text-success" },
                        React.createElement(FA, { name: "check-circle-o" }),
                        " \u5355\u636E\u5DF2\u4FDD\u5B58\uFF01\u7CFB\u7EDF\u5C1A\u672A\u5904\u7406"),
                    React.createElement("div", { className: "p-3" },
                        actionButtons,
                        _this.buttons)));
        };
        _this.acted = function () {
            return React.createElement(Page, null,
                React.createElement("div", { className: "p-3 d-flex flex-column align-items-center" },
                    React.createElement("div", { className: "text-success" },
                        React.createElement(FA, { name: "check-circle-o" }),
                        " \u5355\u636E\u5DF2\u5904\u7406\uFF01"),
                    React.createElement("div", { className: "p-3" }, _this.buttons)));
        };
        return _this;
    }
    VSheetSaved.prototype.showEntry = function (brief) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.brief = brief;
                this.openPage(this.view);
                return [2 /*return*/];
            });
        });
    };
    return VSheetSaved;
}(VSheet));
export { VSheetSaved };
//# sourceMappingURL=vSaved.js.map