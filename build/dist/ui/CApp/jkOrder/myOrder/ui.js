import React from "react";
import { observer } from "mobx-react";
import { VSheetNew } from "../../../../ui-usql";
import { Page } from "tonva-tools";
import { dictionary as x } from './res';
export class VOrderNew extends VSheetNew {
    constructor() {
        super(...arguments);
        this.view = () => React.createElement(Page, { header: this.label },
            React.createElement("div", null, x.order.top),
            this.vForm.render());
    }
}
export const myOrderUI = {
    sheetNew: VOrderNew,
    sheetTitle: (valuesWithBox) => {
        let order = x.order;
        let title = order.title;
        let { customer, amount } = valuesWithBox;
        let p = { customer: customer.obj.discription, amount: amount || 99 };
        return title(p);
    },
    form: {
        items: {
            customer: { editable: false },
            sumAmount: (() => { return 1; }),
            products: {
                //type: 'arr',
                items: {
                    product: { editable: false },
                    pack: { editable: false },
                    price: { editable: false },
                    amount: function () {
                        return (this.quantity === undefined || this.quantity === null ? 0 : this.quantity) *
                            (this.price === undefined || this.price === null ? 0 : this.price);
                    }
                },
                rowContent: observer((values) => {
                    let { product, pack, price, quantity } = values;
                    return React.createElement("div", { className: "row px-3 py-2" },
                        React.createElement("div", { className: "col-8" },
                            React.createElement("div", { className: "text-primary" }, product.content()),
                            React.createElement("div", { className: "small" }, pack.content())),
                        React.createElement("div", { className: 'col-2 text-right' },
                            React.createElement("span", { className: "text-danger h5 mb-0" }, price.toFixed(2)),
                            " ",
                            React.createElement("small", null, "\u5143")),
                        React.createElement("div", { className: 'col-2' }, quantity));
                }),
            }
        },
    }
};
//# sourceMappingURL=ui.js.map