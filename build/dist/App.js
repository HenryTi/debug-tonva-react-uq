import * as React from 'react';
import { NavView } from 'tonva-tools';
//import AppHome from './main';
import AppHome from './appHome';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
//import 'font-awesome/css/font-awesome.min.css';
//import './css/va.css';
//import './css/va-row.css';
//import './css/va-form.css';
//const logo = require('./imgs/logo.svg');
const tStyle = { margin: '2em auto', borderCollapse: 'collapse' };
const rowStyle = { borderBottom: '1px solid gray' };
const lStyle = { textAlign: 'right', padding: '1em 0.5em', color: 'gray' };
const rStyle = { textAlign: 'left', paddin: '1em 0.5em' };
class App extends React.Component {
    render() {
        return (React.createElement(NavView, { view: React.createElement(AppHome, null) }));
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