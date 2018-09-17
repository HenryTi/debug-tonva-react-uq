//import DevApp_devappApi from './DevApp-devappApi';
import $unitx from './$unitx';
import devApp from './devApp';
import { converUIKeyToLowercase } from '../ui-usql';
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
converUIKeyToLowercase(ui);
/*
(function converUIKeyToLowercase(obj: any) {
    for (let i in obj) {
        let v = obj[i];
        obj[i.toLowerCase()] = v;
        if (typeof v === 'object') {
          if (isArray(v) === true) {
              for (let i of (v as any[])) {
                  converUIKeyToLowercase(i);
              }
          }
          else {
              converUIKeyToLowercase(v);
          }
      }
  }
})(ui);
*/
export default ui;
//# sourceMappingURL=index.js.map