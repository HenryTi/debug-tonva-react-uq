import { EntityCoordinator } from "../VM";
import { Map } from "../../entities";
import { vmLinkIcon, EntityUI } from "../vmEntity";
import { VmMapMain } from "./vmMain";

export interface MapUI extends EntityUI {
    main: typeof VmMapMain,
}

export class CrMap extends EntityCoordinator<Map, MapUI> {

    get icon() {return vmLinkIcon('text-muted', 'list-ul')}

    protected async internalStart() {
        await this.run(new this.VmMapMain(this));
    }

    protected get VmMapMain():typeof VmMapMain {
        return (this.ui&&this.ui.main) || VmMapMain;
    }
    /*
    async submit(values:any) {
        return this.entity.submit(values);
    }*/
}
