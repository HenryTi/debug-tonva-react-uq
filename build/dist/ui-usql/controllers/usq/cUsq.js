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
import { UsqApi, Controller, UnitxApi, meInFrame, resLang, nav } from 'tonva-tools';
import { Entities } from '../../entities';
import { CLink } from '../link';
import { CBook } from '../book';
import { CSheet } from '../sheet';
import { CAction } from '../action';
import { CQuery, CQuerySelect } from '../query';
import { CTuidMain, CTuidInfo, CTuidSelect } from '../tuid';
import { CMap } from '../map';
import { PureJSONContent } from '../form/viewModel';
import { VUsq } from './vUsq';
import { CHistory } from '../history';
import { CPending } from '../pending';
function lowerPropertyName(entities) {
    if (entities === undefined)
        return;
    for (var i in entities)
        entities[i.toLowerCase()] = entities[i];
}
var CUsq = /** @class */ (function (_super) {
    __extends(CUsq, _super);
    function CUsq(usq, appId, usqId, access, ui) {
        var _this = _super.call(this, resLang(ui.res, nav.language, nav.culture)) || this;
        _this.isSysVisible = false;
        _this.usq = usq;
        _this.id = usqId;
        // 每一个ui都转换成小写的key的版本
        lowerPropertyName(ui.tuid);
        lowerPropertyName(ui.sheet);
        lowerPropertyName(ui.map);
        lowerPropertyName(ui.query);
        lowerPropertyName(ui.action);
        lowerPropertyName(ui.book);
        lowerPropertyName(ui.history);
        lowerPropertyName(ui.pending);
        _this.ui = ui;
        _this.CTuidMain = ui.CTuidMain || CTuidMain;
        _this.CTuidSelect = ui.CTuidSelect || CTuidSelect;
        _this.CTuidInfo = ui.CTuidInfo || CTuidInfo;
        _this.CQuery = ui.CQuery || CQuery;
        _this.CQuerySelect = ui.CQuerySelect || CQuerySelect;
        _this.CMap = ui.CMap || CMap;
        _this.CAction = ui.CAction || CAction;
        _this.CSheet = ui.CSheet || CSheet;
        _this.CBook = ui.CBook || CBook;
        _this.CHistory = ui.CHistory || CHistory;
        _this.CPending = ui.CPending || CPending;
        var token = undefined;
        var usqOwner, usqName;
        var p = usq.split('/');
        switch (p.length) {
            case 1:
                usqOwner = '$$$';
                usqName = p[0];
                break;
            case 2:
                usqOwner = p[0];
                usqName = p[1];
                break;
            default:
                console.log('usq must be usqOwner/usqName format');
                return;
        }
        var hash = document.location.hash;
        var baseUrl = hash === undefined || hash === '' ?
            'debug/' : 'tv/';
        var acc;
        if (access === undefined || access === '*') {
            acc = [];
        }
        else {
            acc = access.split(';').map(function (v) { return v.trim(); }).filter(function (v) { return v.length > 0; });
        }
        var usqApi;
        if (usq === '$$$/$unitx') {
            // 这里假定，点击home link之后，已经设置unit了
            // 调用 UnitxApi会自动搜索绑定 unitx service
            usqApi = new UnitxApi(meInFrame.unit);
        }
        else {
            usqApi = new UsqApi(baseUrl, usqOwner, usqName, acc, true);
        }
        _this.entities = new Entities(_this, usqApi, appId);
        return _this;
    }
    CUsq.prototype.internalStart = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    CUsq.prototype.loadEntites = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.entities.loadAccess()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CUsq.prototype.loadSchema = function () {
        return __awaiter(this, void 0, void 0, function () {
            var i, g, caption, collection, j, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.loadEntites()];
                    case 1:
                        _a.sent();
                        if (this.id === undefined)
                            this.id = this.entities.usqId;
                        for (i in this.ui) {
                            g = this.ui[i];
                            if (g === undefined)
                                continue;
                            caption = g.caption, collection = g.collection;
                            if (collection === undefined)
                                continue;
                            for (j in collection) {
                                if (this.entities[i](j) === undefined) {
                                    console.warn(i + ':' + '\'' + j + '\' is not usql entity');
                                }
                            }
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        console.error(err_1);
                        this.error = err_1;
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CUsq.prototype.getTuid = function (name) { return this.entities.tuid(name); };
    CUsq.prototype.getQuerySearch = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var query, returns;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = this.entities.query(name);
                        if (!(query === undefined)) return [3 /*break*/, 1];
                        alert("QUERY " + name + " \u6CA1\u6709\u5B9A\u4E49!");
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, query.loadSchema()];
                    case 2:
                        _a.sent();
                        returns = query.returns;
                        if (returns.length > 1) {
                            alert("QUERY " + name + " \u8FD4\u56DE\u591A\u5F20\u8868, \u65E0\u6CD5\u505AQuerySearch");
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/, query];
                }
            });
        });
    };
    CUsq.prototype.getTuidPlaceHolder = function (tuid) {
        var _a = this.res, tuidPlaceHolder = _a.tuidPlaceHolder, entity = _a.entity;
        var name = tuid.name;
        var type;
        if (entity !== undefined) {
            var en = entity[name];
            if (en !== undefined) {
                type = en.label;
            }
        }
        return (tuidPlaceHolder || 'Select');
    };
    CUsq.prototype.getNone = function () {
        var none = this.res.none;
        return none || 'none';
    };
    CUsq.prototype.isVisible = function (entity) {
        return entity.sys !== true || this.isSysVisible;
    };
    CUsq.prototype.navSheet = function (sheetTypeId, sheetId) {
        return __awaiter(this, void 0, void 0, function () {
            var sheet, cSheet;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sheet = this.entities.sheetFromTypeId(sheetTypeId);
                        if (sheet === undefined) {
                            alert('sheetTypeId ' + sheetTypeId + ' is not exists!');
                            return [2 /*return*/];
                        }
                        cSheet = this.cSheet(sheet);
                        return [4 /*yield*/, cSheet.startSheet(sheetId)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CUsq.prototype.cFromName = function (entityType, entityName) {
        switch (entityType) {
            case 'sheet':
                var sheet = this.entities.sheet(entityName);
                if (sheet === undefined)
                    return;
                return this.cSheet(sheet);
            case 'action':
                var action = this.entities.action(entityName);
                if (action === undefined)
                    return;
                return this.cAction(action);
            case 'tuid':
                var tuid = this.entities.tuid(entityName);
                if (tuid === undefined)
                    return;
                return this.cTuidMain(tuid);
            case 'query':
                var query = this.entities.query(entityName);
                if (query === undefined)
                    return;
                return this.cQuery(query);
            case 'book':
                var book = this.entities.book(entityName);
                if (book === undefined)
                    return;
                return this.cBook(book);
            case 'map':
                var map = this.entities.map(entityName);
                if (map === undefined)
                    return;
                return this.cMap(map);
            case 'history':
                var history_1 = this.entities.history(entityName);
                if (history_1 === undefined)
                    return;
                return this.cHistory(history_1);
            case 'pending':
                var pending_1 = this.entities.pending(entityName);
                if (pending_1 === undefined)
                    return;
                return this.cPending(pending_1);
        }
    };
    CUsq.prototype.linkFromName = function (entityType, entityName) {
        return this.link(this.cFromName(entityType, entityName));
    };
    CUsq.prototype.getUI = function (t) {
        var ui, res;
        var name = t.name, typeName = t.typeName;
        if (this.ui !== undefined) {
            var tUI = this.ui[typeName];
            if (tUI !== undefined) {
                ui = tUI[name];
            }
        }
        var entity = this.res.entity;
        if (entity !== undefined) {
            res = entity[name];
        }
        return { ui: ui || {}, res: res || {} };
    };
    CUsq.prototype.link = function (cEntity) {
        return new CLink(cEntity);
    };
    Object.defineProperty(CUsq.prototype, "tuidLinks", {
        get: function () {
            var _this = this;
            return this.entities.tuidArr.filter(function (v) { return _this.isVisible(v); }).map(function (v) { return _this.link(_this.cTuidMain(v)); });
        },
        enumerable: true,
        configurable: true
    });
    CUsq.prototype.cTuidMain = function (tuid) {
        var _a = this.getUI(tuid), ui = _a.ui, res = _a.res;
        return new (ui && ui.CTuidMain || this.CTuidMain)(this, tuid, ui, res);
    };
    CUsq.prototype.cTuidSelect = function (tuid) {
        var _a = this.getUI(tuid.owner || tuid), ui = _a.ui, res = _a.res;
        return new (ui && ui.CTuidSelect || this.CTuidSelect)(this, tuid, ui, res);
    };
    CUsq.prototype.cTuidInfo = function (tuid) {
        var _a = this.getUI(tuid), ui = _a.ui, res = _a.res;
        return new (ui && ui.CTuidInfo || this.CTuidInfo)(this, tuid, ui, res);
    };
    CUsq.prototype.cSheet = function (sheet /*, sheetUI?:SheetUI, sheetRes?:any*/) {
        var _a = this.getUI(sheet), ui = _a.ui, res = _a.res;
        //if (sheetUI !== undefined) ui = sheetUI;
        //if (sheetRes !== undefined) res = sheetRes;
        //return new (ui && ui.CSheet || this.CSheet)(this, sheet, sheetUI, sheetRes);
        return new (ui && ui.CSheet || this.CSheet)(this, sheet, ui, res);
    };
    Object.defineProperty(CUsq.prototype, "sheetLinks", {
        get: function () {
            var _this = this;
            return this.entities.sheetArr.filter(function (v) { return _this.isVisible(v); }).map(function (v) {
                return _this.link(_this.cSheet(v));
            });
        },
        enumerable: true,
        configurable: true
    });
    CUsq.prototype.cAction = function (action) {
        var _a = this.getUI(action), ui = _a.ui, res = _a.res;
        return new (ui && ui.CAction || this.CAction)(this, action, ui, res);
    };
    Object.defineProperty(CUsq.prototype, "actionLinks", {
        get: function () {
            var _this = this;
            return this.entities.actionArr.filter(function (v) { return _this.isVisible(v); }).map(function (v) {
                return _this.link(_this.cAction(v));
            });
        },
        enumerable: true,
        configurable: true
    });
    CUsq.prototype.cQuery = function (query) {
        var _a = this.getUI(query), ui = _a.ui, res = _a.res;
        return new (ui && ui.CQuery || this.CQuery)(this, query, ui, res);
    };
    CUsq.prototype.cQuerySelect = function (queryName) {
        var query = this.entities.query(queryName);
        if (query === undefined)
            return;
        var _a = this.getUI(query), ui = _a.ui, res = _a.res;
        return new (ui && ui.CQuerySelect || this.CQuerySelect)(this, query, ui, res);
    };
    Object.defineProperty(CUsq.prototype, "queryLinks", {
        get: function () {
            var _this = this;
            return this.entities.queryArr.filter(function (v) { return _this.isVisible(v); }).map(function (v) {
                return _this.link(_this.cQuery(v));
            });
        },
        enumerable: true,
        configurable: true
    });
    CUsq.prototype.cBook = function (book) {
        var _a = this.getUI(book), ui = _a.ui, res = _a.res;
        return new (ui && ui.CBook || this.CBook)(this, book, ui, res);
    };
    Object.defineProperty(CUsq.prototype, "bookLinks", {
        get: function () {
            var _this = this;
            return this.entities.bookArr.filter(function (v) { return _this.isVisible(v); }).map(function (v) {
                return _this.link(_this.cBook(v));
            });
        },
        enumerable: true,
        configurable: true
    });
    CUsq.prototype.cHistory = function (history) {
        var _a = this.getUI(history), ui = _a.ui, res = _a.res;
        return new (ui && ui.CHistory || this.CHistory)(this, history, ui, res);
    };
    Object.defineProperty(CUsq.prototype, "historyLinks", {
        get: function () {
            var _this = this;
            return this.entities.historyArr.filter(function (v) { return _this.isVisible(v); }).map(function (v) {
                return _this.link(_this.cHistory(v));
            });
        },
        enumerable: true,
        configurable: true
    });
    CUsq.prototype.cPending = function (pending) {
        var _a = this.getUI(pending), ui = _a.ui, res = _a.res;
        return new (ui && ui.CPending || this.CPending)(this, pending, ui, res);
    };
    Object.defineProperty(CUsq.prototype, "pendingLinks", {
        get: function () {
            var _this = this;
            return this.entities.pendingArr.filter(function (v) { return _this.isVisible(v); }).map(function (v) {
                return _this.link(_this.cPending(v));
            });
        },
        enumerable: true,
        configurable: true
    });
    CUsq.prototype.cMap = function (map) {
        var _a = this.getUI(map), ui = _a.ui, res = _a.res;
        return new (ui && ui.CMap || this.CMap)(this, map, ui, res);
    };
    Object.defineProperty(CUsq.prototype, "mapLinks", {
        get: function () {
            var _this = this;
            return this.entities.mapArr.filter(function (v) { return _this.isVisible(v); }).map(function (v) {
                return _this.link(_this.cMap(v));
            });
        },
        enumerable: true,
        configurable: true
    });
    CUsq.prototype.getTuidContent = function (tuid) {
        var owner = tuid.owner;
        if (owner === undefined) {
            var ui = this.getUI(tuid).ui;
            return (ui && ui.inputContent) || PureJSONContent;
        }
        else {
            var ui = this.getUI(owner).ui;
            return (ui && ui.divs && ui.divs[tuid.name].inputContent) || PureJSONContent;
        }
    };
    CUsq.prototype.showTuid = function (tuid, id) {
        return __awaiter(this, void 0, void 0, function () {
            var owner, c;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        owner = tuid.owner;
                        c = this.cTuidInfo(owner || tuid);
                        return [4 /*yield*/, c.start(id)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(CUsq.prototype, "VUsq", {
        get: function () { return VUsq; },
        enumerable: true,
        configurable: true
    });
    CUsq.prototype.render = function () {
        var v = new (this.VUsq)(this);
        return v.render();
    };
    return CUsq;
}(Controller));
export { CUsq };
//# sourceMappingURL=cUsq.js.map