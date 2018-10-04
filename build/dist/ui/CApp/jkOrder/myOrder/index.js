var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as React from 'react';
import { CSheet } from "../../../../ui-usql";
import { myOrderUI } from './ui';
import { Page } from 'tonva-tools';
import { dictionary as x } from './res';
import { VProductPage } from './productPage';
export class CMyOrder extends CSheet {
    constructor(cUsq, sheet) {
        super(cUsq, sheet, myOrderUI);
        this.addRow = () => __awaiter(this, void 0, void 0, function* () {
            yield this.selectProduct();
        });
        this.step1Next = () => __awaiter(this, void 0, void 0, function* () {
            this.ceasePage();
            this.customer = yield this.cCustomerSelect.call('');
            this.openPage(React.createElement(this.orderPage, null));
            this.openPage(React.createElement(this.customerPage, null));
        });
        this.conformOrder = () => __awaiter(this, void 0, void 0, function* () {
            this.ceasePage();
            let { entity } = this.cCustomerSelect;
            entity.useId(this.customer.id);
            this.form.setValue('customer', entity.createID(this.customer.id));
            yield this.selectProduct();
        });
        this.addProductRows = ({ product, packRows }) => __awaiter(this, void 0, void 0, function* () {
            let { entity } = this.cProductSelect;
            entity.useId(product);
            let packEntity = entity.divs['pack'];
            let vArr = this.form.vArrs['products'];
            let { list } = vArr;
            for (let packRow of packRows) {
                let { pack, price, quantity, amount } = packRow;
                //packEntity.useId(pack);
                list.push({
                    product: entity.createID(product),
                    pack: pack,
                    price: price,
                    quantity: quantity,
                    amount: amount,
                });
            }
            this.product = undefined;
            yield this.selectProduct();
        });
        this.selectProduct = () => __awaiter(this, void 0, void 0, function* () {
            this.product = yield this.cProductSelect.call();
            let prices = yield this.getPrices(this.product.id);
            this.showVPage(VProductPage, { product: this.product, priceRows: prices });
        });
        this.stopOrder = () => {
            this.closePage();
        };
        this.onSubmit = () => __awaiter(this, void 0, void 0, function* () {
            let values = this.form.getValues();
            let ret = yield this.saveSheet(values);
            alert('[' + this.label + '] 已保存: ' + JSON.stringify(ret));
            this.closePage();
        });
        this.step1SelectCustomer = () => {
            return React.createElement(Page, { header: "\u65B0\u5EFA\u8BA2\u5355" },
                React.createElement("div", { className: "p-3 d-flex align-items-center flex-column" },
                    React.createElement("div", { className: "mb-3" }, "\u7B2C\u4E00\u6B65\uFF0C\u8BF7\u9009\u62E9\u5BA2\u6237"),
                    React.createElement("div", null, x.order.top)),
                React.createElement("div", { className: "p-3 d-flex justify-content-center" },
                    React.createElement("button", { className: "w-25 btn btn-primary btn-sm", onClick: this.step1Next }, "\u5F00\u59CB")));
        };
        this.customerPage = () => {
            return React.createElement(Page, { header: "\u786E\u8BA4\u5BA2\u6237" },
                React.createElement("div", { className: "p-3" }, "\u5BA2\u6237\u8BE6\u60C5\uFF0C\u4FE1\u7528\uFF0C\u6536\u8D27\u5730\u5740\uFF0C\u6536\u6B3E\u4FE1\u606F\uFF0C\u7B49\u7B49"),
                this.cCustomerSelect.createForm(undefined, this.customer).render(),
                React.createElement("div", { className: "p-3 d-flex justify-content-center" },
                    React.createElement("button", { className: "w-25 btn btn-primary btn-sm", onClick: this.conformOrder }, "\u786E\u8BA4\u5F00\u5355"),
                    React.createElement("button", { className: "mx-3 btn btn-outline-secondary btn-sm", onClick: this.stopOrder }, "\u62D2\u7EDD")));
        };
        this.orderPage = () => {
            /*
            let customerBand = this.form.getBand('customer');
            let productsBand = this.form.getBand('products');
            let submitBand = this.form.getBand('$submit');
            let form = <div className="py-3">
                {customerBand.render()}
                {productsBand.render()}
                {submitBand.render()}
            </div>;
            */
            return React.createElement(Page, { header: "\u8BA2\u5355\u8BE6\u60C5" }, this.form.render());
        };
        this.mapPrice = cUsq.entities.map('price');
        let customer = cUsq.entities.tuid('customer');
        this.cCustomerSelect = cUsq.cTuidSelect(customer);
        let product = cUsq.entities.tuid('product');
        this.cProductSelect = cUsq.cTuidSelect(product);
    }
    //label:string = '试验定制单据';
    internalStart(param) {
        return __awaiter(this, void 0, void 0, function* () {
            this.form = this.createForm(this.onSubmit, undefined, undefined);
            let productsBand = this.form.getBand('products');
            productsBand.setAddRow(this.addRow);
            this.openPage(React.createElement(this.step1SelectCustomer, null));
        });
    }
    getPrices(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.mapPrice.loadSchema();
            let { queries } = this.mapPrice;
            return queries.page.page({ _product: productId }, 0, 1000);
        });
    }
}
//# sourceMappingURL=index.js.map