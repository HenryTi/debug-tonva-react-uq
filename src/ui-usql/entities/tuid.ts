import {observable} from 'mobx';
import * as _ from 'lodash';
import {Entity} from './entity';

const maxCacheSize = 1000;
export class Tuid extends Entity {
    private queue: number[] = [];               // 每次使用，都排到队头
    private waitingIds: number[] = [];          // 等待loading的
    private cache = observable.shallowMap();    // 已经缓冲的

    useId(id:number) {
        let key = String(id);
        if (this.cache.has(key) === true ||
            this.waitingIds.findIndex(v => v === id) >= 0) 
        {
            // 如果已经缓冲, 或者cached，或者waiting
            let index = this.queue.findIndex(v => v === id);
            this.queue.splice(index, 1);
            this.queue.push(id);
            return;
        }
        
        if (this.queue.length >= maxCacheSize) {
            // 缓冲已满，先去掉最不常用的
            let r = this.queue.shift();
            if (r === id) {
                // 如果移除的，正好是现在用的，则插入
                this.queue.push(r);
                return;
            }

            let rKey = String(r);
            if (this.cache.has(rKey) === true) {
                // 如果移除r已经缓存
                this.cache.delete(rKey);
            }
            else {
                // 如果移除r还没有缓存
                let index = this.waitingIds.findIndex(v => v === r);
                this.waitingIds.splice(index, 1);
            }
        }
        this.waitingIds.push(id);
        this.queue.push(id);
    }

    async cacheIds():Promise<void> {
        if (this.waitingIds.length === 0) return;
        let tuids = await this.tvApi.tuidIds(this.name, this.waitingIds);
        for (let tuid of tuids) {
            let id = tuid.id;
            if (id === undefined) continue;
            let index = this.waitingIds.findIndex(v => v === id);
            if (index>=0) this.waitingIds.splice(index, 1);
            this.cache.set(String(id), tuid);
        }
    }

    async save(id:number, props:any) {
        let params = _.clone(props);
        params[props.id] = id;
        return await this.tvApi.tuidSave(this.name, params);
    }
    async search(key:string, pageStart:string|number, pageSize:number):Promise<any> {
        return await this.tvApi.tuidSearch(this.name, key, pageStart, pageSize);
    }
    
    // cache放到Tuid里面之后，这个函数不再需要公开调用了
    private async ids(idArr:number[]) {
        return await this.tvApi.tuidIds(this.name, idArr);
    }
}
