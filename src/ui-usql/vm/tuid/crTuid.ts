import { CrEntity, EntityUI, VmEntity, VM } from "../VM";
import { TuidMain, Tuid, TuidDiv } from "../../entities";
import { VmTuidMain } from './vmTuidMain';
import { VmTuidEdit } from './vmTuidEdit';
import { VmTuidSelect } from './vmTuidSelect';
import { CrUsq } from "../usq/crUsq";
import { VmEntityLink, vmLinkIcon } from "../link";
import { VmTuidList } from "./vmTuidList";

export interface TuidUI extends EntityUI {
    CrTuid?: typeof CrTuidMain;
    CrTuidSelect?: typeof CrTuidMainSelect;
    content?: React.StatelessComponent<any>;
    divs?: {
        [div:string]: {
            CrTuidDivSelect?: typeof CrTuidDivSelect;
            content?: React.StatelessComponent<any>;
        }
    }
}

export abstract class CrTuid<T extends Tuid> extends CrEntity<T, TuidUI> {
    constructor(crUsq: CrUsq, entity: T, ui: TuidUI, res) {
        super(crUsq, entity, ui, res);
    }

    get icon() {return vmLinkIcon('text-info', 'list-alt')}
}

export class CrTuidMain extends CrTuid<TuidMain> {
    constructor(crUsq: CrUsq, entity: TuidMain, ui: TuidUI, res) {
        super(crUsq, entity, ui, res);
        let tuid = this.entity;
        this.proxies = tuid.proxies;
        if (this.proxies !== undefined) {
            this.proxyLinks = [];
            for (let i in this.proxies) {
                let link = this.crUsq.vmLinkFromName('tuid', i);
                this.proxyLinks.push(link);
            }
        }
    }

    proxies: {[name:string]: TuidMain};
    proxyLinks: VmEntityLink[];

    protected get VmTuidMain():typeof VmTuidMain {return VmTuidMain}
    protected get VmTuidEdit():typeof VmTuidEdit {return VmTuidEdit}
    protected get VmTuidList():typeof VmTuidList {return VmTuidList}

    protected async internalStart():Promise<void> {
        await this.showVm(this.VmTuidMain);
    }

    protected async onEvent(type:string, value:any) {
        let vm: VM;
        switch (type) {
            default: return;
            case 'new': vm = this.VmTuidEdit; break;
            case 'list': vm = this.VmTuidList; break;
            case 'edit': await this.edit(value); return;
        }
        await this.showVm(vm, value);
    }

    protected async edit(id:number) {
        let ret = await this.entity.load(id);
        let vm = this.VmTuidEdit;
        await this.showVm(vm, ret);
    }
}

export class CrTuidMainSelect extends CrTuid<TuidMain> {
    protected async internalStart():Promise<void> {
        await this.showVm(this.VmTuidSelect);
    }
    protected get VmTuidSelect():typeof VmTuidSelect {return VmTuidSelect}
}

export class CrTuidDivSelect extends CrTuid<TuidDiv> {
    protected async internalStart():Promise<void> {
        await this.showVm(this.VmTuidSelect);
    }
    protected get VmTuidSelect():typeof VmTuidSelect {return VmTuidSelect}
}
