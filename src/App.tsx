import * as React from 'react';
import {nav, Page, NavView} from 'tonva-tools';
import AppView from './main';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

const logo = require('./logo.svg');

let env = process.env;
const envs:string[][] = [
  ['ENV', env.NODE_ENV],
  ['APP_NAME', env.REACT_APP_NAME],
  ['APIHOST_CENTER', env.REACT_APP_APIHOST_CENTER],
];
const tStyle = {margin: '2em auto', borderCollapse:'collapse'};
const rowStyle = {borderBottom: '1px solid gray'};
const lStyle = {textAlign: 'right', padding: '1em 0.5em', color: 'gray'};
const rStyle = {textAlign: 'left', paddin: '1em 0.5em'};

class App extends React.Component {
  render() {
    return (<NavView view={<AppView />} />);
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
