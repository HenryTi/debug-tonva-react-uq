import React from "react";
import _ from 'lodash';
import { CMyOrder, PackRow } from ".";
import { VPage, Page } from "tonva-tools";
import { List } from "tonva-react-form";

//import { Tuid, TuidUI, VEntity } from "../../../../ui-usql";

export class VProductPage extends VPage<CMyOrder> {
    private product: any;
    private priceRows: any[];
    private inputs:{[packId:number]: HTMLInputElement} = {};

    async showEntry({product, priceRows}:{product:any, priceRows:any[]}) {
        this.product = product;
        this.priceRows = priceRows;
        this.openPageElement(<this.productPage />);
    }
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
        await  this.controller.addProductRows({
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
                <button className="w-25 btn btn-primary btn-sm" onClick={this.addProduct}>加入订单</button>
            </div>
        </Page>;
    }

    //{this.cProductSelect.createForm(undefined, this.product).render()}
}
