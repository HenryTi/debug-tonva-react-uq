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
    onLogined() {
        return __awaiter(this, void 0, void 0, function* () {
            yield startApp(tonvaApp, ui);
        });
    }
    render() {
        return React.createElement(NavView, { onLogined: this.onLogined });
    }
}
export default App;
//# sourceMappingURL=App.js.map