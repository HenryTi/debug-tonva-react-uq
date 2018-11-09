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
import { Muted } from 'tonva-react-form';
import { left0 } from 'tonva-tools';
//import { dictionary as x } from '../../res';
import { VMapMain, CMap } from '../../../../ui-usql';
var CMapTeamPerson = /** @class */ (function (_super) {
    __extends(CMapTeamPerson, _super);
    function CMapTeamPerson() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CMapTeamPerson.prototype.searchOnKey = function (keyField, param) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = keyField.name;
                        switch (_a) {
                            case 'post': return [3 /*break*/, 3];
                        }
                        return [3 /*break*/, 1];
                    case 1: return [4 /*yield*/, _super.prototype.searchOnKey.call(this, keyField, param)];
                    case 2: return [2 /*return*/, _b.sent()];
                    case 3: return [4 /*yield*/, this.searchOnPost(param)];
                    case 4: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    CMapTeamPerson.prototype.searchOnPost = function (param) {
        return __awaiter(this, void 0, void 0, function () {
            var querySelect, val;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        querySelect = this.cQuerySelect('teamPosts');
                        return [4 /*yield*/, querySelect.call(param)];
                    case 1:
                        val = _a.sent();
                        return [2 /*return*/, val['post'].id];
                }
            });
        });
    };
    return CMapTeamPerson;
}(CMap));
var VMapTeamPerson = /** @class */ (function (_super) {
    __extends(VMapTeamPerson, _super);
    function VMapTeamPerson() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return VMapTeamPerson;
}(VMapMain));
var ui = {
    CMap: CMapTeamPerson,
    //label: '部门员工对照表',
    //main: VMapTeamPerson,
    keys: [
        {
            content: function (_a, x) {
                var name = _a.name, id = _a.id;
                return React.createElement(React.Fragment, null,
                    React.createElement(Muted, null, x.team),
                    " ",
                    name);
            },
            none: function (x) { return x.noStaff; },
        },
        {
            content: function (_a, x) {
                var name = _a.name, id = _a.id;
                return React.createElement(React.Fragment, null,
                    React.createElement(Muted, null, x.staff),
                    " ",
                    name,
                    " \u00A0 ",
                    React.createElement(Muted, null,
                        x.no,
                        " ",
                        left0(id, 4)));
            },
            none: function (x) { return x.noPost; },
        },
        {
            content: function (_a) {
                var x = _a.x, title = _a.title, id = _a.id;
                return React.createElement(React.Fragment, null,
                    React.createElement(Muted, null, x.post),
                    " ",
                    title);
            },
            none: undefined,
        },
    ]
};
export default ui;
//# sourceMappingURL=index.js.map