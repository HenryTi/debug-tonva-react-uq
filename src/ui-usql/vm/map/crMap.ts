import { EntityCoordinator } from "../VM";
import { Map } from "../../entities";
import { EntityUI } from "../entityUI";
import { VmMapMain } from "./vmMain";
import { vmLinkIcon } from '../link';

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
