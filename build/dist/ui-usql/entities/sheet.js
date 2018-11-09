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
import { Entity } from './entity';
import { PageItems } from 'tonva-tools';
var Sheet = /** @class */ (function (_super) {
    __extends(Sheet, _super);
    function Sheet() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Sheet.prototype, "typeName", {
        get: function () { return 'sheet'; },
        enumerable: true,
        configurable: true
    });
    /*
    setStates(states: SheetState[]) {
        for (let state of states) {
            this.setStateAccess(this.states.find(s=>s.name==state.name), state);
        }
    }*/
    Sheet.prototype.setSchema = function (schema) {
        _super.prototype.setSchema.call(this, schema);
        this.states = schema.states;
    };
    Sheet.prototype.build = function (obj) {
        this.states = [];
        for (var _i = 0, _a = obj.ops; _i < _a.length; _i++) {
            var op = _a[_i];
            this.states.push({ name: op, actions: undefined });
        }
        /*
        for (let p in obj) {
            switch(p) {
                case '#':
                case '$': continue;
                default: this.states.push(this.createSheetState(p, obj[p])); break;
            }
        }*/
    };
    Sheet.prototype.createSheetState = function (name, obj) {
        var ret = { name: name, actions: [] };
        var actions = ret.actions;
        for (var p in obj) {
            var action = { name: p };
            actions.push(action);
        }
        return ret;
    };
    /*
    private setStateAccess(s:SheetState, s1:SheetState) {
        if (s === undefined) return;
        for (let action of s1.actions) {
            let acn = action.name;
            let ac = s.actions.find(a=>a.name === acn);
            if (ac === undefined) continue;
            s.actions.push(action);
        }
    }*/
    Sheet.prototype.save = function (discription, data) {
        return __awaiter(this, void 0, void 0, function () {
            var appId, text, ret;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        appId = this.entities.appId;
                        text = this.pack(data);
                        return [4 /*yield*/, this.tvApi.sheetSave(this.name, { app: appId, discription: discription, data: text })];
                    case 1:
                        ret = _a.sent();
                        return [2 /*return*/, ret];
                }
            });
        });
    };
    Sheet.prototype.action = function (id, flow, state, action) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.tvApi.sheetAction(this.name, { id: id, flow: flow, state: state, action: action })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Sheet.prototype.unpack = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var ret, brief, sheetData, flows;
            return __generator(this, function (_a) {
                ret = data[0];
                brief = ret[0];
                sheetData = this.unpackSheet(brief.data);
                flows = data[1];
                return [2 /*return*/, {
                        brief: brief,
                        data: sheetData,
                        flows: flows,
                    }];
            });
        });
    };
    Sheet.prototype.getSheet = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var ret;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.tvApi.getSheet(this.name, id)];
                    case 1:
                        ret = _a.sent();
                        if (!(ret[0].length === 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.getArchive(id)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3: return [4 /*yield*/, this.unpack(ret)];
                    case 4: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Sheet.prototype.getArchive = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var ret;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.tvApi.sheetArchive(this.name, id)];
                    case 1:
                        ret = _a.sent();
                        return [4 /*yield*/, this.unpack(ret)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Sheet.prototype.getArchives = function (pageStart, pageSize) {
        return __awaiter(this, void 0, void 0, function () {
            var ret;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.tvApi.sheetArchives(this.name, { pageStart: pageStart, pageSize: pageSize })];
                    case 1:
                        ret = _a.sent();
                        return [2 /*return*/, ret];
                }
            });
        });
    };
    Sheet.prototype.getStateSheets = function (state, pageStart, pageSize) {
        return __awaiter(this, void 0, void 0, function () {
            var ret;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.tvApi.stateSheets(this.name, { state: state, pageStart: pageStart, pageSize: pageSize })];
                    case 1:
                        ret = _a.sent();
                        return [2 /*return*/, ret];
                }
            });
        });
    };
    Sheet.prototype.createPageStateItems = function () { return new PageStateItems(this); };
    Sheet.prototype.stateSheetCount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ret;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.tvApi.stateSheetCount(this.name)];
                    case 1:
                        ret = _a.sent();
                        return [2 /*return*/, this.states.map(function (s) {
                                var n = s.name, count = 0;
                                var r = ret.find(function (v) { return v.state === n; });
                                if (r !== undefined)
                                    count = r.count;
                                return { state: n, count: count };
                            })];
                }
            });
        });
    };
    return Sheet;
}(Entity));
export { Sheet };
var PageStateItems = /** @class */ (function (_super) {
    __extends(PageStateItems, _super);
    function PageStateItems(sheet) {
        var _this = _super.call(this, true) || this;
        _this.sheet = sheet;
        _this.pageSize = 10;
        return _this;
    }
    PageStateItems.prototype.load = function (param, pageStart, pageSize) {
        return __awaiter(this, void 0, void 0, function () {
            var ret;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sheet.getStateSheets(param, pageStart, pageSize)];
                    case 1:
                        ret = _a.sent();
                        return [2 /*return*/, ret];
                }
            });
        });
    };
    PageStateItems.prototype.setPageStart = function (item) {
        this.pageStart = item === undefined ? 0 : item.id;
    };
    return PageStateItems;
}(PageItems));
export { PageStateItems };
//# sourceMappingURL=sheet.js.map