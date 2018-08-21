import * as React from 'react';
import {observer} from 'mobx-react';
import {Page, loadAppApis, nav, getUrlOrDebug, meInFrame} from 'tonva-tools';
import { List, LMR } from 'tonva-react-form';
import {Entities} from '../entities';
import {ViewModel} from './viewModel';
import { CrUsq, EntityType } from './usq';
import { centerApi } from '../centerApi';
import { TestCoordinator } from './VM';

export const entitiesCollection: {[api:string]: Entities} = {};

export class CrApp extends ViewModel {
    private appOwner:string;
    private appName:string;
    private ui:any;
    private isProduction:boolean;
    id: number;
    appUnits:any[];

    constructor(tonvaApp:string, ui:any) {
        super();
        let parts = tonvaApp.split('/');
        if (parts.length !== 2) {
            throw 'tonvaApp name must be / separated, owner/app';
        }
        this.appOwner = parts[0];
        this.appName = parts[1];
        this.ui = ui;
    }
    crUsqCollection: {[api:string]: CrUsq} = {};
    async loadApis(): Promise<void> {
        let unit = meInFrame.unit;
        let app = await loadAppApis(this.appOwner, this.appName);
        let {id, apis} = app;
        this.id = id;
        for (let appApi of apis) {
            let {id:apiId, apiOwner, apiName, url, urlDebug, ws, access, token} = appApi;
            let api = apiOwner + '/' + apiName;
            let ui = this.ui && this.ui[api];
            let crUsq = this.newCrUsq(apiId, api, access, ui);
            await crUsq.loadSchema();
            this.crUsqCollection[api] = crUsq;
        }
    }

    protected newCrUsq(apiId:number, api:string, access:string, ui:any) {
        // 这里是可以重载的，写自己的CrUsq
        return new CrUsq(this, apiId, api, access, ui);
    }

    caption = 'View Model 版的 Usql App';

    protected view = AppPage;

    get crUsqArr():CrUsq[] {
        let ret:CrUsq[] = [];
        for (let i in this.crUsqCollection) {
            ret.push(this.crUsqCollection[i]);
        }
        return ret;
    }

    getCrUsq(apiName:string):CrUsq {
        return this.crUsqCollection[apiName];
    }

    async start() {
        try {
            let hash = document.location.hash;
            this.isProduction = hash.startsWith('#tv');
            let {unit} = meInFrame;
            if (this.isProduction === false && (unit===undefined || unit<=0)) {
                let app = await loadAppApis(this.appOwner, this.appName);
                let {id} = app;
                this.id = id;
                await this.loadAppUnits();
                switch (this.appUnits.length) {
                    case 0: alert('当前登录的用户不支持当前的APP'); return;
                    case 1:
                        unit = this.appUnits[0].id;
                        if (unit === undefined || unit <= 0) {
                            alert('当前unit不支持app操作，请重新登录');
                            await nav.logout();
                            return;
                        }
                        meInFrame.unit = unit;
                        break;
                    default: 
                        nav.clear();
                        nav.push(<SelectUnit vm={this} />)
                        return;
                }
            }
            await this.showMainPage();
        }
        catch(err) {
            nav.push(<Page header="App start error!">
                <pre>
                    {typeof err === 'string'? err : err.message}
                </pre>
            </Page>);
        }
    }

    // 如果是独立app，删去显示app之前的页面。
    // 如果非独立app，则不删
    protected clearPrevPages() {
        nav.clear();
    }

    private async showMainPage() {
        await this.loadApis();

        // #tvRwPBwMef-23-sheet-api-108
        let parts = document.location.hash.split('-');
        if (parts.length > 2) {
            let action = parts[2];
            // sheet_debug 表示centerUrl是debug方式的
            if (action === 'sheet' || action === 'sheet_debug') {
                let apiId = Number(parts[3]);
                let sheetTypeId = Number(parts[4]);
                let sheetId = Number(parts[5]);
                let crUsq = this.getCrUsqFromId(apiId);
                if (crUsq === undefined) {
                    alert('unknown apiId: ' + apiId);
                    return;
                }
                this.clearPrevPages();
                //nav.replace(<Page header="Sheet">API: {apiId} 编号：{sheetId}</Page>);
                await crUsq.navSheet(sheetTypeId, sheetId);
                return;
            }
        }
        this.clearPrevPages();
        nav.push(this.render());
    }

    testClick = async () => {
        let coord = new TestCoordinator;
        let ret = await coord.call();
        alert('call returned in vmApp: ' + ret);
    }

    private getCrUsqFromId(apiId:number): CrUsq {
        for (let i in this.crUsqCollection) {
            let crUsq = this.crUsqCollection[i];
            if (crUsq.id === apiId) return crUsq;
        }
        return;
    }

    private async loadAppUnits() {
        let ret = await centerApi.userAppUnits(this.id);
        this.appUnits = ret;
        if (ret.length === 1) {
            meInFrame.unit = ret[0].id;
        }
    }

    renderRow = (item: any, index: number):JSX.Element => {
        let {id, nick, name} = item;
        return <LMR className="p-2" right={'id: ' + id}>
            <div>{nick || name}</div>
        </LMR>;
    }
    onRowClick = async (item: any) => {
        meInFrame.unit = item.id; // 25;
        //await store.loadUnit();
        //nav.clear();
        //nav.replace(this.render());
        await this.start();
    }

    async main():Promise<void> {
        const a = 1;
        this.clearPrevPages();
        nav.push(this.render());
    }

    async selectUnit(appUnits:any[]):Promise<number> {
        return new Promise<any>((resolve, reject) => {
            const onRowClick = (item: any) => resolve(item.id);
            const renderRow = (item: any, index: number):JSX.Element => {
                let {id, nick, name} = item;
                return <LMR className="p-2" right={'id: ' + id}>
                    <div>{nick || name}</div>
                </LMR>;
            }
            const SelectUnit = () => <Page header="选择小号" logout={logout}>
                <List items={appUnits} item={{render: renderRow, onClick: onRowClick}}/>
            </Page>;
        });
    }
}

interface SheetLinkProps {
    vm: CrApp;
    apiName: string;
    type: EntityType;
    entityName: string;
}
const SheetLink = ({vm, apiName, type, entityName}:SheetLinkProps) => {
    let crUsq = vm.getCrUsq(apiName);
    if (crUsq === undefined) {
        return <div>unkown api: {apiName}</div>;
    }
    let vmLink = crUsq.vmLinkFromName(type, entityName);
    let key = apiName + ':' + entityName;
    if (vmLink === undefined) {
        return <div key={key}>unkown {apiName}:{entityName}</div>;
    }
    return <div key={key}
        className="bg-white cursor-pointer border-bottom" 
        onClick={vmLink.onClick}>
        {vmLink.render()}
    </div>;
}

const AppPage = observer(({vm}:{vm:CrApp}) => {
    let {caption, crUsqArr, testClick} = vm;
    return <Page header={caption} logout={()=>{}}>
        <button onClick={testClick}>Test coordinator</button>
        {crUsqArr.map((v,i) => <div key={i}>{v.show()}</div>)}
    </Page>;
});

const logout = () => {
    // nothing to do
}
const SelectUnit = ({vm}:{vm:CrApp}) => {
    let {appUnits, renderRow, onRowClick} = vm;
    return <Page header="选择小号" logout={logout}>
        <List items={appUnits} item={{render: renderRow, onClick: onRowClick}}/>
    </Page>
}
