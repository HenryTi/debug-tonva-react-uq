import {observable} from 'mobx';
import * as _ from 'lodash';
import {Entities} from './entities';
import {Tuid} from './tuid';
/*
const maxSize = 300;

export class TuidData {
    private entities:Entities;
    @observable map = observable.map();
    constructor(entities:Entities) {
        this.entities = entities;
    }
    tuid(id:number, type:string) {
        let t = this.entities.getTuid(type);
        if (t === undefined) return id;
        let ret;
        let tc = this.entities.caches[type];
        if (tc === undefined) {
            this.entities.caches[type] = tc = {
                tuid: t,
                idArr: [],
                waiting: {},
            };
            tc.waiting[id] = ret = {id:id};
        }
        else {
            ret = tc[id];
            if (ret === undefined) {
                let w = tc.waiting;
                if (w === undefined) {
                    w = tc.waiting = {};
                    w[id] = ret = {id:id};
                }
                else {
                    ret = w[id];
                    if (ret === undefined) {
                        w[id] = ret = {id:id};
                    }
                }
            }
        }
        return ret;
    }

    onUpdate(callback:(data:TuidData) => void) {
        if (callback === undefined) return;
        for (let i in this.entities.caches) {
            let tc = this.entities.caches[i];
            let waiting = tc.waiting;
            if (waiting !== undefined) {
                let idArr:number[] = Object.keys(waiting).map(k => waiting[k].id);
                tc.tuid.ids(idArr).then(res => {
                    for (let r of res) {
                        let id = r.id;
                        let item = waiting[id];
                        _.merge(item, r);
                    }
                    callback(this);
                    tc.waiting = undefined;
                });
            }
        }
        //callback(this);
    }
}
*/