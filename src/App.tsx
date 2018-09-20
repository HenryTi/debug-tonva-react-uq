import * as React from 'react';
import {nav, NavView} from 'tonva-tools';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import ui from './ui';
import {CApp} from './ui-usql/controllers';

/*
const tonvaApp = '$$$/ui-usql-first';
const uiMappers: {[api:string]: EntitiesMapper} = {
    "$$$/usql-first": pageMapper,
    "$$$/货主": 货主Mapper,
};
*/

//const tonvaApp = 'devapp/DevApp';
//const tonvaApp = '$$$/$unitx';
const tonvaApp = 'JKDev/jkOrder';
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
    "百灵威系统工程部/usql-api-test1": null, //pageMapper,ser
    //"$$$/货主": 货主Mapper,
    //"$$$/货主": null,
};
*/

class App extends React.Component {
    async onLogined() {
        let cApp = new CApp(tonvaApp, ui);
        await cApp.start();
    }
    render() {
        return <NavView onLogined={this.onLogined} />;
    }
}

export default App;
