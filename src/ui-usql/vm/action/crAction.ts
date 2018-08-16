import { EntityCoordinator } from "../VM";
import { Action } from "../../entities";
import { vmLinkIcon, EntityUI } from "../vmEntity";
import { VmActionMain } from "./vmActionMain";

export interface ActionUI extends EntityUI {
    main: typeof VmActionMain,
}

export class CrAction extends EntityCoordinator<Action, ActionUI> {

    get icon() {return vmLinkIcon('text-success', 'hand-o-right')}

    protected async internalStart() {
        await this.run(new this.VmActionMain(this));
    }

    protected get VmActionMain():typeof VmActionMain {
        return (this.ui&&this.ui.main) || VmActionMain;
    }

    async submit(values:any) {
        return this.entity.submit(values);
    }
}
