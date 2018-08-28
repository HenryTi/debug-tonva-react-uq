import { isArray } from 'util';
import App from './App';
//import DevApp_devappApi from './DevApp-devappApi';
import $unitx from './$unitx';

const ui = {
    label: 'xxx yyy zzz',
    //App: App,
    //"DevApp/devappApi": DevApp_devappApi,
    //res: res,
    usqs: {
        "$$$/$unitx": $unitx,
    }
};

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

export default ui;
