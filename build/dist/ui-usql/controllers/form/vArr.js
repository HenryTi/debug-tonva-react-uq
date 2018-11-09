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
import _ from 'lodash';
import { List, Muted } from 'tonva-react-form';
import { Page, nav } from 'tonva-tools';
import { ViewModel, JSONContent } from './viewModel';
import { VForm, FormMode } from './vForm';
var VArr = /** @class */ (function (_super) {
    __extends(VArr, _super);
    function VArr(ownerForm, arr, onEditRow) {
        var _this = _super.call(this) || this;
        _this.rowPage = function () {
            return React.createElement(Page, { header: _this.label, back: "close" }, _this.vForm.render('py-3'));
        };
        _this.onSubmit = function () { return __awaiter(_this, void 0, void 0, function () {
            var valueBoxs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        valueBoxs = this.vForm.valueBoxs;
                        return [4 /*yield*/, this.onRowChanged(valueBoxs)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        _this.onRowChanged = function (rowValues) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.rowValues === undefined)) return [3 /*break*/, 4];
                        rowValues.$owner = this.ownerForm.values;
                        this.list.push(rowValues);
                        if (!(this.onEditRow === undefined)) return [3 /*break*/, 1];
                        this.vForm.reset();
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, this.onEditRow(undefined, this.onRowChanged)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        _.merge(this.rowValues, rowValues);
                        if (this.onEditRow === undefined)
                            nav.pop();
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        _this.renderItem = function (item, index) {
            if (_this.rowContent === undefined)
                return React.createElement("div", { className: "px-3 py-2" },
                    React.createElement(JSONContent, __assign({}, item)));
            return React.createElement(_this.rowContent, __assign({}, item));
        };
        _this.showRow = function (rowValues) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.onEditRow !== undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.onEditRow(rowValues, this.onRowChanged)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                    case 2:
                        this.vForm.reset();
                        if (rowValues !== undefined)
                            this.vForm.setValues(rowValues);
                        nav.push(React.createElement(this.rowPage, null));
                        return [2 /*return*/];
                }
            });
        }); };
        _this.editRow = function (rowValues) { return __awaiter(_this, void 0, void 0, function () {
            var vSubmit;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.rowValues = rowValues;
                        vSubmit = this.vForm.vSubmit;
                        if (vSubmit !== undefined) {
                            vSubmit.caption = this.editSubmitCaption;
                            vSubmit.className = 'btn btn-outline-success';
                        }
                        this.vForm.mode = this.ownerForm.mode;
                        return [4 /*yield*/, this.showRow(rowValues)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        _this.internalAddRow = function () { return __awaiter(_this, void 0, void 0, function () {
            var vSubmit;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.rowValues = undefined;
                        vSubmit = this.vForm.vSubmit;
                        vSubmit.caption = this.newSubmitCaption;
                        vSubmit.className = 'btn btn-outline-success';
                        this.vForm.reset();
                        this.vForm.mode = FormMode.new;
                        return [4 /*yield*/, this.showRow(undefined)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        _this.view = function () {
            var button;
            if (_this.addRow !== undefined || _this.mode !== FormMode.readonly) {
                button = React.createElement("button", { onClick: _this.addRow || _this.internalAddRow, type: "button", className: "btn btn-link p-0" }, _this.ownerForm.arrTitleNewButton);
            }
            var header = _this.header || React.createElement("div", { className: "px-3 bg-light small", style: { paddingTop: '1px', paddingBottom: '1px' } },
                React.createElement("div", { className: "flex-fill align-self-center" }, _this.label),
                button);
            return React.createElement(List, { className: "pb-3", header: header, none: React.createElement(Muted, { className: "px-3 py-2" }, _this.none), items: _this.list, item: { render: _this.renderItem, onClick: _this.editRow } });
        };
        _this.ownerForm = ownerForm;
        var name = arr.name, fields = arr.fields;
        _this.name = name;
        var ui = ownerForm.ui, res = ownerForm.res, mode = ownerForm.mode, inputs = ownerForm.inputs, values = ownerForm.values;
        var arrsRes = res.arrs;
        var arrRes = arrsRes !== undefined ? arrsRes[name] : {};
        var label = arrRes.label, none = arrRes.none, newSubmit = arrRes.newSubmit, editSubmit = arrRes.editSubmit;
        _this.none = none || ownerForm.none;
        _this.newSubmitCaption = newSubmit || ownerForm.arrNewCaption;
        _this.editSubmitCaption = editSubmit || ownerForm.arrEditCaption;
        _this.label = label || name;
        var arrUI = ((ui && ui.items[name]) || {});
        _this.rowContent = arrUI.rowContent; // || JSONContent;
        _this.mode = mode;
        if (_this.onEditRow === undefined) {
            _this.vForm = new VForm({
                fields: fields,
                arrs: undefined,
                ui: arrUI,
                res: arrRes,
                inputs: inputs[name],
                none: ownerForm.none,
                submitCaption: 'submit',
                arrNewCaption: undefined,
                arrEditCaption: undefined,
                arrTitleNewButton: undefined,
                mode: mode,
            }, mode === FormMode.readonly ? undefined : _this.onSubmit);
        }
        else {
            _this.onEditRow = onEditRow;
        }
        _this.list = values[name];
        return _this;
    }
    VArr.prototype.reset = function () {
        this.vForm.reset();
        this.list.clear();
    };
    VArr.prototype.setAddRow = function (addRow) {
        this.addRow = addRow;
    };
    return VArr;
}(ViewModel));
export { VArr };
//# sourceMappingURL=vArr.js.map