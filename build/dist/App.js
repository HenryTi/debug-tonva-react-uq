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
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import ui from './ui';
import { startApp } from './ui-usql';
const tonvaApp = 'JKDev/jkOrder';
//const tonvaApp = '百灵威系统工程部/cart';
class App extends React.Component {
    constructor() {
        super(...arguments);
        this.click = () => __awaiter(this, void 0, void 0, function* () {
            //let url = 'http://101.200.46.56/joint/27/jk-usq';
            let url = 'http://localhost:3017/joint-usq-jk';
            let data = [
                { moniker: 'product', queue: 0, data: undefined },
                { moniker: 'product', queue: undefined, data: {
                        no: 1002,
                        discription: 'a product test1',
                        packType: 23
                    } }
            ];
            let ret = yield fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                body: JSON.stringify(data)
            });
            let text = yield ret.text();
            alert(text);
        });
    }
    onLogined() {
        return __awaiter(this, void 0, void 0, function* () {
            yield startApp(tonvaApp, ui);
        });
    }
    render() {
        React.createElement(React.Fragment, {}, React.createElement(NavView, { onLogined: this.onLogined }), React.createElement("button", { onClick: this.click }, "test"));
        return React.createElement(React.Fragment, null,
            React.createElement(NavView, { onLogined: this.onLogined }),
            React.createElement("button", { onClick: this.click }, "test"));
    }
}
export default App;
//# sourceMappingURL=App.js.map