import * as React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
//import * as _ from 'lodash';
import * as className from 'classnames';
import { Button } from 'reactstrap';
import { List, LMR, FA } from 'tonva-react-form';
import { Page, nav } from 'tonva-tools';
import { TuidMain, Book, Entity, Field, Tuid, Box, Map } from '../../entities';
import { VmEntity } from '../VM';
import { CrMap, MapItem, MapKey, MapUI } from './crMap';
import { JSONContent } from '../viewModel';
//import { CrUsq } from '../crUsq';
//import { tuidSearch } from '../search';

export class VmMapMain extends VmEntity<Map, MapUI> {
    protected coordinator: CrMap;
    private mapKey: MapKey[];

    async showEntry(param?:any) {
        this.open(this.view);
    }
    /*
    protected keyQuery(key:Field):{queryName:string;idName:string} {
        return;
    }
    protected getSearchId(key:Field): (param:any)=>Promise<number> {
        let kq = this.keyQuery(key);
        if (kq !== undefined) {
            let {queryName,idName} = kq;
            let query = this.crUsq.getQuery(queryName);
            return async (param:any):Promise<number> => {
                await query.loadSchema();
                if (query === undefined) 
                    alert('QUERY ' + queryName + ' 没有定义!');
                else {
                    let {returns} = query;
                    if (returns.length > 1) {
                        alert('QUERY ' + queryName + ' 返回多张表, 无法做QuerySearch')
                    }
                }
                let search = new QuerySearch(this.crUsq, query);
                let ret = await search.result(param);
                return ret[idName].id;
            };
        }
        return async (param:any):Promise<number> => {
            let search = new TuidSearch(this.crUsq, key._tuid);
            // 怎么把搜索关键字传进来, 还需要考虑
            let ret = await search.result('');
            return key._tuid.getIdFromObj(ret);
        };
    }
    */
    itemRender = (item:MapItem, index:number) => {
        return <this.ItemRow item={item} />;
    }

    private ItemRow = observer(({item}: {item:MapItem}) => {
        let {tuid, box, children, isLeaf} = item;
        let keyUI = this.coordinator.keyUIs[item.keyIndex];
        let {content:keyContent, none:keyNone} = keyUI;
        let right;
        if (isLeaf === false) {
            right = <button className="btn btn-link btn-sm" onClick={()=>this.coordinator.itemClick(item)}>
                <FA name="plus" />
            </button>;
        }
        let content, border;
        if (isLeaf === true) {
            content = undefined; //<div className="ml-5">leaf</div>;
        }
        else {
            border = "border-bottom";
            let none = keyNone && keyNone();
            content = <List 
                className="ml-4" 
                items={children} 
                item={{onClick:undefined, render:this.itemRender}}
                none={none} />
        }
        return <div className="d-flex flex-column">
            <LMR className={className('px-2', 'py-1', border)} 
                left={<div className="py-1">{box.content(keyContent)}</div>}
                right={right}
            />
            {content}
        </div>;
    });

    protected get view() { return () => <Page header={this.label}>
            <List items={this.coordinator.items} item={{className:'my-2', onClick:undefined, render:this.itemRender}} />
        </Page>
    };
}
