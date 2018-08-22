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
//import {pageMapper} from './pages';
//import {pageMapper as 货主Mapper} from './货主';
//import { EntitiesMapper } from './ui-usql';
//import AppHome from './appHome';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import ui from './ui';
import { CrApp } from './ui-usql/vm';
const tStyle = { margin: '2em auto', borderCollapse: 'collapse' };
const rowStyle = { borderBottom: '1px solid gray' };
const lStyle = { textAlign: 'right', padding: '1em 0.5em', color: 'gray' };
const rStyle = { textAlign: 'left', paddin: '1em 0.5em' };
/*
const tonvaApp = '$$$/ui-usql-first';
const uiMappers: {[api:string]: EntitiesMapper} = {
    "$$$/usql-first": pageMapper,
    "$$$/货主": 货主Mapper,
};
*/
//const tonvaApp = 'devapp/DevApp';
const tonvaApp = '$$$/$unitx';
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
        //return (<NavView view={<UsqlHome appName={tonvaApp} ui={ui} uiMappers={uiMappers} />} />);
        /*
            view={<Page>
            <div className="d-flex flex-fill align-items-center justify-content-center text-info" style={{height:'90%'}}>
                努力加载中...
            </div>
        </Page>} />);
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <table style={tStyle}>
                    {
                      envs.map((v,index) => <tr key={index} style={{borderBottom: '1px solid gray'}}>
                        <td style={lStyle}>{v[0]}:</td>
                        <td style={rStyle}>{v[1]}</td>
                      </tr>)}
                </table>
                <p className="App-intro">
                    To get started, edit <code>src/App.tsx</code> and save to reload.
                </p>
                <button onClick=
            </div>
        );*/
    }
}
export default App;
//# sourceMappingURL=App.js.map