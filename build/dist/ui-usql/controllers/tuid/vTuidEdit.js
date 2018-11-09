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
import { VEntity } from '../VM';
var VTuidEdit = /** @class */ (function (_super) {
    __extends(VTuidEdit, _super);
    function VTuidEdit() {
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
            _this.event('edit-end');
        };
        _this.onSubmit = function () { return __awaiter(_this, void 0, void 0, function () {
            var values, ret, id, unique, _i, unique_1, u;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        values = this.vForm.getValues();
                        return [4 /*yield*/, this.controller.entity.save(this.id, values)];
                    case 1:
                        ret = _a.sent();
                        id = ret.id;
                        if (id < 0) {
                            unique = this.controller.entity.unique;
                            if (unique !== undefined) {
                                for (_i = 0, unique_1 = unique; _i < unique_1.length; _i++) {
                                    u = unique_1[_i];
                                    this.vForm.setError(u, '不能重复');
                                }
                            }
                            return [2 /*return*/];
                        }
                        this.openPageElement(React.createElement(Page, { header: this.label + '提交成功', back: "none" },
                            React.createElement("div", { className: 'm-3' },
                                React.createElement("span", { className: "text-success" },
                                    React.createElement(FA, { name: 'check-circle', size: 'lg' }),
                                    " \u6210\u529F\u63D0\u4EA4\uFF01"),
                                React.createElement("div", { className: 'mt-5' },
                                    React.createElement(Button, { className: "mr-3", color: "primary", onClick: this.next }, "\u7EE7\u7EED\u5F55\u5165"),
                                    React.createElement(Button, { color: "primary", outline: true, onClick: this.finish }, "\u4E0D\u7EE7\u7EED")))));
                        this.event('item-changed', { id: this.id, values: values });
                        return [2 /*return*/];
                }
            });
        }); };
        return _this;
        //protected view = TuidNewPage;
    }
    VTuidEdit.prototype.showEntry = function (param) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.vForm = this.createForm(this.onSubmit, param);
                if (param !== undefined) {
                    this.id = param.id;
                }
                this.openPage(this.editView);
                return [2 /*return*/];
            });
        });
    };
    Object.defineProperty(VTuidEdit.prototype, "editView", {
        get: function () {
            var _this = this;
            return function () { return React.createElement(Page, { header: (_this.id === undefined ? '新增' : '编辑') + ' - ' + _this.label }, _this.vForm.render('py-3')); };
        },
        enumerable: true,
        configurable: true
    });
    VTuidEdit.prototype.resetForm = function () {
        this.vForm.reset();
    };
    return VTuidEdit;
}(VEntity));
export { VTuidEdit };
/*
const TuidNewPage = observer(({vm}:{vm:VmTuidEdit}) => {
    let {label, id, vmForm} = vm;
    return <Page header={(id===undefined? '新增':'编辑') + ' - ' + label}>
        {vmForm.render('mx-3 my-2')}
    </Page>;
});
*/ 
//# sourceMappingURL=vTuidEdit.js.map