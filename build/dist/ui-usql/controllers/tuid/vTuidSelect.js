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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
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
import { Page } from 'tonva-tools';
import { VEntity } from '../CVEntity';
import { SearchBox, List } from 'tonva-react-form';
import React from 'react';
import { RowContent } from '../form/viewModel';
import { observer } from 'mobx-react';
var VTuidSelect = /** @class */ (function (_super) {
    __extends(VTuidSelect, _super);
    function VTuidSelect() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.mainView = observer(function () {
            var header = React.createElement(SearchBox, { className: "mx-1 w-100", initKey: '', onSearch: _this.onSearchMain, placeholder: '搜索' + _this.label });
            return React.createElement(Page, { header: header, back: "close" },
                React.createElement(List, { items: _this.controller.PageItems.items, item: { render: _this.renderMainRow, onClick: _this.clickMainRow }, before: '搜索' + _this.label + '资料' }));
        });
        _this.onSearchMain = function (key) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.controller.searchMain(key)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        _this.renderMainRow = function (item, index) { return React.createElement(_this.mainRowContent, __assign({}, item)); };
        _this.clickMainRow = function (item) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.ceasePage();
                        if (this.controller.entity.owner === undefined) {
                            this.return(item);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.showDiv(this.entity.getIdFromObj(item))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        _this.divView = function (param) {
            return React.createElement(Page, { header: "\u9009\u62E9Div" },
                React.createElement(List, { items: param.items, item: { render: _this.renderDivRow, onClick: _this.clickDivRow } }));
        };
        _this.renderDivRow = function (item, index) { return React.createElement(_this.divRowContent, __assign({}, item)); };
        _this.clickDivRow = function (item) {
            _this.ceasePage();
            _this.return(item);
        };
        return _this;
    }
    VTuidSelect.prototype.showEntry = function (param) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(param === undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.showMain(param)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.showDiv(param)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    VTuidSelect.prototype.showMain = function (param) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.mainRowContent = this.ui.rowContent || RowContent;
                        return [4 /*yield*/, this.controller.searchMain(param)];
                    case 1:
                        _a.sent();
                        this.openPage(this.mainView);
                        return [2 /*return*/];
                }
            });
        });
    };
    VTuidSelect.prototype.showDiv = function (ownerValue) {
        return __awaiter(this, void 0, void 0, function () {
            var divs, divItems;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        divs = this.ui.divs;
                        if (divs !== undefined) {
                            this.divRowContent = divs[this.entity.name].rowContent;
                        }
                        if (this.divRowContent === undefined) {
                            this.divRowContent = RowContent;
                        }
                        return [4 /*yield*/, this.controller.getDivItems(ownerValue)];
                    case 1:
                        divItems = _a.sent();
                        this.openPage(this.divView, { items: divItems });
                        return [2 /*return*/];
                }
            });
        });
    };
    return VTuidSelect;
}(VEntity));
export { VTuidSelect };
//# sourceMappingURL=vTuidSelect.js.map