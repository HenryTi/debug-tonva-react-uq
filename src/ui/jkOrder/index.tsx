import { UsqUI } from 'tonva-react-usql';
import res from './res';
import tuid from './tuid';
import sheet from './sheet';
import map from './map';
//import query from './query';
//import { MyCTuid } from './cTuid';

const usqUI:UsqUI = {
    //CTuidMain: MyCTuid,
    tuid: tuid,
    sheet: sheet,
    map: map,
    //query: query,
    res: res,
}

export default usqUI;
