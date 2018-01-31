import * as _ from 'lodash';
import {Tuid, entities} from './tv';

const maxSize = 300;

interface TuidCache {
    tuid: Tuid;
    idArr: number[];
    waiting: {[id:number]:any};
    [id:number]: any;
}

const caches: {[tuid:string]: TuidCache} = {};

export class TuidData {
    tuid(id:number, type:string) {
        let t = entities.getTuid(type);
        if (t === undefined) return id;
        let ret;
        let tc = caches[type];
        if (tc === undefined) {
            caches[type] = tc = {
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
        for (let i in caches) {
            let tc = caches[i];
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
