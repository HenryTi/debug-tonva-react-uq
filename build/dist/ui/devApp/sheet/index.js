const orderUI = {
    form: {
        compute: {
            sumAmount: () => {
                return 1;
            },
            articles: {
                amount: function () {
                    return this.quantity * this.price;
                }
            }
        }
    }
};
export default {
    order: orderUI,
};
//# sourceMappingURL=index.js.map