import { isArray } from 'util';
//import DevApp_devappApi from './DevApp-devappApi';
import $unitx from './$unitx';
import devApp from './devApp';
const ui = {
    label: 'xxx yyy zzz',
    //App: App,
    //"DevApp/devappApi": DevApp_devappApi,
    //res: res,
    usqs: {
        "$$$/$unitx": $unitx,
        "DevApp/devappApi": devApp,
    }
};
(function converUIKeyToLowercase(obj) {
    for (let i in obj) {
        let v = obj[i];
        obj[i.toLowerCase()] = v;
        if (typeof v === 'object') {
            if (isArray(v) === true) {
                for (let i of v) {
                    converUIKeyToLowercase(i);
                }
            }
            else {
                converUIKeyToLowercase(v);
            }
        }
    }
})(ui);
export default ui;
//# sourceMappingURL=index.js.map