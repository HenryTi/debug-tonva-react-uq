import React from "react";
import { observer } from "mobx-react";
import { SheetUI, VSheetNew } from "../../../../ui-usql";
import { Page } from "tonva-tools";
import { dictionary as x } from './res';

export class VOrderNew extends VSheetNew {
    protected view = () => <Page header={this.label}>
        <div>{x.order.top}</div>
        {this.vForm.render()}
    </Page>;
}

export const myOrderUI: SheetUI = {
    sheetNew: VOrderNew,
    form: {
        compute: {
            sumAmount: ():number => {
                return 1;
            },
        },
        arrs: {
            products: {
                rowContent: observer((values:any) => {
                    let { product, pack, price, quantity} = values;
                    return <div className="row px-3 py-2">
                        <div className="col-8">
                            <div className="text-primary">{product.content()}</div>
                            <div className="small">{pack.content()}</div>
                        </div>
                        <div className='col-2 text-right'>
                            <span className="text-danger h5 mb-0">{price.toFixed(2)}</span> <small>元</small>
                        </div>
                        <div className='col-2'>{quantity}</div>
                    </div>;
                }),
                compute: {
                    amount: function(this:any):number {
                        return (this.quantity === undefined || this.quantity === null? 0 : this.quantity) * 
                            (this.price === undefined || this.price === null? 0 : this.price);
                    }
                }
            }
        }
    }
}
