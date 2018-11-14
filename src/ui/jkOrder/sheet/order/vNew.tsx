import * as React from 'react';
import { Page } from 'tonva-tools';
import { FA, List } from 'tonva-react-form';
import { Sheet, VForm, VEntity, SheetUI, TuidMain, CSheet, CTuidSelect, Map } from '../../../../ui-usql';
//import { dictionary as x } from '../../res';
//import { CMyOrder, ProductRow } from './index';
//import { VProductPage } from './productPage';

interface PackRow {
    pack: number;
    price: number;
    quantity: number;
    amount:number;
}

interface ProductRow {
    product: number;
    packRows: PackRow[];
}

export class VSheetNew extends VEntity<Sheet, SheetUI, CSheet> {
    private customer: any;
    private product: any;
    private vForm: VForm;
    private cCustomerSelect: CTuidSelect;
    private cProductSelect: CTuidSelect;
    private mapPrice: Map;
    //private vSheetNew: VSheetNew;

    async showEntry(param?:any) {
        //this.controller.vSheetNew = this;
        let cUsq = this.controller.cUsq;
        this.mapPrice = cUsq.entities.map('price');
        let customer = cUsq.entities.tuid('customer');
        this.cCustomerSelect = cUsq.cTuidSelect(customer);
        let product = cUsq.entities.tuid('product');
        this.cProductSelect = cUsq.cTuidSelect(product);

        this.vForm = this.createForm(this.onSubmit, param);
        let productsBand = this.vForm.getBand('products');
        productsBand.setAddRow(this.addRow);
        this.openPage(this.step1SelectCustomer);
    }

    private onSubmit = async ():Promise<void> => {
        let values = this.vForm.getValues();
        let valuesWithBox = this.vForm.values;
        //let ret = 
        await this.controller.onSave(values, valuesWithBox);
        /*
        this.ceasePage();
        //this.openPage(this.finishedPage);
        await this.controller.showSaved(ret);
        */
    }
    /*
    protected view = () => <Page header={this.label}>
        {this.vForm.render()}
    </Page>;
    */
    private addRow = async() => {
        await this.selectProduct();
    }

    private step1Next = async () => {
        this.ceasePage();
        this.customer = await this.cCustomerSelect.call('');
        this.openPage(this.orderPage);
        this.openPage(this.customerPage);
    }

    private conformOrder = async () => {
        this.ceasePage();
        let {entity} = this.cCustomerSelect;
        entity.useId(this.customer.id);
        this.vForm.setValue('customer', entity.boxId(this.customer.id));
        await this.selectProduct();
    }

    private async getPrices(productId:number):Promise<any[]> {
        await this.mapPrice.loadSchema();
        let {queries} = this.mapPrice;
        let ret = await queries.page.page({_product: productId}, 0, 1000);
        return ret;
    }

    addProductRows = async ({product, packRows}: ProductRow) => {
        let {entity} = this.cProductSelect;
        entity.useId(product);
        let packEntity = (entity as TuidMain).divs['pack'];
        let vArr = this.vForm.vArrs['products'];
        let {list} = vArr;
        for (let packRow of packRows) {
            let {pack, price, quantity, amount} = packRow;
            //packEntity.useId(pack);
            list.push({
                product: entity.boxId(product),
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
        this.priceRows = await this.getPrices(this.product.id);
        //this.showVPage(VProductPage, {product:this.product, priceRows: prices});
        this.openPage(this.productPage);
    }

    private stopOrder = () => {
        this.closePage();
    }
    /*
    private onSubmit = async () => {
        let values = this.form.getValues();
        let valuesWithBox = this.form.values;
        //let ret = await this.saveSheet(values, this.form.values);
        await this.controller.onSave(values, valuesWithBox)
        //alert('[' + this.label + '] 已保存: ' + jsonStringify(ret));
        this.ceasePage();
        //this.openPage(<this.finishedPage />);
        //await this.showSaved(ret);
    }
    */

    private step1SelectCustomer = () => {
        return <Page header="新建订单">
            <div className="p-3 d-flex align-items-center flex-column">
                {(this.x.top as (()=>string|JSX.Element))()}
            </div>
            <div className="p-3 d-flex justify-content-center">
                <button className="w-25 btn btn-primary" onClick={this.step1Next}>开始</button>
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
                <button className="w-25 btn btn-primary" onClick={this.conformOrder}>确认开单</button>
                <button className="mx-3 btn btn-outline-secondary" onClick={this.stopOrder}>拒绝</button>
            </div>
        </Page>;
    }

    private orderPage = ():JSX.Element => {
        return <Page header={this.x.detail}>
            {this.vForm.render()}
        </Page>;
    };

    //======================= select Product =================================
    private priceRows: any[];
    private inputs:{[packId:number]: HTMLInputElement} = {};

    private addProduct = async () => {
        this.ceasePage();
        let packRows:PackRow[] = [];
        for (let priceRow of this.priceRows) {
            let {pack, retail} = priceRow;
            let quantity = Number.parseFloat(this.inputs[pack.id].value);
            if (Number.isNaN(quantity)) continue;
            let packRow:PackRow = {
                pack: pack,
                quantity: quantity,
                price: retail,
                amount: retail*quantity,
            };
            packRows.push(packRow);
        }
        await this.addProductRows({
            product: this.product.id,
            packRows: packRows
        });
    }
    private refQuantity = (input:HTMLInputElement, packId:number) => {
        this.inputs[packId] = input;
    }
    private renderPack = (packRow:any, index:number) => {
        let {pack, retail} = packRow;
        return <div className="px-3 py-1 d-flex">
            <div className="row py-1 align-items-center flex-fill">
                <div className="col-sm-6">{pack.content()}</div>
                <div className="col-sm-6">
                    <div className="row align-items-center">
                        <div className="col-6 text-sm-right"><span className="text-danger">{retail}</span> 元</div>
                        <div className="col-6">
                            <input className="text-center form-control form-control-sm" 
                                ref={(input:HTMLInputElement)=>this.refQuantity(input, pack.id)} 
                                type="number" min={0} />
                        </div>
                    </div>
                </div>
            </div>
        </div>;
    }
    private productPage = () => {
        let {discription} = this.product
        return <Page header="选定产品">
            <div className="p-3 text-primary bg-white my-3">
                {discription}
            </div>
            <List items={this.priceRows} item={{render:this.renderPack}} />
            <div className="p-3 d-flex justify-content-center">
                <button className="w-25 btn btn-primary" onClick={this.addProduct}>加入订单</button>
            </div>
        </Page>;
    }
}
