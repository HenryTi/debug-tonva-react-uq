import { isArray } from 'util';
import App from './App';
import DevApp_devappApi from './DevApp-devappApi';
const ui = {
    App: App,
    "DevApp/devappApi": DevApp_devappApi
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