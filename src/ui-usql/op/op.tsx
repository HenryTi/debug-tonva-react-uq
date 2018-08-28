import { Page, meInFrame, nav } from "tonva-tools";
import React from "react";
import { Button } from "reactstrap";
import { Coordinator, Vm } from "../vm/VM";
import { centerApi } from "../centerApi";
import { List, Muted, LMR } from "tonva-react-form";

interface App {
    id: number;
    unit: number;
    name: string;
    discription: string;
    icon: string;
    inUnit: number;
    date_init: Date;
    date_update: Date;
    apis: Api[];
}

interface Sheet {
    name: string;
    states: string[];
}

interface Api {
    app: number;
    id: number;
    unit: number;
    name: string;
    discription: string;
    icon: string;
    inUnit: number;
    public: number;
    entities: string;
    date_init: Date;
    date_update: Date;

    tuids: string[];
    maps: string[];
    books: string[];
    histories: string[];
    queries: string[];
    actions: string[];
    sheets: Sheet[];
}

export class OpCoordinator extends Coordinator {
    private apps: App[];

    protected async internalStart():Promise<void> {
        let unit = meInFrame.unit;
        let ret:any[][] = await centerApi.get('/unit/apps-apis', {unit: unit});
        this.apps = ret[0];
        let apis: Api[] = ret[1];

        for (let app of this.apps) {
            app.apis = [];
        }
        for (let api of apis) {
            let app = this.apps.find(v => v.id === api.app);
            if (app === undefined) continue;
            app.apis.push(api);
            this.setApiEntities(api);
        }

        //await this.showVm(OpVm);
        nav.push(<this.appsView />);
    }

    private setApiEntities(api:Api) {
        let entities = api.entities;
        if (entities === null) return;
        let lns = entities.split('\n');
        let len = lns.length;
        let p:number;
        for (let i=0; i<len;) {
            switch (lns[i]) {
                case 'tuid': p = this.setNames(api.tuids = [], lns, i); break;
                case 'map': p = this.setNames(api.maps = [], lns, i); break;
                case 'book': p = this.setNames(api.books = [], lns, i); break;
                case 'history': p = this.setNames(api.histories = [], lns, i); break;
                case 'query': p = this.setNames(api.queries = [], lns, i); break;
                case 'action': p = this.setNames(api.actions = [], lns, i); break;
                case 'sheet': p = this.setSheets(api.sheets = [], lns, i); break;
                default:
                    alert('unknown entity type: ' + lns[i]);
                    return;
            }
            i = p;
        }
    }

    private setNames(names:string[], lines:string[], p:number):number {
        let len = lines.length;
        let i = p;
        for (; i<len; i++) {
            let ln = lines[i];
            if (ln.length > 0) names.push(ln);
            else return i+1;
        }
        return i;
    }

    private setSheets(sheets:Sheet[], lines:string[], p:number):number {
        let len = lines.length;
        let i = p;
        for (; i<len; i++) {
            let ln = lines[i];
            if (ln.length > 0) {
                let parts:string[] = ln.split('\t');
                let sheet:Sheet = {
                    name: parts[0],
                    states: parts.slice(1),
                }
                sheets.push(sheet);
            }
            else return i+1;
        }
        return i;
    }

    protected async onEvent(type:string, value:any) {
        switch (type) {
            case 'vm1': await this.testVm1(); return;
            case 'click': alert('click: ' + value); return;
            case 'click1': alert('click1'); return;
        }
    }

    private async testVm1() {
        this.showVm(TestVm1);
    }

    private appRender = (app:App, index:number) => {
        let {name, discription} = app;
        return <LMR className="px-3 py-2" right={discription && <Muted>{discription}</Muted>}>
            {name}
        </LMR>
    }

    private appClick = (app:App) => {
        nav.push(<this.appView {...app} />)
    }

    private appsView = () => <Page header="设置操作权限">
        <List items={this.apps} item={{render:this.appRender, onClick:this.appClick}} />
    </Page>;

    private nameRender(name:string, index:number) {
        return <div className="px-3 py-2">{name}</div>
    }
    private sheetRender(sheet:Sheet, index:number) {
        return <div className="px-3 py-2">{sheet.name} {sheet.states.join(', ')}</div>
    }
    private apiRender = (api:Api, index:number) => {
        let {name, tuids, actions, maps, books, queries, histories, sheets} = api;
        let nameRender = this.nameRender;
        function headerCaption(caption:string):JSX.Element {
            return <Muted className="px-3 pt-1 bg-light w-100">{caption}</Muted>
        }
        function itemList(items:any[], caption:string, render:((s:any, index:number)=>JSX.Element) = nameRender) {
            return items && <List className="mt-3" header={headerCaption(caption)} items={items} item={{render:render}} />;
        }
        return <div key={name} className="my-2">
            <div className="px-3 font-weight-bold">{name}</div>
            {itemList(tuids, 'Tuid')}
            {itemList(actions, 'Action')}
            {itemList(maps, 'Map')}
            {itemList(books, 'Book')}
            {itemList(queries, 'Query')}
            {itemList(histories, 'History')}
            {itemList(sheets, 'Sheet', this.sheetRender)}
        </div>;
    }

    private appView = (app:App) => <Page header={app.name + '操作权限'}>
        {
            app.apis.map((v, index) => this.apiRender(v, index))
        }
    </Page>;
}

class OpVm extends Vm {
    async showEntry():Promise<void> {
        this.open(this.view);
    }
    
    private click = () => {
        this.close();
        this.event('click', 'kkkk');
    }

    private vm1Click = () => alert('dddd');
    private showVm1 = () => this.event('vm1');

    private click1 = () => {
        this.open(() => <Page header="TestVm inner page">
            Test1 VM <br/>
            <Button onClick={this.vm1Click}>Button</Button> <br/>
            <Button onClick={this.showVm1}>show TestVm1</Button> <br/>
        </Page>);
    }

    protected view = () => <Page header="设置操作权限">
        Test View <br/>
        <Button onClick={this.click}>Button</Button> <br/>
        <Button onClick={this.click1}>显示新页面</Button> <br/>
    </Page>;
}

class TestVm1 extends Vm {
    async showEntry():Promise<void> {
        this.open(this.view);
    }
    
    private click = () => {
        this.close();
        this.event('click', 'kkkk');
    }

    private click1 = () => {
        this.close(3);
        //this.event('click1');
        this.return('click1 returned');
    }

    protected view = () => <Page header="TestVm1">
        Test1 VM <br/>
        <Button onClick={this.click}>Button</Button> <br/>
        <Button onClick={this.click1}>return call</Button> <br/>
    </Page>;
}
