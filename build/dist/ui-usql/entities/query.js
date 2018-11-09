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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
import { observable } from 'mobx';
import { Entity } from './entity';
var Query = /** @class */ (function (_super) {
    __extends(Query, _super);
    function Query() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Query.prototype, "typeName", {
        get: function () { return 'query'; },
        enumerable: true,
        configurable: true
    });
    Query.prototype.setSchema = function (schema) {
        _super.prototype.setSchema.call(this, schema);
        var returns = schema.returns;
        this.returns = returns;
        this.isPaged = returns.find(function (v) { return v.name === '$page'; }) !== undefined;
    };
    Query.prototype.resetPage = function (size, params) {
        this.pageStart = undefined;
        this.pageSize = size;
        this.params = params;
        this.more = false;
        this.list = undefined;
    };
    Object.defineProperty(Query.prototype, "hasMore", {
        get: function () { return this.more; },
        enumerable: true,
        configurable: true
    });
    Query.prototype.loadPage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, pageStart, res, data, page, ret;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.pageSize === undefined) {
                            throw 'call resetPage(size:number, params:any) first';
                        }
                        if (this.pageStart !== undefined) {
                            switch (this.startField.type) {
                                default:
                                    pageStart = this.pageStart;
                                    break;
                                case 'date':
                                case 'time':
                                case 'datetime':
                                    pageStart = this.pageStart.getTime();
                                    break;
                            }
                        }
                        return [4 /*yield*/, this.loadSchema()];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, this.tvApi.page(this.name, pageStart, this.pageSize + 1, this.params)];
                    case 2:
                        res = _b.sent();
                        return [4 /*yield*/, this.unpackReturns(res)];
                    case 3:
                        data = _b.sent();
                        this.list = observable.array([], { deep: false });
                        page = data['$page'];
                        if (page !== undefined) {
                            if (page.length > this.pageSize) {
                                this.more = true;
                                page.pop();
                                ret = this.returns.find(function (r) { return r.name === '$page'; });
                                this.startField = ret.fields[0];
                                this.pageStart = page[page.length - 1][this.startField.name];
                            }
                            else {
                                this.more = false;
                            }
                            (_a = this.list).push.apply(_a, page);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Query.prototype.page = function (params, pageStart, pageSize) {
        return __awaiter(this, void 0, void 0, function () {
            var res, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadSchema()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.tvApi.page(this.name, pageStart, pageSize + 1, params)];
                    case 2:
                        res = _a.sent();
                        return [4 /*yield*/, this.unpackReturns(res)];
                    case 3:
                        data = _a.sent();
                        return [2 /*return*/, data.$page]; // as any[];
                }
            });
        });
    };
    Query.prototype.query = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var res, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadSchema()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.tvApi.query(this.name, params)];
                    case 2:
                        res = _a.sent();
                        return [4 /*yield*/, this.unpackReturns(res)];
                    case 3:
                        data = _a.sent();
                        return [2 /*return*/, data];
                }
            });
        });
    };
    __decorate([
        observable
    ], Query.prototype, "list", void 0);
    return Query;
}(Entity));
export { Query };
//# sourceMappingURL=query.js.map