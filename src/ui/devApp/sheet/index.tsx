import * as React from 'react';
import { SheetUI } from 'tonva-react-usql';

const orderUI:SheetUI = {
    form: {
        items: {
            sumAmount: ():number => {
                return 1;
            },
            articles: {
                items: {
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
