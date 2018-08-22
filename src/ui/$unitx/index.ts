import { UsqUI } from '../../ui-usql';
import tuid from './tuid';
import map from './map';
import query from './query';
import res from './res';
import { MyCrTuid } from './crTuid';

const usqUI:UsqUI = {
    CrTuidMain: MyCrTuid,
    tuid: tuid,
    map: map,
    query: query,
    res: res,
}

export default usqUI;