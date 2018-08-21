import { EntityCoordinator } from "../VM";
import { Query } from "../../entities";
import { EntityUI } from "../entityUI";
import { VmQueryMain } from "./vmQueryMain";
import { VmQuerySelect } from "./vmQuerySelect";
import { vmLinkIcon } from '../link';

export interface QueryUI extends EntityUI {
    CrQuery?: typeof CrQuery;
    main: typeof VmQueryMain;
    //search: typeof VmQuerySearch;
}

export abstract class CrQueryBase extends EntityCoordinator<Query, QueryUI> {
    get icon() {return vmLinkIcon('text-warning', 'search')}
}

export class CrQuery extends CrQueryBase {
    protected async internalStart() {
        await this.showVm(this.VmQueryMain);
    }

    protected get VmQueryMain():typeof VmQueryMain {return this.ui && this.ui.main || VmQueryMain}
}

export class CrQuerySelect extends CrQueryBase {
    protected async internalStart() {
        await this.showVm(this.VmQuerySelect);
    }

    protected get VmQuerySelect():typeof VmQuerySelect {return VmQuerySelect}
}
