//import * as React from 'react';
//import Loadable from 'react-loadable';
import { UqUI } from 'tonva-react-uq';
import res from './res';
import tuid from './tuid';
import sheet from './sheet';
import map from './map';

/*
function Loading() {
    return <div>Loading...</div>;
}

const m = Loadable({
    loader: () => import('./map'), 
    loading: Loading,
    render(loaded, props) {
        return <loaded.A />
    }
});
*/
const uqUI:UqUI = {
    //CTuidMain: MyCTuid,
    tuid: tuid,
    sheet: sheet,
    map: map,
    //query: query,
    res: res,
}

export const aa_bbJkOrder:UqUI = {
    tuid: {
        customer: tuid.customer,
        product: tuid.product,
        //packType: tuid.packType,
    }
}

const uqUIs = uqUI;
/*
{
    $: uqUI,
    "aa-bb": aa_BB_UsqUI,
}
*/
export default uqUIs;
