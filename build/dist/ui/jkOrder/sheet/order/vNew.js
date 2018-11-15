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
import { Page } from 'tonva-tools';
import { List } from 'tonva-react-form';
import { VEntity } from '../../../../ui-usql';
var VSheetNew = /** @class */ (function (_super) {
    __extends(VSheetNew, _super);
    function VSheetNew() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onSubmit = function () { return __awaiter(_this, void 0, void 0, function () {
            var values, valuesWithBox;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        values = this.vForm.getValues();
                        valuesWithBox = this.vForm.values;
                        //let ret = 
                        return [4 /*yield*/, this.controller.onSave(values, valuesWithBox)];
                    case 1:
                        //let ret = 
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        /*
        protected view = () => <Page header={this.label}>
            {this.vForm.render()}
        </Page>;
        */
        _this.addRow = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.selectProduct()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        _this.step1Next = function () { return __awaiter(_this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.ceasePage();
                        _a = this;
                        return [4 /*yield*/, this.cCustomerSelect.call('')];
                    case 1:
                        _a.customer = _b.sent();
                        this.openPage(this.orderPage);
                        this.openPage(this.customerPage);
                        return [2 /*return*/];
                }
            });
        }); };
        _this.conformOrder = function () { return __awaiter(_this, void 0, void 0, function () {
            var entity;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.ceasePage();
                        entity = this.cCustomerSelect.entity;
                        entity.useId(this.customer.id);
                        this.vForm.setValue('customer', entity.boxId(this.customer.id));
                        return [4 /*yield*/, this.selectProduct()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        _this.addProductRows = function (_a) {
            var product = _a.product, packRows = _a.packRows;
            return __awaiter(_this, void 0, void 0, function () {
                var entity, packEntity, vArr, list, _i, packRows_1, packRow, pack, price, quantity, amount;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            entity = this.cProductSelect.entity;
                            entity.useId(product);
                            packEntity = entity.divs['pack'];
                            vArr = this.vForm.vArrs['products'];
                            list = vArr.list;
                            for (_i = 0, packRows_1 = packRows; _i < packRows_1.length; _i++) {
                                packRow = packRows_1[_i];
                                pack = packRow.pack, price = packRow.price, quantity = packRow.quantity, amount = packRow.amount;
                                //packEntity.useId(pack);
                                list.push({
                                    product: entity.boxId(product),
                                    pack: pack,
                                    price: price,
                                    quantity: quantity,
                                    amount: amount,
                                });
                            }
                            this.product = undefined;
                            return [4 /*yield*/, this.selectProduct()];
                        case 1:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        _this.selectProduct = function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.cProductSelect.call()];
                    case 1:
                        _a.product = _c.sent();
                        _b = this;
                        return [4 /*yield*/, this.getPrices(this.product.id)];
                    case 2:
                        _b.priceRows = _c.sent();
                        //this.showVPage(VProductPage, {product:this.product, priceRows: prices});
                        this.openPage(this.productPage);
                        return [2 /*return*/];
                }
            });
        }); };
        _this.stopOrder = function () {
            _this.closePage();
        };
        /*
        private onSubmit = async () => {
            let values = this.form.getValues();
            let valuesWithBox = this.form.values;
            //let ret = await this.saveSheet(values, this.form.values);
            await this.controller.onSave(values, valuesWithBox)
            //alert('[' + this.label + '] 已保存: ' + jsonStringify(ret));
            this.ceasePage();
            //this.openPage(<this.finishedPage />);
            //await this.showSaved(ret);
        }
        */
        _this.step1SelectCustomer = function () {
            return React.createElement(Page, { header: "\u65B0\u5EFA\u8BA2\u5355" },
                React.createElement("div", { className: "p-3 d-flex align-items-center flex-column" }, _this.x.top()),
                React.createElement("div", { className: "p-3 d-flex justify-content-center" },
                    React.createElement("button", { className: "w-25 btn btn-primary", onClick: _this.step1Next }, "\u5F00\u59CB")));
        };
        _this.customerPage = function () {
            return React.createElement(Page, { header: "\u786E\u8BA4\u5BA2\u6237" },
                React.createElement("div", { className: "p-3" }, "\u5BA2\u6237\u8BE6\u60C5\uFF0C\u4FE1\u7528\uFF0C\u6536\u8D27\u5730\u5740\uFF0C\u6536\u6B3E\u4FE1\u606F\uFF0C\u7B49\u7B49"),
                _this.cCustomerSelect.createForm(undefined, _this.customer).render(),
                React.createElement("div", { className: "p-3 d-flex justify-content-center" },
                    React.createElement("button", { className: "w-25 btn btn-primary", onClick: _this.conformOrder }, "\u786E\u8BA4\u5F00\u5355"),
                    React.createElement("button", { className: "mx-3 btn btn-outline-secondary", onClick: _this.stopOrder }, "\u62D2\u7EDD")));
        };
        _this.orderPage = function () {
            return React.createElement(Page, { header: _this.x.detail }, _this.vForm.render());
        };
        _this.inputs = {};
        _this.addProduct = function () { return __awaiter(_this, void 0, void 0, function () {
            var packRows, _i, _a, priceRow, pack, retail, quantity, packRow;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.ceasePage();
                        packRows = [];
                        for (_i = 0, _a = this.priceRows; _i < _a.length; _i++) {
                            priceRow = _a[_i];
                            pack = priceRow.pack, retail = priceRow.retail;
                            quantity = Number.parseFloat(this.inputs[pack.id].value);
                            if (Number.isNaN(quantity))
                                continue;
                            packRow = {
                                pack: pack,
                                quantity: quantity,
                                price: retail,
                                amount: retail * quantity,
                            };
                            packRows.push(packRow);
                        }
                        return [4 /*yield*/, this.addProductRows({
                                product: this.product.id,
                                packRows: packRows
                            })];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        _this.refQuantity = function (input, packId) {
            _this.inputs[packId] = input;
        };
        _this.renderPack = function (packRow, index) {
            var pack = packRow.pack, retail = packRow.retail;
            return React.createElement("div", { className: "px-3 py-1 d-flex" },
                React.createElement("div", { className: "row py-1 align-items-center flex-fill" },
                    React.createElement("div", { className: "col-sm-6" }, pack.content()),
                    React.createElement("div", { className: "col-sm-6" },
                        React.createElement("div", { className: "row align-items-center" },
                            React.createElement("div", { className: "col-6 text-sm-right" },
                                React.createElement("span", { className: "text-danger" }, retail),
                                " \u5143"),
                            React.createElement("div", { className: "col-6" },
                                React.createElement("input", { className: "text-center form-control form-control-sm", ref: function (input) { return _this.refQuantity(input, pack.id); }, type: "number", min: 0 }))))));
        };
        _this.productPage = function () {
            var discription = _this.product.discription;
            return React.createElement(Page, { header: "\u9009\u5B9A\u4EA7\u54C1" },
                React.createElement("div", { className: "p-3 text-primary bg-white my-3" }, discription),
                React.createElement(List, { items: _this.priceRows, item: { render: _this.renderPack } }),
                React.createElement("div", { className: "p-3 d-flex justify-content-center" },
                    React.createElement("button", { className: "w-25 btn btn-primary", onClick: _this.addProduct }, "\u52A0\u5165\u8BA2\u5355")));
        };
        return _this;
    }
    //private vSheetNew: VSheetNew;
    VSheetNew.prototype.showEntry = function (param) {
        return __awaiter(this, void 0, void 0, function () {
            var cUsq, customer, product, productsBand;
            return __generator(this, function (_a) {
                cUsq = this.controller.cUsq;
                this.mapPrice = cUsq.entities.map('price');
                customer = cUsq.entities.tuid('customer');
                this.cCustomerSelect = cUsq.cTuidSelect(customer);
                product = cUsq.entities.tuid('product');
                this.cProductSelect = cUsq.cTuidSelect(product);
                this.vForm = this.createForm(this.onSubmit, param);
                productsBand = this.vForm.getBand('products');
                productsBand.setAddRow(this.addRow);
                this.openPage(this.step1SelectCustomer);
                return [2 /*return*/];
            });
        });
    };
    VSheetNew.prototype.getPrices = function (productId) {
        return __awaiter(this, void 0, void 0, function () {
            var queries, ret;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.mapPrice.loadSchema()];
                    case 1:
                        _a.sent();
                        queries = this.mapPrice.queries;
                        return [4 /*yield*/, queries.page.page({ _product: productId }, 0, 1000)];
                    case 2:
                        ret = _a.sent();
                        return [2 /*return*/, ret];
                }
            });
        });
    };
    return VSheetNew;
}(VEntity));
export { VSheetNew };
//# sourceMappingURL=vNew.js.map