import * as React from 'react';
import { NavView } from 'tonva-tools';
import { startApp } from 'tonva-react-uq';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import ui from './ui';

//const tonvaApp = 'JKDev/jkOrder';
//const tonvaApp = '百灵威系统工程部/cart';
//const tonvaA

class App extends React.Component {
    async onLogined() {
        await startApp(ui);
    }
    render() {
        React.createElement(React.Fragment, {}, 
            React.createElement(NavView, {onLogined: this.onLogined}),
            React.createElement("button", {onClick: this.click}, "test"));
        return <>
            <NavView onLogined={this.onLogined} />
        </>;
        //<button onClick={this.click}>test</button>
    }

    click = async () => {
        //let url = 'http://101.200.46.56/joint/27/jk-usq';
        let url = 'http://localhost:3017/joint-usq-jk';
        let data = [
            {moniker: 'product', queue: 0, data: undefined},
            {moniker: 'product', queue: undefined, data: {
                no: 1002,
                discription: 'a product test1',
                packType: 23
            }}
        ];
        let ret = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify(data)
        });
        let text = await ret.text();
        alert(text);
    }
}

export default App;
