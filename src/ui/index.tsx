import $unitx from './$unitx';
import devApp from './devApp';
import jkOrder from './jkOrder';
import {convertUIKeyToLowercase, AppUI} from '../ui-usql';

const ui:AppUI = {
    //App: App,
    //"DevApp/devappApi": DevApp_devappApi,
    //res: res,
    usqs: {
        "$$$/$unitx": $unitx,
        "DevApp/devappApi": devApp,
        "JKDev/jkOrder": jkOrder,
    }
};

convertUIKeyToLowercase(ui);

export default ui;
export { CMyApp } from './CApp';

