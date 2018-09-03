import * as React from 'react';
import { SheetUI } from '../../../ui-usql';

const orderUI:SheetUI = {
    form: {
        compute: {
            sumAmount: ():number => {
                return 1;
            },
        },
        arrs: {
            articles: {
                compute: {
                    amount: function(this:any):number {
                        return (this.quantity === undefined || this.quantity === null? 0 : this.quantity) * 
                            (this.price === undefined || this.price === null? 0 : this.price);
                    }
                }
            }
        }
    }
};

export default {
    order: orderUI,
}
