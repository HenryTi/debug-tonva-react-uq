import { EntityCoordinator } from "../VM";
import { Query } from "../../entities";
import { vmLinkIcon, EntityUI } from "../vmEntity";
import { VmQueryMain } from "./vmQueryMain";
import { VmQuerySearch } from "./vmQuerySearch";

export interface QueryUI extends EntityUI {
    main: typeof VmQueryMain;
    search: typeof VmQuerySearch;
}

export class CrQuery extends EntityCoordinator<Query, QueryUI> {

    get icon() {return vmLinkIcon('text-warning', 'search')}

    protected async internalStart() {
        await this.run(new this.VmQueryMain(this));
    }

    protected get VmQueryMain():typeof VmQueryMain {
        return (this.ui&&this.ui.main) || VmQueryMain;
    }
    /*
    async submit(values:any) {
        return this.entity.submit(values);
    }*/
}
