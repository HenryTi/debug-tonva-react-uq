import { EntityCoordinator, Vm, VM } from "../VM";
import { Tuid, TuidBase } from "../../entities";
import { EntityUI, vmLinkIcon } from "../vmEntity";
import { VmTuidMain } from './vmTuidMain';
import { VmTuidEdit } from './vmTuidEdit';
import { VmTuidSelect } from './vmTuidSelect';
import { CrUsq } from "../crUsq";
import { VmEntityLink } from "../link";
import { VmTuidList } from "./vmTuidList";

export interface TuidUI extends EntityUI {
    /*
    main: typeof VmTuidMain;
    edit: typeof VmTuidEdit;
    view: typeof VmTuidView;
    search: typeof VmTuidSearch;
    content: typeof RowContent;
    input: typeof VmTuidControl;
    pickerConfig: PickerConfig;
    */
}

export abstract class CrTuidBase extends EntityCoordinator<Tuid, TuidUI> {
    proxies: {[name:string]: Tuid};
    proxyLinks: VmEntityLink[];

    constructor(crUsq: CrUsq, entity: Tuid, ui: TuidUI, res) {
        super(crUsq, entity, ui, res);
        let {owner} = this.entity;
        if (owner === undefined) {
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
    }

    get icon() {return vmLinkIcon('text-info', 'list-alt')}
}

export class CrTuid extends CrTuidBase {
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

export class CrTuidSelect extends CrTuidBase {
    protected async internalStart():Promise<void> {
        await this.showVm(this.VmTuidSelect);
    }
    protected get VmTuidSelect():typeof VmTuidSelect {return VmTuidSelect}
}
