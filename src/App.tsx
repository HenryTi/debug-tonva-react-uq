import * as React from 'react';
import './App.css';

const logo = require('./logo.svg');

class App extends React.Component {
  componentDidMount() {
    let env = process.env;
    console.log('env:%s REACT_APP_CENTER_HOST:%s', env.NODE_ENV, env.REACT_APP_CENTER_HOST);
  }
  render() {
    let env = process.env;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div>
          {'env:' + env.NODE_ENV + ' REACT_APP_CENTER_HOST:' + env.REACT_APP_CENTER_HOST}
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
