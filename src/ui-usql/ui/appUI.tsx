import * as React from 'react';
import {List, Muted} from 'tonva-react-form';
import {WSChannel, nav, Page, AppApi, loadAppApis} from 'tonva-tools';
import {EntitiesMapper} from './mapper';
import {defaultMapper} from '../pages';
import {Entities, Entity} from '../entities';
import {EntitiesUI, entitiesUICollection, EntitySet} from './entitiesUI';
import {EntityUI} from './entityUI';
import {TuidUI} from './tuidUI';
//import {Entities, defaultMapper, Entity, Tuid, Action, Sheet, Query,
//    AppUI, EntitiesUI, EntitiesUIProps, EntitySet, 
//    EntityUI, ActionUI, QueryUI, SheetUI, TuidUI} from './ui-usql';

export class AppUI {
    private appOwner:string;
    private appName:string;
    //private mainPage: new ({appUI:AppUI})=>React.Component;
    private entitiesUICollection = entitiesUICollection;
    private uiMappers?:{[api:string]: EntitiesMapper};
    
    constructor(appName:string, appOwner:string, uiMappers?:{[api:string]: EntitiesMapper}) {
        this.appOwner = appOwner;
        this.appName = appName;
        //this.mainPage = mainPage || MainPage;
        this.uiMappers = uiMappers;
    }

    apiUIs:EntitiesUI[] = [];

    async load(): Promise<void> {
        let appApis = await loadAppApis(this.appOwner, this.appName);
        for (let appApi of appApis) {
            let {apiOwner, apiName, url, ws, access, token} = appApi;
            let api = apiOwner + '/' + apiName;
            let mapper = this.uiMappers && this.uiMappers[api];
            let apiUI = new EntitiesUI(url, ws, api, access, defaultMapper, mapper);
            this.apiUIs.push(apiUI);
            await apiUI.loadEntities();
        }
    }

    close() {
        for (let p in this.entitiesUICollection) {
            this.entitiesUICollection[p].close();
        }
    }
}

export class MainPage extends React.Component<{appUI:AppUI}> {
    private entityRender(ui: TuidUI, index: number): JSX.Element {
        let {caption} = ui;
        return ui.link?
            <ui.link ui={ui} />:
            <div className="px-3 py-2">{caption}</div>;
    }
    private async entityClick<E extends Entity, U extends EntityUI<E>>(ui:U) {
        await ui.entity.loadSchema();
        nav.push(<ui.mainPage ui={ui} />);
    }
    private renderList<E extends Entity>(entitySet:EntitySet<E,EntityUI<E>>, caption:string) {
        if (entitySet.list.length === 0) return;
        return <List className='my-2'
                header={<Muted>{entitySet.caption || caption}</Muted>}
                items={entitySet.list} 
                item={{render: this.entityRender, onClick:this.entityClick}} />;
    }
    render() {
        let {appUI} = this.props;
        return <Page header='同花默认界面-2'>
            {
                appUI.apiUIs.map((v, index) => {
                    let {api, tuid, action, sheet, query, book, history} = v;
                    return <React.Fragment key={index}>
                        <div className="px-3 pt-1"><Muted>{api}</Muted></div>
                        {this.renderList(tuid, 'Tuid')}
                        {this.renderList(action, 'Action')}
                        {this.renderList(sheet, 'Sheet')}
                        {this.renderList(query, 'Query')}
                        {this.renderList(book, 'Book')}
                        {this.renderList(history, 'History')}
                    </React.Fragment>;
                })
            }
        </Page>;
    }
}