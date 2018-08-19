import { EntityCoordinator } from "../VM";
import { Query } from "../../entities";
import { vmLinkIcon, EntityUI } from "../vmEntity";
import { VmQueryMain } from "./vmQueryMain";
import { VmQuerySelect } from "./vmQuerySelect";

export interface QueryUI extends EntityUI {
    //main: typeof VmQueryMain;
    //search: typeof VmQuerySearch;
}

export abstract class CrQueryBase extends EntityCoordinator<Query, QueryUI> {
    get icon() {return vmLinkIcon('text-warning', 'search')}
}

export class CrQuery extends CrQueryBase {
    protected async internalStart() {
        await this.showVm(this.VmQueryMain);
    }

    protected get VmQueryMain():typeof VmQueryMain {return VmQueryMain}
}

export class CrQuerySelect extends CrQueryBase {
    protected async internalStart() {
        await this.showVm(this.VmQuerySelect);
    }

    protected get VmQuerySelect():typeof VmQuerySelect {return VmQuerySelect}
}
