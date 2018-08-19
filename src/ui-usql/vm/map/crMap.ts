import { EntityCoordinator } from "../VM";
import { Map } from "../../entities";
import { vmLinkIcon, EntityUI } from "../vmEntity";
import { VmMapMain } from "./vmMain";

export interface MapUI extends EntityUI {
    //main: typeof VmMapMain,
}

export class CrMap extends EntityCoordinator<Map, MapUI> {

    get icon() {return vmLinkIcon('text-muted', 'list-ul')}

    protected async internalStart() {
        await this.showVm(this.VmMapMain);
    }

    protected get VmMapMain():typeof VmMapMain {return VmMapMain}
    /*
    async submit(values:any) {
        return this.entity.submit(values);
    }*/
}
