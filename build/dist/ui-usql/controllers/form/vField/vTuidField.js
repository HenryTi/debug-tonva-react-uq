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
import { VField, RedMark } from "./vField";
var buttonStyle = {
    textAlign: 'left',
    paddingLeft: '0.75rem',
    paddingRight: '0.75rem',
    overflow: 'hidden'
};
var VTuidField = /** @class */ (function (_super) {
    __extends(VTuidField, _super);
    function VTuidField(vForm, field, fieldUI, fieldRes) {
        var _this = _super.call(this, vForm, field, fieldUI, fieldRes) || this;
        _this.onClick = function () { return __awaiter(_this, void 0, void 0, function () {
            var id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.readonly === true)) return [3 /*break*/, 2];
                        if (!this.value)
                            return [2 /*return*/];
                        return [4 /*yield*/, this.tuid.showInfo(this.value.id)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                    case 2:
                        if (!(this.input !== undefined)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.input.select(this.vForm, this.field, this.vForm.getValues())];
                    case 3:
                        id = _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        alert('call undefined');
                        id = 0;
                        _a.label = 5;
                    case 5:
                        this.setValue(this.tuid.boxId(id));
                        return [2 /*return*/];
                }
            });
        }); };
        _this.view = observer(function () {
            var placeHolder = _this.fieldRes.placeHolder;
            var disabled = false;
            var _ownerField = _this.field._ownerField;
            if (_ownerField !== undefined) {
                var name_1 = _ownerField.name, arr = _ownerField.arr;
                disabled = _this.vForm.getValue(name_1) === null;
            }
            var content;
            if (_this.value === null)
                content = React.createElement(React.Fragment, null, placeHolder || _this.input.placeHolder);
            else if (typeof _this.value === 'object') {
                content = _this.value.content();
            }
            else {
                var idBox = _this.tuid.boxId(_this.value);
                content = idBox.content();
            }
            if (_this.readonly === true) {
                return React.createElement("div", { className: "form-control form-control-plaintext border border-info rounded bg-light cursor-pointer", onClick: _this.onClick }, content);
            }
            var redDot;
            var required = _this.fieldUI.required;
            if (required === true || _this.field.null === false) {
                redDot = React.createElement(RedMark, null);
            }
            return React.createElement(React.Fragment, null,
                redDot,
                React.createElement("button", { className: "form-control btn btn-outline-info", type: "button", disabled: disabled, style: buttonStyle, onClick: _this.onClick }, content));
        });
        _this.tuid = field._tuid;
        _this.vForm = vForm;
        _this.input = vForm.inputs[field.name];
        return _this;
    }
    return VTuidField;
}(VField));
export { VTuidField };
//# sourceMappingURL=vTuidField.js.map