import * as React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import {List, Muted} from 'tonva-react-form';
import {WSChannel, nav, Page} from 'tonva-tools';
//import {pageMapper} from './pages';
//import {pageMapper as 货主Mapper} from './货主';
import {AppUI, MainPage, EntitiesMapper} from './ui-usql/ui';
import {VmApp} from './ui-usql/vm';
import UI from './ui';

const ws = new WSChannel(process.env.REACT_APP_WSHOST, undefined);

/*
const tonvaApp = process.env.REACT_APP_TONVA_APP;
const appUI = new AppUI(tonvaApp, {
    "$$$/usql-first": pageMapper,
    "$$$/货主": 货主Mapper,
});
*/

export interface UsqlHomeProps {
    appName: string;
    caption?: string;
    ui?: any;
    uiMappers?:{[api:string]: EntitiesMapper};
}

@observer
export class UsqlHome extends React.Component<UsqlHomeProps> {
    private wsId:number;  
    private appUI:AppUI;
    private vmApp: VmApp;
    @observable private view = <Page><div className="m-3">waiting...</div></Page>;

    constructor(props) {
        super(props);
        let {appName, caption, ui, uiMappers} = this.props;
        this.appUI = new AppUI(appName, caption,  uiMappers);
        this.state = {
            uiLoaded: false
        }
        this.vmApp = new UI.App.VmApp(appName, ui);
    }
    async componentDidMount() {
        await ws.connect();
        this.wsId = ws.onWsReceiveAny(this.onWs);
        //await this.appUI.load();
        //this.view = <MainPage appUI={this.appUI} />;
        await this.vmApp.loadSchema();
        this.view = this.vmApp.render();
    }
    onWs = async (msg:any) => {

    }
    componentWillUnmount() {
        ws.endWsReceive(this.wsId);
        ws.close();
        //this.appUI.close();
    }
    render() {
        return this.view
    }
}
