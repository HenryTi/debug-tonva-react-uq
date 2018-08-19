import { EntityCoordinator } from "../VM";
import { Action } from "../../entities";
import { vmLinkIcon, EntityUI } from "../vmEntity";
import { VmActionMain } from "./vmActionMain";

export interface ActionUI extends EntityUI {
    //main: typeof VmActionMain,
}

export class CrAction extends EntityCoordinator<Action, ActionUI> {

    get icon() {return vmLinkIcon('text-success', 'hand-o-right')}

    protected async internalStart() {
        await this.showVm(this.VmActionMain);
    }

    protected get VmActionMain():typeof VmActionMain {return VmActionMain}

    async submit(values:any) {
        return this.entity.submit(values);
    }
}
