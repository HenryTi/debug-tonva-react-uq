var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as React from 'react';
import { NavView } from 'tonva-tools';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import ui from './ui';
import { CrApp } from './ui-usql/vm';
/*
const tonvaApp = '$$$/ui-usql-first';
const uiMappers: {[api:string]: EntitiesMapper} = {
    "$$$/usql-first": pageMapper,
    "$$$/货主": 货主Mapper,
};
*/
//const tonvaApp = 'devapp/DevApp';
//const tonvaApp = '$$$/$unitx';
const tonvaApp = 'JKDev/jkOrder';
/*
const uiMappers: {[api:string]: EntitiesMapper} = {
    "DevApp/devappApi": pageMapper,
    //"$$$/货主": 货主Mapper,
    //"$$$/货主": null,
};
*/
/*
const tonvaApp = '百灵威系统工程部/customer';
const uiMappers: {[api:string]: EntitiesMapper} = {
    "百灵威系统工程部/usql-api-test": pageMapper,
    "百灵威系统工程部/usql-api-test1": null, //pageMapper,
    //"$$$/货主": 货主Mapper,
    //"$$$/货主": null,
};
*/
class App extends React.Component {
    onLogined() {
        return __awaiter(this, void 0, void 0, function* () {
            let crApp = new CrApp(tonvaApp, ui);
            yield crApp.start();
        });
    }
    render() {
        return React.createElement(NavView, { onLogined: this.onLogined });
    }
}
export default App;
//# sourceMappingURL=App.js.map