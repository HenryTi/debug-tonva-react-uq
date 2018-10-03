import * as React from 'react';
import { CSheet, SheetUI, CApp, CUsq, Sheet, Tuid, CTuidSelect, VTuidView, CTuidInfo, VForm, TuidMain, Map } from "../../../../ui-usql";
import { observer } from 'mobx-react';
import { myOrderUI } from './ui';
import { Page } from 'tonva-tools';
import { dictionary as x } from './res';
import { VProductPage } from './productPage';

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
    private customer: any;
    private product: any;
    private cCustomerSelect: CTuidSelect;
    private cProductSelect: CTuidSelect;
    private form: VForm;
    private mapPrice: Map;

    constructor(cUsq:CUsq, sheet:Sheet) {
        super(cUsq, sheet, myOrderUI);
        this.mapPrice = cUsq.entities.map('price');
        let customer = cUsq.entities.tuid('customer');
        this.cCustomerSelect = cUsq.cTuidSelect(customer);
        let product = cUsq.entities.tuid('product');
        this.cProductSelect = cUsq.cTuidSelect(product);
    }

    //label:string = '试验定制单据';

    async internalStart(param?:any) {
        this.form = this.createForm(this.onSubmit, undefined, undefined);
        let productsBand = this.form.getBand('products');
        productsBand.setAddRow(this.addRow);
        this.openPage(<this.step1SelectCustomer />);
    }

    private addRow = async() => {
        await this.selectProduct();
    }

    private step1Next = async () => {
        this.ceasePage();
        this.customer = await this.cCustomerSelect.call('');
        this.openPage(<this.orderPage />);
        this.openPage(<this.customerPage />);
    }

    private conformOrder = async () => {
        this.ceasePage();
        let {entity} = this.cCustomerSelect;
        entity.useId(this.customer.id);
        this.form.setValue('customer', entity.createID(this.customer.id));
        await this.selectProduct();
    }

    private async getPrices(productId:number):Promise<any[]> {
        await this.mapPrice.loadSchema();
        let {queries} = this.mapPrice;
        return queries.page.page({_product: productId}, 0, 1000);
    }

    addProductRows = async ({product, packRows}: ProductRow) => {
        let {entity} = this.cProductSelect;
        entity.useId(product);
        let packEntity = (entity as TuidMain).divs['pack'];
        let vArr = this.form.vArrs['products'];
        let {list} = vArr;
        for (let packRow of packRows) {
            let {pack, price, quantity, amount} = packRow;
            //packEntity.useId(pack);
            list.push({
                product: entity.createID(product),
                pack: pack, //packEntity.createID(pack),
                price: price,
                quantity: quantity,
                amount: amount,
            });
        }
        this.product = undefined;
        await this.selectProduct();
    }

    private selectProduct = async () => {
        this.product = await this.cProductSelect.call();
        let prices = await this.getPrices(this.product.id);
        this.showVPage(VProductPage, {product:this.product, priceRows: prices});
    }

    private stopOrder = () => {
        this.closePage();
    }

    private onSubmit = async () => {
        let values = this.form.getValues();
        let ret = await this.saveSheet(values);
        alert('[' + this.label + '] 已保存: ' + JSON.stringify(ret));
        this.closePage();
    }

    private step1SelectCustomer = () => {
        return <Page header="新建订单">
            <div className="p-3 d-flex align-items-center flex-column">
                <div className="mb-3">第一步，请选择客户</div>
                <div>{x.order.top}</div>
            </div>
            <div className="p-3 d-flex justify-content-center">
                <button className="w-25 btn btn-primary btn-sm" onClick={this.step1Next}>开始</button>
            </div>
        </Page>;
    }

    private customerPage = () => {
        return <Page header="确认客户">
            <div className="p-3">
                客户详情，信用，收货地址，收款信息，等等
            </div>
            {this.cCustomerSelect.createForm(undefined, this.customer).render()}
            <div className="p-3 d-flex justify-content-center">
                <button className="w-25 btn btn-primary btn-sm" onClick={this.conformOrder}>确认开单</button>
                <button className="mx-3 btn btn-outline-secondary btn-sm" onClick={this.stopOrder}>拒绝</button>
            </div>
        </Page>;
    }

    private orderPage = () => {
        /*
        let customerBand = this.form.getBand('customer');
        let productsBand = this.form.getBand('products');
        let submitBand = this.form.getBand('$submit');
        let form = <div className="py-3">
            {customerBand.render()}
            {productsBand.render()}
            {submitBand.render()}
        </div>;
        */
        return <Page header="订单详情">
            {this.form.render()}
        </Page>;
    };
}

