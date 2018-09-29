import * as React from 'react';
import { VOrderNew } from './new';
import { observer } from 'mobx-react';
const orderUI = {
    sheetNew: VOrderNew,
    form: {
        compute: {
            sumAmount: () => {
                return 1;
            },
        },
        arrs: {
            products: {
                rowContent: observer((values) => {
                    let { product, pack, price, quantity } = values;
                    return React.createElement("div", { className: "row px-3 py-2" },
                        React.createElement("div", { className: "col-8" },
                            React.createElement("div", { className: "text-primary" }, product.content()),
                            React.createElement("div", { className: "small" }, pack.content())),
                        React.createElement("div", { className: 'col-2' },
                            React.createElement("span", { className: "text-danger h5 mb-0" }, price.toFixed(2)),
                            " ",
                            React.createElement("small", null, "\u5143")),
                        React.createElement("div", { className: 'col-2' }, quantity));
                }),
                compute: {
                    amount: function () {
                        return (this.quantity === undefined || this.quantity === null ? 0 : this.quantity) *
                            (this.price === undefined || this.price === null ? 0 : this.price);
                    }
                }
            }
        }
    }
};
export default orderUI;
//# sourceMappingURL=index.js.map