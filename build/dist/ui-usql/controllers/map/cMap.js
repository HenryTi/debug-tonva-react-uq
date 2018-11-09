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
import _ from 'lodash';
import { CEntity } from "../VM";
import { VMapMain } from "./vMain";
import { observable } from "mobx";
import { PureJSONContent } from '../form/viewModel';
import { VInputValues } from './inputValues';
var MapItem = /** @class */ (function () {
    function MapItem(parent, tuid, box, keyIndex) {
        this.children = observable.array([], { deep: true });
        this.parent = parent;
        this.tuid = tuid;
        this.box = box;
        this.keyIndex = keyIndex;
        this.isLeaf = false;
    }
    return MapItem;
}());
export { MapItem };
var CMap = /** @class */ (function (_super) {
    __extends(CMap, _super);
    function CMap() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.addClick = function (item) { return __awaiter(_this, void 0, void 0, function () {
            var keyIndex, children, keysLen, keysLast, idx, keyField, kn, tuid, searchParam, data, p, ki, box, kn_1, id, idBox, arr1, values, ret, i, i, rowIndex, fields, row;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        keyIndex = item.keyIndex, children = item.children;
                        keysLen = this.keyFields.length;
                        keysLast = keysLen - 1;
                        idx = keyIndex + 1;
                        if (idx >= keysLen)
                            return [2 /*return*/];
                        keyField = this.keyFields[idx];
                        kn = keyField.name;
                        tuid = keyField._tuid;
                        searchParam = {};
                        data = {};
                        for (p = item; p !== undefined; p = p.parent) {
                            ki = p.keyIndex, box = p.box;
                            kn_1 = this.keyFields[ki].name;
                            searchParam[kn_1] = data['_' + kn_1] = box.id;
                        }
                        return [4 /*yield*/, this.searchOnKey(keyField, searchParam)];
                    case 1:
                        id = _a.sent();
                        if (id === undefined || id <= 0)
                            return [2 /*return*/];
                        tuid.useId(id);
                        idBox = tuid.boxId(id);
                        arr1 = {};
                        values = {};
                        if (!(keyIndex + 1 === keysLast)) return [3 /*break*/, 4];
                        tuid.useId(id);
                        values[kn] = arr1['_' + kn] = idBox;
                        if (!(this.entity.fields.length > 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.vCall(VInputValues, data)];
                    case 2:
                        ret = _a.sent();
                        for (i in ret) {
                            values[i] = arr1['_' + i] = ret[i];
                        }
                        _a.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        values[kn] = data['_' + kn] = idBox;
                        for (i = idx + 1; i < keysLast; i++)
                            data['_' + this.keyFields[i].name] = 0;
                        arr1['_' + this.keyFields[keysLast].name] = 0;
                        _a.label = 5;
                    case 5:
                        data.arr1 = [arr1];
                        return [4 /*yield*/, this.entity.actions.add.submit(data)];
                    case 6:
                        _a.sent();
                        rowIndex = children.findIndex(function (v) { return v.box.id === id; });
                        if (rowIndex < 0) {
                            children.push(this.createItem(item, tuid, idBox, idx, values));
                        }
                        else {
                            fields = this.entity.fields;
                            if (fields !== undefined && fields.length > 0) {
                                row = children[rowIndex];
                                children.splice(rowIndex, 1);
                                row.values = values;
                                /*
                                for (let f of fields) {
                                    let {name:fn} = f;
                                    row.values[fn] = values[fn];
                                }*/
                                children.splice(rowIndex, 0, row);
                            }
                        }
                        this.removeCeased();
                        return [2 /*return*/];
                }
            });
        }); };
        _this.removeClick = function (item) { return __awaiter(_this, void 0, void 0, function () {
            var keyField, tuid, cTuidMain, label, confirmDelete, map, data, arr1, v0, p, ki, len, i, k, children, index;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        keyField = this.keyFields[item.keyIndex];
                        tuid = keyField._tuid;
                        cTuidMain = this.cUsq.cTuidMain(tuid.Main);
                        label = cTuidMain.getLable(tuid);
                        confirmDelete = this.res.confirmDelete
                            || _.template('do you really want to remove ${label}?');
                        if (confirm(confirmDelete({ label: label })) === false)
                            return [2 /*return*/];
                        map = this.entity;
                        data = {};
                        arr1 = data['arr1'] = [];
                        v0 = {};
                        arr1.push(v0);
                        for (p = item; p !== undefined; p = p.parent) {
                            ki = p.keyIndex;
                            v0['_' + this.keyFields[ki].name] = p.box.id;
                        }
                        len = this.keyFields.length;
                        for (i = item.keyIndex + 1; i < len; i++) {
                            k = this.keyFields[i];
                            v0['_' + k.name] = -1;
                        }
                        return [4 /*yield*/, map.actions.del.submit(data)];
                    case 1:
                        _a.sent();
                        children = item.parent.children;
                        index = children.findIndex(function (v) { return v === item; });
                        if (index >= 0)
                            children.splice(index, 1);
                        return [2 /*return*/];
                }
            });
        }); };
        return _this;
        /*
        async submit(values:any) {
            return this.entity.submit(values);
        }*/
    }
    CMap.prototype.internalStart = function () {
        return __awaiter(this, void 0, void 0, function () {
            var keys, q, result, ret, keysLen, retFields, i, item, _i, ret_1, r, newItem;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        keys = this.entity.keys;
                        q = this.entity.queries.all;
                        return [4 /*yield*/, q.query({})];
                    case 1:
                        result = _a.sent();
                        ret = result.ret;
                        keysLen = keys.length;
                        this.keyUIs = _.clone(this.ui.keys || []);
                        this.keyFields = [];
                        retFields = q.returns[0].fields;
                        for (i = 0; i < keysLen; i++) {
                            this.keyFields.push(retFields[i]);
                            if (i >= this.keyUIs.length) {
                                this.keyUIs.push({
                                    content: PureJSONContent,
                                });
                            }
                        }
                        this.items = observable([]);
                        item = undefined;
                        for (_i = 0, ret_1 = ret; _i < ret_1.length; _i++) {
                            r = ret_1[_i];
                            newItem = this.addItem(item, r);
                            if (newItem !== undefined) {
                                this.items.push(newItem);
                                item = newItem;
                            }
                        }
                        return [4 /*yield*/, this.showVPage(this.VMapMain)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CMap.prototype.createItem = function (parent, tuid, box, keyIndex, values) {
        var item = new MapItem(parent, tuid, box, keyIndex);
        if (keyIndex === this.keyFields.length - 1) {
            item.isLeaf = true;
            item.values = values;
        }
        return item;
    };
    CMap.prototype.addItem = function (item, row) {
        var ret = undefined;
        var keysLen = this.keyFields.length;
        var p = item;
        for (var i = 0; i < keysLen; i++) {
            var key = this.keyFields[i];
            var name_1 = key.name;
            var tuid = key._tuid;
            var val = row[name_1];
            if (val === undefined)
                break;
            var id = val.id;
            if (i === 0) {
                if (id === 0)
                    continue;
                if (p === undefined || p.box.id !== id) {
                    ret = p = this.createItem(undefined, tuid, val, i, row);
                }
                continue;
            }
            var children = p.children, box = p.box;
            var len = children.length;
            if (len > 0) {
                var n = children[len - 1];
                if (n.box.id === id) {
                    p = n;
                    continue;
                }
            }
            if (id > 0) {
                children.push(p = this.createItem(p, tuid, val, i, row));
            }
        }
        return ret;
    };
    CMap.prototype.searchOnKey = function (keyField, param) {
        return __awaiter(this, void 0, void 0, function () {
            var _tuid, _ownerField, cTuidSelect, callParam, ret;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _tuid = keyField._tuid, _ownerField = keyField._ownerField;
                        cTuidSelect = this.cUsq.cTuidSelect(_tuid);
                        callParam = param;
                        if (_ownerField !== undefined) {
                            callParam = param[_ownerField.name];
                            if (typeof callParam === 'object') {
                                callParam = callParam.id;
                            }
                        }
                        return [4 /*yield*/, cTuidSelect.call(callParam)];
                    case 1:
                        ret = _a.sent();
                        return [2 /*return*/, _tuid.getIdFromObj(ret)];
                }
            });
        });
    };
    Object.defineProperty(CMap.prototype, "VMapMain", {
        get: function () { return VMapMain; },
        enumerable: true,
        configurable: true
    });
    return CMap;
}(CEntity));
export { CMap };
//# sourceMappingURL=cMap.js.map