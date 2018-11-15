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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
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
import { List, FA } from 'tonva-react-form';
import { Page } from 'tonva-tools';
import { VEntity } from '../CVEntity';
import { DefaultRow } from './defaultRow';
var VQueryMain = /** @class */ (function (_super) {
    __extends(VQueryMain, _super);
    function VQueryMain() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onSubmit = function () { return __awaiter(_this, void 0, void 0, function () {
            var params, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = this.vForm.getValues();
                        if (!(this.entity.isPaged === true)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.entity.resetPage(30, params)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.entity.loadPage()];
                    case 2:
                        _a.sent();
                        this.replacePage(this.pageResult);
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, this.entity.query(params)];
                    case 4:
                        data = _a.sent();
                        this.replacePage(this.queryResult, data);
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        _this.again = function () {
            _this.vForm.reset();
            _this.replacePage(_this.view);
        };
        _this.renderRow = function (item, index) { return React.createElement(_this.row, __assign({}, item)); };
        _this.view = function () { return React.createElement(Page, { header: _this.label },
            _this.vForm.render('mx-3 my-2'),
            _this.renderExtra()); };
        _this.pageResult = function () {
            var _a = _this.entity, name = _a.name, list = _a.list;
            var rightClose = React.createElement("button", { className: "btn btn-outline-success", onClick: _this.again },
                React.createElement(FA, { name: "search" }),
                " \u518D\u67E5\u8BE2");
            return React.createElement(Page, { header: _this.label, right: rightClose },
                React.createElement(List, { items: list, item: { render: _this.renderRow } }));
        };
        _this.queryResult = observer(function (result) {
            var rightClose = React.createElement("button", { className: "btn btn-outline-success", onClick: _this.again },
                React.createElement(FA, { name: "search" }),
                " \u518D\u67E5\u8BE2");
            return React.createElement(Page, { header: _this.label, right: rightClose },
                React.createElement("pre", null, JSON.stringify(result, undefined, '\t')));
        });
        return _this;
    }
    VQueryMain.prototype.showEntry = function (param) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, row, queryRow;
            return __generator(this, function (_b) {
                this.vForm = this.createForm(this.onSubmit, param);
                _a = this.ui, row = _a.row, queryRow = _a.queryRow;
                this.row = queryRow || row || DefaultRow;
                this.openPage(this.view);
                return [2 /*return*/];
            });
        });
    };
    VQueryMain.prototype.renderExtra = function () {
        return;
    };
    return VQueryMain;
}(VEntity));
export { VQueryMain };
//# sourceMappingURL=vQueryMain.js.map