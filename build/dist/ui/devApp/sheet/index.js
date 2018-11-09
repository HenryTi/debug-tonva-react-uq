var orderUI = {
    form: {
        items: {
            sumAmount: function () {
                return 1;
            },
            articles: {
                items: {
                    amount: function () {
                        return (this.quantity === undefined || this.quantity === null ? 0 : this.quantity) *
                            (this.price === undefined || this.price === null ? 0 : this.price);
                    }
                }
            }
        }
    }
};
export default {
    order: orderUI,
};
//# sourceMappingURL=index.js.map