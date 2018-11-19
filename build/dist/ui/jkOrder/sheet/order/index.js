import * as React from 'react';
import { VSheetNew } from './vNew';
import { observer } from 'mobx-react';
const orderUI = {
    sheetNew: VSheetNew,
    sheetTitle: (valuesWithBox, x) => {
        let title = x.title;
        let { customer, amount } = valuesWithBox;
        let p = { customer: customer.obj.discription, amount: amount || 99 };
        return title(p);
    },
    form: {
        items: {
            customer: { editable: false },
            sumAmount: () => {
                return 1;
            },
            products: {
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
                items: {
                    product: { editable: false },
                    pack: { editable: false },
                    price: { editable: false },
                    amount: function () {
                        return (this.quantity === undefined || this.quantity === null ? 0 : this.quantity) *
                            (this.price === undefined || this.price === null ? 0 : this.price);
                    }
                },
            }
        },
    }
};
export default orderUI;
//# sourceMappingURL=index.js.map