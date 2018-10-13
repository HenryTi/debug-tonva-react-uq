import * as React from 'react';
import { NavView } from 'tonva-tools';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import ui from './ui';
import { startApp } from './ui-usql';

const tonvaApp = 'JKDev/jkOrder';

class App extends React.Component {
    async onLogined() {
        await startApp(tonvaApp, ui);
    }
    render() {
        return <NavView onLogined={this.onLogined} />;
    }
}

export default App;
