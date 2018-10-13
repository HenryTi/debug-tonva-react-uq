import * as React from 'react';
import { Page } from 'tonva-tools';
import { VEntity } from '../../../../ui-usql';
import { dictionary as x } from './res';
import { VProductPage } from './productPage';
export class VSheetNew extends VEntity {
    constructor() {
        super(...arguments);
        this.onSubmit = async () => {
            let values = this.vForm.getValues();
            let valuesWithBox = this.vForm.values;
            //let ret = 
            await this.controller.onSave(values, valuesWithBox);
            /*
            this.ceasePage();
            //this.openPage(this.finishedPage);
            await this.controller.showSaved(ret);
            */
        };
        /*
        protected view = () => <Page header={this.label}>
            {this.vForm.render()}
        </Page>;
        */
        this.addRow = async () => {
            await this.selectProduct();
        };
        this.step1Next = async () => {
            this.ceasePage();
            this.customer = await this.controller.cCustomerSelect.call('');
            this.openPage(this.orderPage);
            this.openPage(this.customerPage);
        };
        this.conformOrder = async () => {
            this.ceasePage();
            let { entity } = this.controller.cCustomerSelect;
            entity.useId(this.customer.id);
            this.vForm.setValue('customer', entity.createID(this.customer.id));
            await this.selectProduct();
        };
        this.addProductRows = async ({ product, packRows }) => {
            let { entity } = this.controller.cProductSelect;
            entity.useId(product);
            let packEntity = entity.divs['pack'];
            let vArr = this.vForm.vArrs['products'];
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
            await this.selectProduct();
        };
        this.selectProduct = async () => {
            this.product = await this.controller.cProductSelect.call();
            let prices = await this.getPrices(this.product.id);
            this.showVPage(VProductPage, { product: this.product, priceRows: prices });
        };
        this.stopOrder = () => {
            this.closePage();
        };
        /*
        private onSubmit = async () => {
            let values = this.form.getValues();
            let valuesWithBox = this.form.values;
            //let ret = await this.saveSheet(values, this.form.values);
            await this.controller.onSave(values, valuesWithBox)
            //alert('[' + this.label + '] 已保存: ' + JSON.stringify(ret));
            this.ceasePage();
            //this.openPage(<this.finishedPage />);
            //await this.showSaved(ret);
        }
        */
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
                this.controller.cCustomerSelect.createForm(undefined, this.customer).render(),
                React.createElement("div", { className: "p-3 d-flex justify-content-center" },
                    React.createElement("button", { className: "w-25 btn btn-primary btn-sm", onClick: this.conformOrder }, "\u786E\u8BA4\u5F00\u5355"),
                    React.createElement("button", { className: "mx-3 btn btn-outline-secondary btn-sm", onClick: this.stopOrder }, "\u62D2\u7EDD")));
        };
        this.orderPage = () => {
            return React.createElement(Page, { header: "\u8BA2\u5355\u8BE6\u60C5" }, this.vForm.render());
        };
    }
    async showEntry(param) {
        this.controller.vSheetNew = this;
        this.vForm = this.createForm(this.onSubmit, param);
        let productsBand = this.vForm.getBand('products');
        productsBand.setAddRow(this.addRow);
        this.openPage(this.step1SelectCustomer);
    }
    async getPrices(productId) {
        await this.controller.mapPrice.loadSchema();
        let { queries } = this.controller.mapPrice;
        return queries.page.page({ _product: productId }, 0, 1000);
    }
}
//# sourceMappingURL=vNew.js.map