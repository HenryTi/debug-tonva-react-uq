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
var tab = '\t';
var ln = '\n';
var Entity = /** @class */ (function () {
    function Entity(entities, name, typeId) {
        this.entities = entities;
        this.name = name;
        this.typeId = typeId;
        this.sys = this.name.indexOf('$') >= 0;
    }
    Object.defineProperty(Entity.prototype, "sName", {
        get: function () { return this.jName || this.name; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "tvApi", {
        get: function () { return this.entities.usqApi; },
        enumerable: true,
        configurable: true
    });
    Entity.prototype.loadSchema = function () {
        return __awaiter(this, void 0, void 0, function () {
            var schema;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.schema !== undefined)
                            return [2 /*return*/];
                        return [4 /*yield*/, this.entities.usqApi.schema(this.name)];
                    case 1:
                        schema = _a.sent();
                        this.setSchema(schema);
                        return [2 /*return*/];
                }
            });
        });
    };
    Entity.prototype.setSchema = function (schema) {
        if (schema === undefined)
            return;
        if (this.schema !== undefined)
            return;
        this.schema = schema;
        var name = schema.name, fields = schema.fields, arrs = schema.arrs, returns = schema.returns;
        if (name !== this.name)
            this.jName = name;
        this.entities.buildFieldTuid(this.fields = fields);
        this.entities.buildArrFieldsTuid(this.arrFields = arrs, fields);
        this.entities.buildArrFieldsTuid(this.returns = returns, fields);
        //this.newMain = this.buildCreater(fields);
        //this.newArr = this.buildArrCreater(arrs);
        //this.newRet = this.buildArrCreater(returns);
    };
    Entity.prototype.schemaStringify = function () {
        return JSON.stringify(this.schema, function (key, value) {
            if (key === '_tuid')
                return undefined;
            return value;
        }, 4);
    };
    Entity.prototype.getTuid = function (field) {
        var _tuid = field._tuid, tuid = field.tuid;
        if (tuid === undefined)
            return;
        if (_tuid !== undefined)
            return _tuid;
        return field._tuid = this.entities.getTuid(tuid, undefined);
    };
    Entity.prototype.getTuidFromName = function (fieldName, arrName) {
        if (this.schema === undefined)
            return;
        var _a = this.schema, fields = _a.fields, arrs = _a.arrs;
        var entities = this.entities;
        function getTuid(fn, fieldArr) {
            if (fieldArr === undefined)
                return;
            var f = fieldArr.find(function (v) { return v.name === fn; });
            if (f === undefined)
                return;
            return entities.getTuid(f.tuid, undefined);
        }
        var fn = fieldName.toLowerCase();
        if (arrName === undefined)
            return getTuid(fn, fields);
        if (arrs === undefined)
            return;
        var an = arrName.toLowerCase();
        var arr = arrs.find(function (v) { return v.name === an; });
        if (arr === undefined)
            return;
        return getTuid(fn, arr.fields);
    };
    Entity.prototype.pack = function (data) {
        var ret = [];
        //if (schema === undefined || data === undefined) return;
        var fields = this.fields;
        if (fields !== undefined)
            this.packRow(ret, fields, data);
        var arrs = this.arrFields; //schema['arrs'];
        if (arrs !== undefined) {
            for (var _i = 0, arrs_1 = arrs; _i < arrs_1.length; _i++) {
                var arr = arrs_1[_i];
                this.packArr(ret, arr.fields, data[arr.name]);
            }
        }
        return ret.join('');
    };
    Entity.prototype.escape = function (d) {
        switch (typeof d) {
            default: return d;
            case 'object': return d.id;
            case 'string':
                var len = d.length;
                var r = '', p = 0;
                for (var i = 0; i < len; i++) {
                    var c = d.charCodeAt(i);
                    switch (c) {
                        case 9:
                            r += d.substring(p, i) + '\\t';
                            p = i + 1;
                            break;
                        case 10:
                            r += d.substring(p, i) + '\\n';
                            p = i + 1;
                            break;
                    }
                }
                return r + d.substring(p);
            case 'undefined': return '';
        }
    };
    Entity.prototype.packRow = function (result, fields, data) {
        var len = fields.length;
        if (len === 0)
            return;
        var ret = '';
        ret += this.escape(data[fields[0].name]);
        for (var i = 1; i < len; i++) {
            var f = fields[i];
            ret += tab + this.escape(data[f.name]);
        }
        result.push(ret + ln);
    };
    Entity.prototype.packArr = function (result, fields, data) {
        if (data !== undefined) {
            for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                var row = data_1[_i];
                this.packRow(result, fields, row);
            }
        }
        result.push(ln);
    };
    Entity.prototype.unpackSheet = function (data) {
        var ret = {}; //new this.newMain();
        //if (schema === undefined || data === undefined) return;
        var fields = this.fields;
        var p = 0;
        if (fields !== undefined)
            p = this.unpackRow(ret, fields, data, p);
        var arrs = this.arrFields; //schema['arrs'];
        if (arrs !== undefined) {
            for (var _i = 0, arrs_2 = arrs; _i < arrs_2.length; _i++) {
                var arr = arrs_2[_i];
                p = this.unpackArr(ret, arr, data, p);
            }
        }
        return ret;
    };
    Entity.prototype.unpackReturns = function (data) {
        var ret = {};
        //if (schema === undefined || data === undefined) return;
        //let fields = schema.fields;
        var p = 0;
        //if (fields !== undefined) p = unpackRow(ret, schema.fields, data, p);
        var arrs = this.returns; //schema['returns'];
        if (arrs !== undefined) {
            for (var _i = 0, arrs_3 = arrs; _i < arrs_3.length; _i++) {
                var arr = arrs_3[_i];
                //let creater = this.newRet[arr.name];
                p = this.unpackArr(ret, arr, data, p);
            }
        }
        return ret;
    };
    Entity.prototype.unpackRow = function (ret, fields, data, p) {
        var ch0 = 0, ch = 0, c = p, i = 0, len = data.length, fLen = fields.length;
        for (; p < len; p++) {
            ch0 = ch;
            ch = data.charCodeAt(p);
            if (ch === 9) {
                var f = fields[i];
                if (ch0 !== 8) {
                    var v = data.substring(c, p);
                    ret[f.name] = this.to(ret, v, f);
                }
                else {
                    var s = null;
                }
                c = p + 1;
                ++i;
                if (i >= fLen)
                    break;
            }
            else if (ch === 10) {
                var f = fields[i];
                if (ch0 !== 8) {
                    var v = data.substring(c, p);
                    ret[f.name] = this.to(ret, v, f);
                }
                else {
                    var s = null;
                }
                ++p;
                ++i;
                break;
            }
        }
        return p;
    };
    Entity.prototype.to = function (ret, v, f) {
        switch (f.type) {
            default: return v;
            case 'datetime':
            case 'date':
            case 'time':
                var date = new Date(Number(v));
                return date;
            case 'tinyint':
            case 'smallint':
            case 'int':
            case 'dec': return Number(v);
            case 'bigint':
                var id = Number(v);
                var _tuid = f._tuid;
                if (_tuid === undefined)
                    return id;
                _tuid.useId(id, true);
                //let val = _tuid.valueFromId(id);
                //return val.obj || val;
                return _tuid.boxId(id);
            /*
            if (tuidKey !== undefined) {
                let tuid = f._tuid;
                if (tuid === undefined) {
                    // 在JSON.stringify中间不会出现
                    Object.defineProperty(f, '_tuid', {value:'_tuid', writable: true});
                    f._tuid = tuid = this.getTuid(tuidKey, tuidUrl);
                }
                tuid.useId(Number(v), true);
            }*/
            //return Number(v);
        }
    };
    Entity.prototype.unpackArr = function (ret, arr, data, p) {
        var vals = [], len = data.length;
        var name = arr.name, fields = arr.fields;
        while (p < len) {
            var ch = data.charCodeAt(p);
            if (ch === 10) {
                ++p;
                break;
            }
            var val = {}; //new creater();
            vals.push(val);
            p = this.unpackRow(val, fields, data, p);
        }
        ret[name] = vals;
        return p;
    };
    return Entity;
}());
export { Entity };
//# sourceMappingURL=entity.js.map