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
import { observable } from "mobx";
import { CEntity } from "../CVEntity";
import { VSheetMain } from "./vMain";
import { VSheetNew } from "./vNew";
import { VSheetEdit } from "./vEdit";
import { VSheetAction } from "./vSheetAction";
import { VSheetSchema } from "./vSchema";
import { VArchives } from "./vArchives";
import { VSheetList } from "./vList";
import { VArchived } from "./vArchived";
import { VSheetSaved } from "./vSaved";
import { VSheetProcessing } from "./vSheetProcessing";
var CSheet = /** @class */ (function (_super) {
    __extends(CSheet, _super);
    function CSheet() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.statesCount = observable.array([], { deep: true });
        _this.onSave = function (values, valuesWithBox) { return __awaiter(_this, void 0, void 0, function () {
            var ret;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.saveSheet(values, valuesWithBox)];
                    case 1:
                        ret = _a.sent();
                        this.ceasePage();
                        //this.openPage(this.finishedPage);
                        return [4 /*yield*/, this.showSaved(ret)];
                    case 2:
                        //this.openPage(this.finishedPage);
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        return _this;
        /*
        async getStateSheets(state:string, pageStart:number, pageSize:number):Promise<void> {
            this.curState = state;
            //this.stateSheets.clear();
            this.pageStateItems.items.clear();
            let ret = await this.entity.getStateSheets(state, pageStart, pageSize);
            //this.stateSheets.spliceWithArray(0, 0, ret);
            this.pageStateItems.items.spliceWithArray(0, 0, ret);
        }*/
    }
    CSheet.prototype.internalStart = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.pageStateItems = this.entity.createPageStateItems();
                        return [4 /*yield*/, this.showVPage(this.VSheetMain)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CSheet.prototype.onMessage = function (msg) {
        return __awaiter(this, void 0, void 0, function () {
            var type, body, from, to, push;
            return __generator(this, function (_a) {
                type = msg.type, body = msg.body, from = msg.from, to = msg.to, push = msg.push;
                if (type === 'sheet')
                    this.onSheet(from, to, body);
                return [2 /*return*/];
            });
        });
    };
    CSheet.prototype.onSheet = function (from, to, sheetData) {
        /*
        app:69
        date:"2018-10-18T21:59:15.000Z"
        discription:"订单 北京大学 金额99元"
        flow:0
        id:95
        name:"order"
        no:"181018000010"
        processing:0
        sheet:8
        state:"$"
        to:"[10]"
        user:10
        usq:58
        version:5
        */
        var me = this.user.id;
        var id = sheetData.id, preState = sheetData.preState, state = sheetData.state;
        console.log({ $: 'onSheet', from: from, to: to.join(','), id: id, preState: preState, state: state, me: me });
        if (from === me) {
            this.sheetActPreState(id, preState);
        }
        if (to.find(function (v) { return v === me; }) !== undefined) {
            this.sheetActState(id, state, sheetData);
        }
    };
    CSheet.prototype.sheetActPreState = function (id, preState) {
        this.changeStateCount(preState, -1);
        if (this.curState === undefined || this.curState !== preState)
            return;
        /*
        let index = this.stateSheets.findIndex(v => v.id === id);
        if (index>=0) {
            this.stateSheets.splice(index, 1);
        }*/
        var index = this.pageStateItems.items.findIndex(function (v) { return v.id === id; });
        if (index >= 0) {
            this.pageStateItems.items.splice(index, 1);
        }
    };
    CSheet.prototype.sheetActState = function (id, state, msg) {
        this.changeStateCount(state, 1);
        if (this.curState === undefined || this.curState !== state)
            return;
        /*
        if (this.stateSheets.findIndex(v => v.id === id) < 0) {
            this.stateSheets.push(msg);
        }
        */
        if (this.pageStateItems.items.findIndex(function (v) { return v.id === id; }) < 0) {
            this.pageStateItems.items.push(msg);
        }
    };
    CSheet.prototype.changeStateCount = function (state, delta) {
        if (state === undefined)
            return;
        var index = this.statesCount.findIndex(function (v) { return v.state === state; });
        console.log({ $: 'changeState', state: state, delta: delta, index: index });
        if (index < 0)
            return;
        var stateCount = this.statesCount[index];
        stateCount.count += delta;
        if (stateCount.count < 0)
            stateCount.count = 0;
    };
    Object.defineProperty(CSheet.prototype, "VSheetMain", {
        get: function () { return (this.ui && this.ui.main) || VSheetMain; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CSheet.prototype, "VSheetNew", {
        get: function () { return this.ui.sheetNew || VSheetNew; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CSheet.prototype, "VSheetSaved", {
        get: function () { return this.ui.sheetSaved || VSheetSaved; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CSheet.prototype, "VSheetEdit", {
        get: function () { return this.ui.sheetEdit || VSheetEdit; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CSheet.prototype, "VSheetSchema", {
        get: function () { return VSheetSchema; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CSheet.prototype, "VArchives", {
        get: function () { return VArchives; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CSheet.prototype, "VArchived", {
        get: function () { return VArchived; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CSheet.prototype, "VSheetList", {
        get: function () { return VSheetList; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CSheet.prototype, "VSheetAction", {
        get: function () { return this.ui.sheetAction || VSheetAction; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CSheet.prototype, "VSheetProcessing", {
        get: function () { return VSheetProcessing; },
        enumerable: true,
        configurable: true
    });
    CSheet.prototype.onEvent = function (type, value) {
        return __awaiter(this, void 0, void 0, function () {
            var c, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = type;
                        switch (_a) {
                            case 'new': return [3 /*break*/, 2];
                            case 'schema': return [3 /*break*/, 3];
                            case 'archives': return [3 /*break*/, 4];
                            case 'state': return [3 /*break*/, 5];
                            case 'archived': return [3 /*break*/, 6];
                            case 'action': return [3 /*break*/, 8];
                            case 'processing': return [3 /*break*/, 10];
                        }
                        return [3 /*break*/, 1];
                    case 1: return [2 /*return*/];
                    case 2:
                        c = this.VSheetNew;
                        return [3 /*break*/, 12];
                    case 3:
                        c = this.VSheetSchema;
                        return [3 /*break*/, 12];
                    case 4:
                        c = this.VArchives;
                        return [3 /*break*/, 12];
                    case 5:
                        this.curState = value.state;
                        c = this.VSheetList;
                        return [3 /*break*/, 12];
                    case 6: return [4 /*yield*/, this.showArchived(value)];
                    case 7:
                        _b.sent();
                        return [2 /*return*/];
                    case 8: return [4 /*yield*/, this.showAction(value)];
                    case 9:
                        _b.sent();
                        return [2 /*return*/];
                    case 10: return [4 /*yield*/, this.showProcessing(value)];
                    case 11:
                        _b.sent();
                        return [2 /*return*/];
                    case 12: return [4 /*yield*/, this.showVPage(c, value)];
                    case 13:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CSheet.prototype.startSheet = function (sheetId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.prototype.beforeStart.call(this)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.onEvent('action', sheetId)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CSheet.prototype.showAction = function (sheetId) {
        return __awaiter(this, void 0, void 0, function () {
            var sheetData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getSheetData(sheetId)];
                    case 1:
                        sheetData = _a.sent();
                        return [4 /*yield*/, this.showVPage(this.VSheetAction, sheetData)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CSheet.prototype.showProcessing = function (sheetId) {
        return __awaiter(this, void 0, void 0, function () {
            var sheetData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getSheetData(sheetId)];
                    case 1:
                        sheetData = _a.sent();
                        return [4 /*yield*/, this.showVPage(this.VSheetProcessing, sheetData)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CSheet.prototype.editSheet = function (sheetData) {
        return __awaiter(this, void 0, void 0, function () {
            var values;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.vCall(this.VSheetEdit, sheetData)];
                    case 1:
                        values = _a.sent();
                        return [2 /*return*/, values];
                }
            });
        });
    };
    CSheet.prototype.showArchived = function (inBrief) {
        return __awaiter(this, void 0, void 0, function () {
            var sheetData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getArchived(inBrief.id)];
                    case 1:
                        sheetData = _a.sent();
                        return [4 /*yield*/, this.showVPage(this.VArchived, sheetData)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CSheet.prototype.showSaved = function (sheetData) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.showVPage(this.VSheetSaved, sheetData)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CSheet.prototype.getStateUI = function (stateName) {
        var states = this.res.states;
        if (states === undefined)
            return;
        return states[stateName];
    };
    CSheet.prototype.getStateLabel = function (stateName) {
        var state = this.getStateUI(stateName);
        var ret = (state && state.label) || stateName;
        switch (ret) {
            default: return ret;
            case '$': return '新单';
        }
    };
    CSheet.prototype.getActionLabel = function (stateName, actionName) {
        var state = this.getStateUI(stateName);
        if (state === undefined)
            return actionName;
        var actions = state.actions;
        if (actions === undefined)
            return actionName;
        var action = actions[actionName];
        return (action && action.label) || actionName;
    };
    CSheet.prototype.getStateSheetCount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, statesCount;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.statesCount.clear();
                        return [4 /*yield*/, this.entity.stateSheetCount()];
                    case 1:
                        statesCount = _b.sent();
                        (_a = this.statesCount).splice.apply(_a, [0, 0].concat(statesCount));
                        return [2 /*return*/];
                }
            });
        });
    };
    CSheet.prototype.getSheetData = function (sheetId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.entity.getSheet(sheetId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CSheet.prototype.getArchived = function (sheetId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.entity.getArchive(sheetId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CSheet.prototype.saveSheet = function (values, valuesWithBox) {
        return __awaiter(this, void 0, void 0, function () {
            var sheetTitle, disc, ret;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sheetTitle = this.ui.sheetTitle;
                        disc = sheetTitle === undefined ? this.label : sheetTitle(valuesWithBox, this.x);
                        return [4 /*yield*/, this.entity.save(disc, values)];
                    case 1:
                        ret = _a.sent();
                        //let {id, state} = ret;
                        //if (id > 0) this.changeStateCount(state, 1);
                        return [2 /*return*/, ret];
                }
            });
        });
    };
    CSheet.prototype.action = function (id, flow, state, actionName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.entity.action(id, flow, state, actionName)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return CSheet;
}(CEntity));
export { CSheet };
//# sourceMappingURL=cSheet.js.map