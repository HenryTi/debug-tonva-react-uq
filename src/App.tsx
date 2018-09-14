import * as React from 'react';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import {nav, NavView} from 'tonva-tools';
//import {pageMapper} from './pages';
//import {pageMapper as 货主Mapper} from './货主';
//import { EntitiesMapper } from './ui-usql';
//import AppHome from './appHome';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import ui from './ui';
import {CrApp} from './ui-usql/vm';

/*
const tonvaApp = '$$$/ui-usql-first';
const uiMappers: {[api:string]: EntitiesMapper} = {
    "$$$/usql-first": pageMapper,
    "$$$/货主": 货主Mapper,
};
*/

const tonvaApp = 'devapp/DevApp';
//const tonvaApp = '$$$/$unitx';
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
    async onLogined() {
        let crApp = new CrApp(tonvaApp, ui);
        await crApp.start();
    }
    render() {
        return <NavView onLogined={this.onLogined} />;
    }
}

export default App;
