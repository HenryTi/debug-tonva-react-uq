import * as React from 'react';
import {observer} from 'mobx-react';
import {Page, loadAppApis, nav, getUrlOrDebug, meInFrame} from 'tonva-tools';
import {Entities} from '../entities';
import {ViewModel} from './viewModel';
import { VmApi, EntityType } from './vmApi';
import { centerApi } from '../centerApi';
import { List, LMR } from '../../../node_modules/tonva-react-form';

export const entitiesCollection: {[api:string]: Entities} = {};

export class VmApp extends ViewModel {
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
    vmApiCollection: {[api:string]: VmApi} = {};
    async loadApis(): Promise<void> {
        let unit = meInFrame.unit;
        let app = await loadAppApis(this.appOwner, this.appName);
        let {id, apis} = app;
        this.id = id;
        for (let appApi of apis) {
            let {id:apiId, apiOwner, apiName, url, urlDebug, ws, access, token} = appApi;
            let api = apiOwner + '/' + apiName;
            let vmApi = this.newVmApi(apiId, api, access, this.ui && this.ui[api]);
            await vmApi.loadSchema();
            this.vmApiCollection[api] = vmApi;
        }
    }

    protected newVmApi(apiId:number, api:string, access:string, ui:any) {
        // 这里是可以重载的，写自己的VmApi
        return new VmApi(this.id, apiId, api, access, ui);
    }

    caption = 'View Model 版的 Usql App';

    protected view = AppPage;

    get vmApiArr():VmApi[] {
        let ret:VmApi[] = [];
        for (let i in this.vmApiCollection) {
            ret.push(this.vmApiCollection[i]);
        }
        return ret;
    }

    getVmApi(apiName:string):VmApi {
        return this.vmApiCollection[apiName];
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
                let vmApi = this.getVmApiFromId(apiId);
                if (vmApi === undefined) {
                    alert('unknown apiId: ' + apiId);
                    return;
                }
                this.clearPrevPages();
                //nav.replace(<Page header="Sheet">API: {apiId} 编号：{sheetId}</Page>);
                await vmApi.navSheet(sheetTypeId, sheetId);
                return;
            }
        }
        this.clearPrevPages();
        nav.push(this.render());
    }

    private getVmApiFromId(apiId:number): VmApi {
        for (let i in this.vmApiCollection) {
            let vmApi = this.vmApiCollection[i];
            if (vmApi.id === apiId) return vmApi;
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
}

interface SheetLinkProps {
    vm: VmApp;
    apiName: string;
    type: EntityType;
    entityName: string;
}
const SheetLink = ({vm, apiName, type, entityName}:SheetLinkProps) => {
    let vmApi = vm.getVmApi(apiName);
    if (vmApi === undefined) {
        return <div>unkown api: {apiName}</div>;
    }
    let vmLink = vmApi.vmLinkFromName(type, entityName);
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

const AppPage = observer(({vm}:{vm:VmApp}) => {
    let {caption, vmApiArr} = vm;
    return <Page header={caption} logout={()=>{}}>
        {vmApiArr.map((v,i) => <div key={i}>{v.render()}</div>)}
    </Page>;
});

const logout = () => {
    // nothing to do
}
const SelectUnit = ({vm}:{vm:VmApp}) => {
    let {appUnits, renderRow, onRowClick} = vm;
    return <Page header="选择小号" logout={logout}>
        <List items={appUnits} item={{render: renderRow, onClick: onRowClick}}/>
    </Page>
}
