import * as React from 'react';
import { VSheetNew } from './vNew';
import { observer } from 'mobx-react';
var orderUI = {
    sheetNew: VSheetNew,
    sheetTitle: function (valuesWithBox, x) {
        var title = x.title;
        var customer = valuesWithBox.customer, amount = valuesWithBox.amount;
        var p = { customer: customer.obj.discription, amount: amount || 99 };
        return title(p);
    },
    form: {
        items: {
            customer: { editable: false },
            sumAmount: function () {
                return 1;
            },
            products: {
                rowContent: observer(function (values) {
                    var product = values.product, pack = values.pack, price = values.price, quantity = values.quantity;
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