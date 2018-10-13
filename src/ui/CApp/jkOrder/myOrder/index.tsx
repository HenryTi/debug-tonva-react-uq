import * as React from 'react';
import { CSheet, CUsq, Sheet, CTuidSelect, Map } from "../../../../ui-usql";
import { myOrderUI } from './ui';
import { Page, TypeVPage } from 'tonva-tools';
import { VSheetNew } from './vNew';

export interface PackRow {
    pack: number;
    price: number;
    quantity: number;
    amount:number;
}

export interface ProductRow {
    product: number;
    packRows: PackRow[];
}

export class CMyOrder extends CSheet {
    constructor(cUsq:CUsq, sheet:Sheet) {
        super(cUsq, sheet, myOrderUI);
        this.mapPrice = cUsq.entities.map('price');
        let customer = cUsq.entities.tuid('customer');
        this.cCustomerSelect = cUsq.cTuidSelect(customer);
        let product = cUsq.entities.tuid('product');
        this.cProductSelect = cUsq.cTuidSelect(product);
    }

    cCustomerSelect: CTuidSelect;
    cProductSelect: CTuidSelect;
    mapPrice: Map;
    vSheetNew: VSheetNew;

    protected get VSheetMain(): TypeVPage<CSheet> {return VSheetNew}
    protected get VSheetNew(): TypeVPage<CSheet> {return VSheetNew}

    addProductRows = async (pr: ProductRow) => {
        this.vSheetNew.addProductRows(pr);
    }
}
