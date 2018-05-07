import * as React from 'react';
import { NavView } from 'tonva-tools';
import { pageMapper } from './pages';
import { UsqlHome } from './ui-usql';
//import AppHome from './appHome';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
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
const tonvaApp = 'devapp/DevApp';
const uiMappers = {
    "DevApp/devappApi": pageMapper,
};
/*
const tonvaApp = '百灵威系统工程部/first-app';
const uiMappers: {[api:string]: EntitiesMapper} = {
    "百灵威系统工程部/usql-api-test": pageMapper,
    "百灵威系统工程部/usql-api-test1": null, //pageMapper,
    //"$$$/货主": 货主Mapper,
    //"$$$/货主": null,
};
*/
class App extends React.Component {
    render() {
        return (React.createElement(NavView, { view: React.createElement(UsqlHome, { appName: tonvaApp, uiMappers: uiMappers }) }));
        /*
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