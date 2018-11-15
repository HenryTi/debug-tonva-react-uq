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
import { FA } from 'tonva-react-form';
import { Button } from 'reactstrap';
import { Page } from 'tonva-tools';
import { jsonStringify } from '../../tools';
import { VEntity } from '../CVEntity';
var VTuidView = /** @class */ (function (_super) {
    __extends(VTuidView, _super);
    function VTuidView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.next = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.vForm.reset();
                this.closePage();
                return [2 /*return*/];
            });
        }); };
        _this.finish = function () {
            _this.closePage(2);
        };
        _this.onSubmit = function () { return __awaiter(_this, void 0, void 0, function () {
            var values, ret;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        values = this.vForm.getValues();
                        return [4 /*yield*/, this.entity.save(this.id, values)];
                    case 1:
                        ret = _a.sent();
                        if (ret) {
                            alert('这里还要判断返回值，先不处理了 \n' + jsonStringify(ret));
                        }
                        this.openPage(function () { return React.createElement(Page, { header: _this.label + '提交成功', back: "none" },
                            React.createElement("div", { className: 'm-3' },
                                React.createElement("span", { className: "text-success" },
                                    React.createElement(FA, { name: 'check-circle', size: 'lg' }),
                                    " \u6210\u529F\u63D0\u4EA4\uFF01"),
                                React.createElement("div", { className: 'mt-5' },
                                    React.createElement(Button, { className: "mr-3", color: "primary", onClick: _this.next }, "\u7EE7\u7EED\u5F55\u5165"),
                                    React.createElement(Button, { color: "primary", outline: true, onClick: _this.finish }, "\u4E0D\u7EE7\u7EED")))); });
                        return [2 /*return*/];
                }
            });
        }); };
        _this.view = function () { return React.createElement(Page, { header: _this.label }, _this.vForm.render('py-3')); };
        return _this;
    }
    VTuidView.prototype.buildForm = function (param) {
        this.vForm = this.createForm(undefined, param);
    };
    VTuidView.prototype.showEntry = function (param) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.buildForm(param);
                this.openPage(this.view);
                return [2 /*return*/];
            });
        });
    };
    VTuidView.prototype.render = function (param) {
        this.buildForm(param);
        return this.vForm.render();
    };
    VTuidView.prototype.loadId = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.id = id;
                return [2 /*return*/];
            });
        });
    };
    VTuidView.prototype.resetForm = function () {
        this.vForm.reset();
    };
    return VTuidView;
}(VEntity));
export { VTuidView };
//# sourceMappingURL=vTuidView.js.map