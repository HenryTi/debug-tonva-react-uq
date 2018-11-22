import * as React from 'react';
import { NavView } from 'tonva-tools';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import ui from './ui';
import { startApp } from './ui-usql';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

const tonvaApp = 'JKDev/jkOrder';
//const tonvaApp = '百灵威系统工程部/cart';

class App extends React.Component {
    text = observable.box('kkk');

    async onLogined() {
        await startApp(tonvaApp, ui);
    }

    private onClick = () => {
        this.text.set('bbb');
        alert('click');
    }
    render() {
        //return <div onClick={this.onClick}>{tv(this)} /></div>;
        return <NavView onLogined={this.onLogined} />;
    }
}
/*
const Tv = observer(({p}:{p:App}) => {
    let {text} = p;
    return <div>{text.get()}</div>;
});

const tv = (p:App) => <Tv p={p} />
*/
export default App;
