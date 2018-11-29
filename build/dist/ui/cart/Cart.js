var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { observable, computed } from 'mobx';
class PackItem {
}
__decorate([
    observable
], PackItem.prototype, "quantity", void 0);
__decorate([
    observable
], PackItem.prototype, "checked", void 0);
class ProductItem {
    constructor() {
        this.packItems = [];
    }
}
__decorate([
    observable
], ProductItem.prototype, "quantity", void 0);
__decorate([
    observable
], ProductItem.prototype, "packItems", void 0);
class Cart {
    constructor() {
        this.productItems = [];
        /*
        addItem(item:CartItem) {
            this.items.push(item);
        }*/
    }
    get sum() { return 10; }
    /*
    setCustomer(tuidCustomer: Tuid, customerId: number) {
        this.customer = tuidCustomer.boxId(customerId);
        tv(this.customer);
    }*/
    getValues() {
        let ret = {};
        ret.customer = this.customer && this.customer.id;
        return ret;
    }
}
__decorate([
    computed
], Cart.prototype, "sum", null);
__decorate([
    observable
], Cart.prototype, "productItems", void 0);
//# sourceMappingURL=Cart.js.map