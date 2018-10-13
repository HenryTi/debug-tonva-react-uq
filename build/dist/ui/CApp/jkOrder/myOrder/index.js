import { CSheet } from "../../../../ui-usql";
import { myOrderUI } from './ui';
import { VSheetNew } from './vNew';
export class CMyOrder extends CSheet {
    constructor(cUsq, sheet) {
        super(cUsq, sheet, myOrderUI);
        this.addProductRows = async (pr) => {
            this.vSheetNew.addProductRows(pr);
        };
        this.mapPrice = cUsq.entities.map('price');
        let customer = cUsq.entities.tuid('customer');
        this.cCustomerSelect = cUsq.cTuidSelect(customer);
        let product = cUsq.entities.tuid('product');
        this.cProductSelect = cUsq.cTuidSelect(product);
    }
    get VSheetMain() { return VSheetNew; }
    get VSheetNew() { return VSheetNew; }
}
//# sourceMappingURL=index.js.map