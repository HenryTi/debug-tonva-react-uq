import _ from 'lodash';
import { TypeVPage } from 'tonva-tools';
import { CEntity, EntityUI } from "../VM";
import { TuidMain, Tuid, TuidDiv } from "../../entities";
import { VTuidMain } from './vTuidMain';
import { VTuidEdit } from './vTuidEdit';
import { VTuidMainSelect, VTuidDivSelect } from './vTuidSelect';
import { CUsq } from "../usq/cUsq";
import { CLink } from "../link";
import { entitiesRes } from '../../res';
import { VTuidInfo } from "./vTuidInfo";
import { TuidPagedItems } from "./pagedItems";
import { VTuidMainList } from './vTuidList';

export interface TuidUI extends EntityUI {
    CTuidMain?: typeof CTuidMain;
    CTuidSelect?: typeof CTuidSelect;
    CTuidInfo?: typeof CTuidInfo;
    content?: React.StatelessComponent<any>;
    divs?: {
        [div:string]: {
            CTuidSelect?: typeof CTuidSelect;
            content?: React.StatelessComponent<any>;
        }
    }
}

export abstract class CTuid<T extends Tuid> extends CEntity<T, TuidUI> {
    constructor(cUsq: CUsq, entity: T, ui: TuidUI, res) {
        super(cUsq, entity, ui, res);
    }

    get icon() {return entitiesRes['tuid'].icon}

    pagedItems:TuidPagedItems;

    async search(key:string) {
        if (this.pagedItems === undefined) {
            this.pagedItems = new TuidPagedItems(this.entity);
        }
        await this.pagedItems.first(key);
    }
}

export class CTuidMain extends CTuid<TuidMain> {
    constructor(cUsq: CUsq, entity: TuidMain, ui: TuidUI, res) {
        super(cUsq, entity, ui, res);
        let tuid = this.entity;
        this.proxies = tuid.proxies;
        if (this.proxies !== undefined) {
            this.proxyLinks = [];
            for (let i in this.proxies) {
                let link = this.cUsq.linkFromName('tuid', i);
                this.proxyLinks.push(link);
            }
        }
    }

    getLable(tuid:Tuid):string {
        if (tuid === this.entity) return this.label;
        let {name} = tuid;
        if (this.res !== undefined) {
            let {arrs} = this.res;
            if (arrs !== undefined) {
                let arr = arrs[name];
                if (arr !== undefined) {
                    let label = arr.label;
                    if (label !== undefined) return label;
                }
            }
        }
        return name;
    }

    proxies: {[name:string]: TuidMain};
    proxyLinks: CLink[];

    protected get VTuidMain():typeof VTuidMain {return VTuidMain}
    protected get VTuidEdit():typeof VTuidEdit {return VTuidEdit}
    protected get VTuidList():typeof VTuidMainList {return VTuidMainList}

    protected async internalStart():Promise<void> {
        await this.showVPage(this.VTuidMain);
    }

    protected async onEvent(type:string, value:any) {
        let v: TypeVPage<CTuidMain>;
        switch (type) {
            default: return;
            case 'new': v = this.VTuidEdit; break;
            case 'list': v = this.VTuidList; break;
            case 'edit': await this.edit(value); return;
            case 'item-changed': this.itemChanged(value); return;
        }
        await this.showVPage(v, value);
    }

    protected async edit(id:number) {
        let ret = await this.entity.load(id);
        let v = this.VTuidEdit;
        await this.showVPage(v, ret);
    }

    private itemChanged({id, values}:{id:number, values: any}) {
        if (this.pagedItems === undefined) return;
        let items = this.pagedItems.items;
        let item = items.find(v => v.id === id);
        if (item !== undefined) {
            _.merge(item, values);
        }
    }
}
export class CTuidDiv extends CTuid<TuidDiv> {
    protected async internalStart():Promise<void> {
        alert('tuid div: ' + this.entity.name);
    }
}

export class CTuidSelect extends CTuid<Tuid> {
    protected async internalStart(param?: any):Promise<void> {
        await this.showVPage(this.VTuidMainSelect, param);
    }
    protected get VTuidMainSelect():typeof VTuidMainSelect {return VTuidMainSelect}
    protected get VTuidDivSelect():typeof VTuidDivSelect {return VTuidDivSelect}
}
/*
export class CTuidMainSelect extends CTuidSelect<TuidMain> {
    protected async internalStart(param?: any):Promise<void> {
        await this.showVPage(this.VTuidMainSelect, param);
    }
    protected get VTuidMainSelect():typeof VTuidMainSelect {return VTuidMainSelect}
}

export class CTuidDivSelect extends CTuidSelect<TuidDiv> {
    protected async internalStart(param?: any):Promise<void> {
        await this.showVPage(this.VTuidDivSelect, param);
    }
    protected get VTuidDivSelect():typeof VTuidDivSelect {return VTuidDivSelect}
}
*/
export class CTuidInfo extends CTuid<Tuid> {
    protected async internalStart(param?: any):Promise<void> {
        await this.showVPage(this.VTuidInfo, param);
    }
    protected get VTuidInfo():typeof VTuidInfo {return VTuidInfo}
}
