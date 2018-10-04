var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React from "react";
import { VPage, Page } from "tonva-tools";
import { List } from "tonva-react-form";
//import { Tuid, TuidUI, VEntity } from "../../../../ui-usql";
export class VProductPage extends VPage {
    constructor() {
        super(...arguments);
        this.inputs = {};
        this.addProduct = () => __awaiter(this, void 0, void 0, function* () {
            this.ceasePage();
            let packRows = [];
            for (let priceRow of this.priceRows) {
                let { pack, retail } = priceRow;
                let quantity = Number.parseFloat(this.inputs[pack.id].value);
                if (Number.isNaN(quantity))
                    continue;
                let packRow = {
                    pack: pack,
                    quantity: quantity,
                    price: retail,
                    amount: retail * quantity,
                };
                packRows.push(packRow);
            }
            yield this.controller.addProductRows({
                product: this.product.id,
                packRows: packRows
            });
        });
        this.refQuantity = (input, packId) => {
            this.inputs[packId] = input;
        };
        this.renderPack = (packRow, index) => {
            let { pack, retail } = packRow;
            return React.createElement("div", { className: "px-3 py-1 d-flex" },
                React.createElement("div", { className: "row py-1 align-items-center flex-fill" },
                    React.createElement("div", { className: "col-sm-6" }, pack.content()),
                    React.createElement("div", { className: "col-sm-6" },
                        React.createElement("div", { className: "row align-items-center" },
                            React.createElement("div", { className: "col-6 text-sm-right" },
                                React.createElement("span", { className: "text-danger" }, retail),
                                " \u5143"),
                            React.createElement("div", { className: "col-6" },
                                React.createElement("input", { className: "text-center form-control form-control-sm", ref: (input) => this.refQuantity(input, pack.id), type: "number", min: 0 }))))));
        };
        this.productPage = () => {
            let { discription } = this.product;
            return React.createElement(Page, { header: "\u9009\u5B9A\u4EA7\u54C1" },
                React.createElement("div", { className: "p-3 text-primary bg-white my-3" }, discription),
                React.createElement(List, { items: this.priceRows, item: { render: this.renderPack } }),
                React.createElement("div", { className: "p-3 d-flex justify-content-center" },
                    React.createElement("button", { className: "w-25 btn btn-primary btn-sm", onClick: this.addProduct }, "\u52A0\u5165\u8BA2\u5355")));
        };
        //{this.cProductSelect.createForm(undefined, this.product).render()}
    }
    showEntry({ product, priceRows }) {
        return __awaiter(this, void 0, void 0, function* () {
            this.product = product;
            this.priceRows = priceRows;
            this.openPageElement(React.createElement(this.productPage, null));
        });
    }
}
//# sourceMappingURL=productPage.js.map