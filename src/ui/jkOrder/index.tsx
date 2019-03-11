import { UqUI } from 'tonva-react-uq';
import res from './res';
import tuid from './tuid';
import sheet from './sheet';
import map from './map';
//import query from './query';
//import { MyCTuid } from './cTuid';

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
