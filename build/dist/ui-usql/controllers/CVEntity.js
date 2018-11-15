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
import { VPage } from 'tonva-tools';
import { VForm, FormMode } from './form';
import { entityIcons } from './icons';
import { ControllerUsq } from './ControllerUsq';
var CEntity = /** @class */ (function (_super) {
    __extends(CEntity, _super);
    function CEntity(cUsq, entity, ui, res) {
        var _this = _super.call(this, cUsq, res) || this;
        Object.setPrototypeOf(_this.x, cUsq.x);
        var name = entity.name, typeName = entity.typeName;
        _this.entity = entity;
        //let entityUI = cUsq.getUI<T, UI>(entity);
        //let {ui, res} = entityUI;
        _this.ui = ui; // || entityUI.ui;
        _this.label = _this.res.label || name;
        _this.icon = entityIcons[typeName];
        return _this;
    }
    CEntity.prototype.beforeStart = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.prototype.beforeStart.call(this)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.entity.loadSchema()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CEntity.prototype.createForm = function (onSubmit, values, mode) {
        var options = this.buildFormOptions(mode);
        var ret = new VForm(options, onSubmit);
        ret.setValues(values);
        return ret;
    };
    CEntity.prototype.buildFormOptions = function (mode) {
        var _a = this.entity, fields = _a.fields, arrFields = _a.arrFields;
        var none, submitCaption, arrNewCaption, arrEditCaption, arrTitleNewButton;
        if (this.res !== undefined) {
            none = this.res['none'];
            submitCaption = this.res['submit'];
            arrNewCaption = this.res['arrNew'];
            arrEditCaption = this.res['arrEdit'];
            arrTitleNewButton = this.res['arrTitleNewButton'];
        }
        if (none === undefined) {
            none = this.cUsq.res['none'] || 'none';
        }
        if (submitCaption === undefined)
            submitCaption = this.cUsq.res['submit'] || 'Submit';
        if (arrNewCaption === undefined)
            arrNewCaption = this.cUsq.res['arrNew'] || 'New';
        if (arrEditCaption === undefined)
            arrEditCaption = this.cUsq.res['arrEdit'] || 'Edit';
        if (arrTitleNewButton === undefined)
            arrTitleNewButton = this.cUsq.res['arrTitleNewButton'];
        if (mode === undefined)
            mode = FormMode.new;
        var formUI = this.ui.form;
        var ret = {
            fields: fields,
            arrs: arrFields,
            ui: formUI,
            res: this.res || {},
            inputs: this.buildInputs(formUI),
            none: none,
            submitCaption: submitCaption,
            arrNewCaption: arrNewCaption,
            arrEditCaption: arrEditCaption,
            arrTitleNewButton: arrTitleNewButton,
            mode: mode,
        };
        return ret;
    };
    CEntity.prototype.buildInputs = function (formUI) {
        var _a = this.entity, fields = _a.fields, arrFields = _a.arrFields;
        var ret = {};
        this.buildFieldsInputs(ret, fields, undefined, formUI);
        if (arrFields !== undefined) {
            for (var _i = 0, arrFields_1 = arrFields; _i < arrFields_1.length; _i++) {
                var arr = arrFields_1[_i];
                var name_1 = arr.name, fields_1 = arr.fields;
                var items = formUI && formUI.items;
                this.buildFieldsInputs(ret, fields_1, name_1, items && items[name_1]);
            }
        }
        return ret;
    };
    CEntity.prototype.buildFieldsInputs = function (ret, fields, arr, formUI) {
        if (arr !== undefined) {
            var arrFieldInputs = ret[arr];
            if (arrFieldInputs === undefined) {
                ret[arr] = arrFieldInputs = {};
                ret = arrFieldInputs;
            }
        }
        for (var _i = 0, fields_2 = fields; _i < fields_2.length; _i++) {
            var field = fields_2[_i];
            var name_2 = field.name, _tuid = field._tuid;
            if (_tuid === undefined)
                continue;
            var fieldUI = formUI && formUI.items && formUI.items[name_2];
            ret[name_2] = {
                select: this.buildSelect(field, arr, fieldUI),
                content: this.buildContent(field, arr),
                placeHolder: this.cUsq.getTuidPlaceHolder(_tuid),
            };
        }
    };
    CEntity.prototype.buildSelect = function (field, arr, fieldUI) {
        var _this = this;
        return function (form, field, values) { return __awaiter(_this, void 0, void 0, function () {
            var _tuid, _ownerField, cTuidSelect, param, ret, id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _tuid = field._tuid, _ownerField = field._ownerField;
                        cTuidSelect = this.cUsq.cTuidSelect(_tuid);
                        param = undefined;
                        if (_ownerField !== undefined)
                            param = form.getValue(_ownerField.name);
                        if (fieldUI && fieldUI.autoList === true) {
                            console.log('select search set param=empty string');
                            param = '';
                        }
                        return [4 /*yield*/, cTuidSelect.call(param)];
                    case 1:
                        ret = _a.sent();
                        cTuidSelect.removeCeased(); // 清除已经废弃的顶部页面
                        if (ret === undefined)
                            return [2 /*return*/, undefined];
                        id = cTuidSelect.idFromItem(ret);
                        _tuid.useId(id);
                        return [2 /*return*/, id];
                }
            });
        }); };
    };
    CEntity.prototype.buildContent = function (field, arr) {
        return;
    };
    CEntity.prototype.cQuerySelect = function (queryName) {
        return this.cUsq.cQuerySelect(queryName);
    };
    return CEntity;
}(ControllerUsq));
export { CEntity };
var VEntity = /** @class */ (function (_super) {
    __extends(VEntity, _super);
    function VEntity(controller) {
        var _this = _super.call(this, controller) || this;
        _this.entity = controller.entity;
        _this.ui = controller.ui;
        return _this;
    }
    Object.defineProperty(VEntity.prototype, "label", {
        get: function () { return this.controller.label; },
        enumerable: true,
        configurable: true
    });
    //private _form_$: VForm;
    VEntity.prototype.createForm = function (onSubmit, values, mode) {
        //if (this._form_$ !== undefined) return this._form_$;
        return this.controller.createForm(onSubmit, values, mode);
    };
    return VEntity;
}(VPage));
export { VEntity };
//# sourceMappingURL=CVEntity.js.map