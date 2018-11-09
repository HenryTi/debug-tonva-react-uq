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
import { observer } from 'mobx-react';
import className from 'classnames';
import { List, LMR, FA } from 'tonva-react-form';
import { Page } from 'tonva-tools';
import { VEntity } from '../VM';
var VMapMain = /** @class */ (function (_super) {
    __extends(VMapMain, _super);
    function VMapMain() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.itemRender = function (item, index) {
            return React.createElement(_this.ItemRow, { item: item });
        };
        _this.ItemRow = observer(function (_a) {
            var item = _a.item;
            var tuid = item.tuid, box = item.box, children = item.children, isLeaf = item.isLeaf, keyIndex = item.keyIndex, values = item.values;
            var keyUI = _this.controller.keyUIs[keyIndex];
            var keyContent = keyUI.content, valuesContent = keyUI.valuesContent, keyNone = keyUI.none;
            var add = React.createElement("button", { className: "btn btn-link btn-sm", onClick: function () { return _this.controller.addClick(item); } },
                React.createElement(FA, { name: "plus" }));
            var remove = React.createElement("button", { className: "btn btn-link btn-sm", onClick: function () { return _this.controller.removeClick(item); } },
                React.createElement(FA, { className: "text-info", name: "trash" }));
            var right;
            if (isLeaf === false) {
                if (keyIndex === 0)
                    right = add;
                else
                    right = React.createElement(React.Fragment, null,
                        remove,
                        " \u00A0 ",
                        add);
            }
            else if (keyIndex > 0) {
                right = remove;
            }
            var content, border, valuesView;
            if (isLeaf === true) {
                content = undefined; //<div className="ml-5">leaf</div>;
                if (values) {
                    valuesView = null; // 现在不显示values content了
                    //valuesView = (valuesContent || PureJSONContent)(values, this.x);
                }
            }
            else {
                border = "border-bottom";
                var none = keyNone && keyNone(_this.x);
                content = React.createElement(List, { className: "ml-4", items: children, item: { onClick: undefined, render: _this.itemRender }, none: none });
            }
            return React.createElement("div", { className: "d-flex flex-column" },
                React.createElement(LMR, { className: className('px-2', 'py-1', border), left: React.createElement("div", { className: "py-1" }, box.content(keyContent, _this.x)), right: right }, valuesView),
                content);
        });
        return _this;
    }
    VMapMain.prototype.showEntry = function (param) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.openPage(this.view);
                return [2 /*return*/];
            });
        });
    };
    Object.defineProperty(VMapMain.prototype, "view", {
        get: function () {
            var _this = this;
            return function () { return React.createElement(Page, { header: _this.label },
                React.createElement(List, { items: _this.controller.items, item: { className: 'my-2', onClick: undefined, render: _this.itemRender } })); };
        },
        enumerable: true,
        configurable: true
    });
    ;
    return VMapMain;
}(VEntity));
export { VMapMain };
//# sourceMappingURL=vMain.js.map