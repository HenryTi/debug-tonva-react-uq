import { observable, computed } from 'mobx';
import { BoxId, Tuid, tv } from 'tonva-react-uq';

class PackItem {
    pack: BoxId;
    @observable quantity: number;
    @observable checked: boolean;
}

class ProductItem {
    product: BoxId;
    @observable quantity: number;
    @observable packItems: PackItem[] = [];
    HtmlInputElement 
}

class Cart {
    customer: BoxId;
    @computed get sum() {return 10;}
    @observable productItems: ProductItem[] = [];

    /*
    setCustomer(tuidCustomer: Tuid, customerId: number) {
        this.customer = tuidCustomer.boxId(customerId);
        tv(this.customer);
    }*/

    getValues():any {
        let ret:any = {};
        ret.customer = this.customer && this.customer.id;
        return ret;
    }

    /*
    addItem(item:CartItem) {
        this.items.push(item);
    }*/
}