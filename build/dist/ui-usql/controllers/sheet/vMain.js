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
import { observer } from 'mobx-react';
import { Badge } from 'reactstrap';
import { Page } from 'tonva-tools';
import { List, Muted, LMR } from 'tonva-react-form';
import { VEntity } from '../VM';
var VSheetMain = /** @class */ (function (_super) {
    __extends(VSheetMain, _super);
    function VSheetMain() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.newClick = function () { return _this.event('new'); };
        _this.schemaClick = function () { return _this.event('schema'); };
        _this.archivesClick = function () { return _this.event('archives'); };
        _this.sheetStateClick = function (state) { return _this.event('state', state); };
        _this.renderState = function (item, index) {
            var state = item.state, count = item.count;
            if (count === 0)
                return null;
            var badge = React.createElement(Badge, { className: "ml-5 align-self-end", color: "success" }, count);
            return React.createElement(LMR, { className: "px-3 py-2", left: _this.controller.getStateLabel(state), right: badge });
        };
        _this.view = observer(function () {
            var list = _this.controller.statesCount.filter(function (row) { return row.count; });
            var right = React.createElement("button", { className: "btn btn-outline-primary", onClick: _this.archivesClick }, "\u5DF2\u5F52\u6863");
            var templet;
            if (_this.isDev === true) {
                templet = React.createElement("button", { className: "btn btn-primary mr-2", color: "primary", onClick: _this.schemaClick }, "\u6A21\u677F");
            }
            return React.createElement(Page, { header: _this.label },
                React.createElement(LMR, { className: "mx-3 my-2", right: right },
                    React.createElement("button", { className: "btn btn-primary mr-2", color: "primary", onClick: _this.newClick }, "\u65B0\u5EFA"),
                    templet),
                React.createElement(List, { className: "my-2", header: React.createElement(Muted, { className: "mx-3 my-1" },
                        "\u5F85\u5904\u7406",
                        _this.label), none: "[ \u65E0 ]", items: list, item: { render: _this.renderState, onClick: _this.sheetStateClick } }));
        });
        return _this;
    }
    VSheetMain.prototype.showEntry = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.controller.getStateSheetCount()];
                    case 1:
                        _a.sent();
                        this.openPage(this.view);
                        return [2 /*return*/];
                }
            });
        });
    };
    return VSheetMain;
}(VEntity));
export { VSheetMain };
//# sourceMappingURL=vMain.js.map