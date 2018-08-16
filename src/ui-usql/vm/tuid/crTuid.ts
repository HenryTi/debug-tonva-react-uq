import { EntityCoordinator, Vm } from "../VM";
import { Tuid } from "../../entities";
import { EntityUI, vmLinkIcon } from "../vmEntity";
import { VmTuidMain } from './vmTuidMain';
import { VmTuidEdit } from './vmTuidEdit';
import { VmTuidView } from './vmView';
import { VmTuidSearch } from './vmTuidSearch';
import { RowContent } from '../viewModel';
import { VmTuidControl, PickerConfig } from '../form';
import { CrUsq } from "../crUsq";
import { VmEntityLink } from "../link";
import { VmTuidList } from "./vmTuidList";

export interface TuidUI extends EntityUI {
    main: typeof VmTuidMain;
    edit: typeof VmTuidEdit;
    view: typeof VmTuidView;
    search: typeof VmTuidSearch;
    content: typeof RowContent;
    input: typeof VmTuidControl;
    pickerConfig: PickerConfig;
}

export class CrTuid extends EntityCoordinator<Tuid, TuidUI> {
    proxies: {[name:string]: Tuid};
    proxyLinks: VmEntityLink[];

    constructor(crUsq: CrUsq, entity: Tuid, ui: TuidUI) {
        super(crUsq, entity, ui);
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

    protected get VmTuidMain():typeof VmTuidMain {return VmTuidMain}
    protected get VmTuidEdit():typeof VmTuidEdit {return VmTuidEdit}
    protected get VmTuidList():typeof VmTuidList {return VmTuidList}

    protected async internalStart():Promise<void> {
        await this.show(new this.VmTuidMain(this));
    }

    protected async onEvent(type:string, value:any) {
        let vm:Vm;
        switch (type) {
            default: return;
            case 'new': vm = new this.VmTuidEdit(this); break;
            case 'list': vm = new this.VmTuidList(this); break;
        }
        await this.run(vm);
    }
}
