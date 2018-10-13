import * as React from 'react';
import { Page } from 'tonva-tools';
import { FA } from 'tonva-react-form';
import { Sheet, VForm, VEntity, SheetUI, TuidMain } from '../../../../ui-usql';
import { dictionary as x } from './res';
import { CMyOrder, ProductRow } from './index';
import { VProductPage } from './productPage';

export class VSheetNew extends VEntity<Sheet, SheetUI, CMyOrder> {
    private customer: any;
    private product: any;
    private vForm: VForm;

    async showEntry(param?:any) {
        this.controller.vSheetNew = this;
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
        this.customer = await this.controller.cCustomerSelect.call('');
        this.openPage(this.orderPage);
        this.openPage(this.customerPage);
    }

    private conformOrder = async () => {
        this.ceasePage();
        let {entity} = this.controller.cCustomerSelect;
        entity.useId(this.customer.id);
        this.vForm.setValue('customer', entity.createID(this.customer.id));
        await this.selectProduct();
    }

    private async getPrices(productId:number):Promise<any[]> {
        await this.controller.mapPrice.loadSchema();
        let {queries} = this.controller.mapPrice;
        return queries.page.page({_product: productId}, 0, 1000);
    }

    addProductRows = async ({product, packRows}: ProductRow) => {
        let {entity} = this.controller.cProductSelect;
        entity.useId(product);
        let packEntity = (entity as TuidMain).divs['pack'];
        let vArr = this.vForm.vArrs['products'];
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
        this.product = await this.controller.cProductSelect.call();
        let prices = await this.getPrices(this.product.id);
        this.showVPage(VProductPage, {product:this.product, priceRows: prices});
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
        //alert('[' + this.label + '] 已保存: ' + JSON.stringify(ret));
        this.ceasePage();
        //this.openPage(<this.finishedPage />);
        //await this.showSaved(ret);
    }
    */

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
            {this.controller.cCustomerSelect.createForm(undefined, this.customer).render()}
            <div className="p-3 d-flex justify-content-center">
                <button className="w-25 btn btn-primary btn-sm" onClick={this.conformOrder}>确认开单</button>
                <button className="mx-3 btn btn-outline-secondary btn-sm" onClick={this.stopOrder}>拒绝</button>
            </div>
        </Page>;
    }

    private orderPage = ():JSX.Element => {
        return <Page header="订单详情">
            {this.vForm.render()}
        </Page>;
    };
}
