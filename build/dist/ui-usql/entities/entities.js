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
//import {UsqlApi} from './usqlApi';
import { TuidMain } from './tuid';
import { Action } from './action';
import { Sheet } from './sheet';
import { Query } from './query';
import { Book } from './book';
import { History } from './history';
import { Map } from './map';
import { Pending } from './pending';
var Entities = /** @class */ (function () {
    function Entities(usq, usqApi, appId) {
        var _this = this;
        this.tuids = {};
        this.actions = {};
        this.sheets = {};
        this.queries = {};
        this.books = {};
        this.maps = {};
        this.histories = {};
        this.pendings = {};
        this.tuidArr = [];
        this.actionArr = [];
        this.sheetArr = [];
        this.queryArr = [];
        this.bookArr = [];
        this.mapArr = [];
        this.historyArr = [];
        this.pendingArr = [];
        this.loadIds = function () {
            _this.clearCacheTimer();
            for (var i in _this.tuids) {
                var tuid = _this.tuids[i];
                tuid.cacheIds();
            }
        };
        this.usq = usq;
        this.usqApi = usqApi;
        this.appId = appId;
    }
    Entities.prototype.tuid = function (name) { return this.tuids[name.toLowerCase()]; };
    Entities.prototype.action = function (name) { return this.actions[name.toLowerCase()]; };
    Entities.prototype.sheet = function (name) { return this.sheets[name.toLowerCase()]; };
    Entities.prototype.query = function (name) { return this.queries[name.toLowerCase()]; };
    Entities.prototype.book = function (name) { return this.books[name.toLowerCase()]; };
    Entities.prototype.map = function (name) { return this.maps[name.toLowerCase()]; };
    Entities.prototype.history = function (name) { return this.histories[name.toLowerCase()]; };
    Entities.prototype.pending = function (name) { return this.pendings[name.toLowerCase()]; };
    Entities.prototype.sheetFromTypeId = function (typeId) {
        for (var i in this.sheets) {
            var sheet = this.sheets[i];
            if (sheet.typeId === typeId)
                return sheet;
        }
    };
    Entities.prototype.loadAccess = function () {
        return __awaiter(this, void 0, void 0, function () {
            var accesses;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.usqApi.loadAccess()];
                    case 1:
                        accesses = _a.sent();
                        this.buildEntities(accesses);
                        return [2 /*return*/];
                }
            });
        });
    };
    Entities.prototype.loadEntities = function () {
        return __awaiter(this, void 0, void 0, function () {
            var accesses;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.usqApi.loadEntities()];
                    case 1:
                        accesses = _a.sent();
                        this.buildEntities(accesses);
                        return [2 /*return*/];
                }
            });
        });
    };
    Entities.prototype.buildEntities = function (entities) {
        var access = entities.access, tuids = entities.tuids;
        this.buildTuids(tuids);
        this.buildAccess(access);
    };
    Entities.prototype.getTuid = function (name, arr, tuidUrl) {
        var tuid = this.tuids[name];
        if (tuid === undefined)
            return;
        if (arr === undefined)
            return tuid;
        return tuid.divs[arr];
    };
    Entities.prototype.cacheTuids = function (defer) {
        this.clearCacheTimer();
        this.cacheTimer = setTimeout(this.loadIds, defer);
    };
    Entities.prototype.clearCacheTimer = function () {
        if (this.cacheTimer === undefined)
            return;
        clearTimeout(this.cacheTimer);
        this.cacheTimer = undefined;
    };
    Entities.prototype.buildTuids = function (tuids) {
        var proxyColl = {};
        for (var i in tuids) {
            var schema = tuids[i];
            var name_1 = schema.name, typeId = schema.typeId, proxies = schema.proxies;
            var tuid = this.newTuid(i, typeId);
            tuid.sys = true;
            //tuid.setSchema(schema);
            if (proxies !== undefined)
                proxyColl[i] = proxies;
        }
        for (var i in tuids) {
            var schema = tuids[i];
            var name_2 = schema.name;
            var tuid = this.getTuid(i);
            //tuid.sys = true;
            tuid.setSchema(schema);
        }
        for (var i in proxyColl) {
            var proxies = proxyColl[i];
            var tuid = this.tuids[i];
            tuid.proxies = {};
            for (var _i = 0, proxies_1 = proxies; _i < proxies_1.length; _i++) {
                var p = proxies_1[_i];
                tuid.proxies[p] = this.tuids[p];
            }
        }
    };
    Entities.prototype.buildAccess = function (access) {
        for (var a in access) {
            var v = access[a];
            switch (typeof v) {
                case 'string':
                    this.fromType(a, v);
                    break;
                case 'object':
                    this.fromObj(a, v);
                    break;
            }
        }
        /*
        for (let tuid of this.tuidArr) {
            tuid.setProxies(this);
        }*/
    };
    Entities.prototype.newAction = function (name, id) {
        var action = this.actions[name];
        if (action !== undefined)
            return action;
        action = this.actions[name] = new Action(this, name, id);
        this.actionArr.push(action);
        return action;
    };
    Entities.prototype.newTuid = function (name, id) {
        var tuid = this.tuids[name];
        if (tuid !== undefined)
            return tuid;
        tuid = this.tuids[name] = new TuidMain(this, name, id);
        this.tuidArr.push(tuid);
        return tuid;
    };
    Entities.prototype.newQuery = function (name, id) {
        var query = this.queries[name];
        if (query !== undefined)
            return query;
        query = this.queries[name] = new Query(this, name, id);
        this.queryArr.push(query);
        return query;
    };
    Entities.prototype.newBook = function (name, id) {
        var book = this.books[name];
        if (book !== undefined)
            return book;
        book = this.books[name] = new Book(this, name, id);
        this.bookArr.push(book);
        return book;
    };
    Entities.prototype.newMap = function (name, id) {
        var map = this.maps[name];
        if (map !== undefined)
            return map;
        map = this.maps[name] = new Map(this, name, id);
        this.mapArr.push(map);
        return map;
    };
    Entities.prototype.newHistory = function (name, id) {
        var history = this.histories[name];
        if (history !== undefined)
            return;
        history = this.histories[name] = new History(this, name, id);
        this.historyArr.push(history);
        return history;
    };
    Entities.prototype.newPending = function (name, id) {
        var pending = this.pendings[name];
        if (pending !== undefined)
            return;
        pending = this.pendings[name] = new Pending(this, name, id);
        this.pendingArr.push(pending);
        return pending;
    };
    Entities.prototype.newSheet = function (name, id) {
        var sheet = this.sheets[name];
        if (sheet !== undefined)
            return sheet;
        sheet = this.sheets[name] = new Sheet(this, name, id);
        this.sheetArr.push(sheet);
        return sheet;
    };
    Entities.prototype.fromType = function (name, type) {
        var parts = type.split('|');
        type = parts[0];
        var id = Number(parts[1]);
        switch (type) {
            case 'usq':
                this.usqId = id;
                break;
            case 'tuid':
                var tuid = this.newTuid(name, id);
                tuid.sys = false;
                break;
            case 'action':
                this.newAction(name, id);
                break;
            case 'query':
                this.newQuery(name, id);
                break;
            case 'book':
                this.newBook(name, id);
                break;
            case 'map':
                this.newMap(name, id);
                break;
            case 'history':
                this.newHistory(name, id);
                break;
            case 'sheet':
                this.newSheet(name, id);
                break;
            case 'pending':
                this.newPending(name, id);
                break;
        }
    };
    Entities.prototype.fromObj = function (name, obj) {
        switch (obj['$']) {
            case 'sheet':
                this.buildSheet(name, obj);
                break;
        }
    };
    Entities.prototype.buildSheet = function (name, obj) {
        var sheet = this.sheets[name];
        if (sheet === undefined)
            sheet = this.newSheet(name, obj.id);
        sheet.build(obj);
        /*
        let states = sheet.states;
        for (let p in obj) {
            switch(p) {
                case '#':
                case '$': continue;
                default: states.push(this.createSheetState(p, obj[p])); break;
            }
        }*/
    };
    /*
    private createSheetState(name:string, obj:object):SheetState {
        let ret:SheetState = {name:name, actions:[]};
        let actions = ret.actions;
        for (let p in obj) {
            let action:SheetAction = {name: p};
            actions.push(action);
        }
        return ret;
    }*/
    Entities.prototype.buildFieldTuid = function (fields, mainFields) {
        if (fields === undefined)
            return;
        for (var _i = 0, fields_1 = fields; _i < fields_1.length; _i++) {
            var f = fields_1[_i];
            var tuid = f.tuid, arr = f.arr, url = f.url;
            if (tuid === undefined)
                continue;
            f._tuid = this.getTuid(tuid, arr, url);
        }
        var _loop_1 = function (f) {
            var owner = f.owner;
            if (owner === undefined)
                return "continue";
            var ownerField = fields.find(function (v) { return v.name === owner; });
            if (ownerField === undefined) {
                if (mainFields !== undefined) {
                    ownerField = mainFields.find(function (v) { return v.name === owner; });
                }
                if (ownerField === undefined) {
                    throw "owner field " + owner + " is undefined";
                }
            }
            f._ownerField = ownerField;
            var arr = f.arr, url = f.url;
            f._tuid = this_1.getTuid(ownerField._tuid.name, arr, url);
            if (f._tuid === undefined)
                throw 'owner field ${owner} is not tuid';
        };
        var this_1 = this;
        for (var _a = 0, fields_2 = fields; _a < fields_2.length; _a++) {
            var f = fields_2[_a];
            _loop_1(f);
        }
    };
    Entities.prototype.buildArrFieldsTuid = function (arrFields, mainFields) {
        if (arrFields === undefined)
            return;
        for (var _i = 0, arrFields_1 = arrFields; _i < arrFields_1.length; _i++) {
            var af = arrFields_1[_i];
            var fields = af.fields;
            if (fields === undefined)
                continue;
            this.buildFieldTuid(fields, mainFields);
        }
    };
    return Entities;
}());
export { Entities };
//# sourceMappingURL=entities.js.map