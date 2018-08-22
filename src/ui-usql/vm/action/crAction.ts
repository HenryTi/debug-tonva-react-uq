import { CrEntity, EntityUI } from "../VM";
import { Action } from "../../entities";
import { VmActionMain } from "./vmActionMain";
import { vmLinkIcon } from '../link';

export interface ActionUI extends EntityUI {
    //main: typeof VmActionMain,
}

export class CrAction extends CrEntity<Action, ActionUI> {

    get icon() {return vmLinkIcon('text-success', 'hand-o-right')}

    protected async internalStart() {
        await this.showVm(this.VmActionMain);
    }

    protected get VmActionMain():typeof VmActionMain {return VmActionMain}

    async submit(values:any) {
        return this.entity.submit(values);
    }
}
