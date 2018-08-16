import { Sheet } from "../../entities";
import { EntityCoordinator, Vm } from "../VM";
import { vmLinkIcon, EntityUI } from "../vmEntity";
import { VmSheetMain } from "./vmMain";
import { VmSheetNew } from "./vmNew";
import { VmSheetEdit } from "./vmEdit";
import { VmSheetAction } from "./vmSheetAction";
import { VmSheetSchema } from "./vmSchema";
import { VmArchives } from "./vmArchives";
import { VmSheetList } from "./vmList";
import { VmArchived } from "./vmArchived";

export interface SheetActionUI {
    label: string;
}

export interface StateUI {
    label: string;
    actions: {[name:string]: SheetActionUI}
}

export interface SheetUI extends EntityUI {
    states: {[name:string]: StateUI};
    main: typeof VmSheetMain;
    new: typeof VmSheetNew;
    edit: typeof VmSheetEdit;
    action: typeof VmSheetAction;
}

export class CrSheet extends EntityCoordinator<Sheet, SheetUI> {
    get icon() {return vmLinkIcon('text-primary', 'wpforms')}

    protected async internalStart() {
        await this.run(new this.VmSheetMain(this));
    }

    protected get VmSheetMain():typeof VmSheetMain {
        return (this.ui&&this.ui.main) || VmSheetMain;
    }

    protected async onReceive(msg: any) {
        //这个必须接上，否则没有websocket push
        //await super.onReceive(msg);
        this.entity.onReceive(msg);
    }

    protected get VmSheetNew(): typeof VmSheetNew {return VmSheetNew}
    protected get VmSheetEdit(): typeof VmSheetEdit {return VmSheetEdit}
    protected get VmSheetSchema(): typeof VmSheetSchema {return VmSheetSchema}
    protected get VmArchives(): typeof VmArchives {return VmArchives}
    protected get VmArchived(): typeof VmArchived {return VmArchived}
    protected get VmSheetList(): typeof VmSheetList {return VmSheetList}
    protected get VmSheetAction(): typeof VmSheetAction {return VmSheetAction}
    protected async onEvent(type:string, value:any) {
        let vm:Vm;
        switch (type) {
            default: return;
            case 'new': vm = new this.VmSheetNew(this); break;
            case 'schema': vm = new this.VmSheetSchema(this); break;
            case 'archives': vm = new this.VmArchives(this); break;
            case 'state': vm = new this.VmSheetList(this); break;
            case 'action': vm = new this.VmSheetAction(this); break;
            case 'archived': vm = new this.VmArchived(this); break;
        }
        await this.run(vm, value);
    }

    async showSheet(sheetId:number) {
        this.onEvent('action', sheetId);
        //await this.run(new this.VmSheetAction(this));
        //let vmAction = (this.ui && this.ui.action) || VmSheetAction;
        //await this.navVm(vmAction, sheetId);
    }

    private getStateUI(stateName:string) {
        let res = this.getRes();
        if (res === undefined) return;
        let {states} = res;
        if (states === undefined) return;
        return states[stateName];
    }
    getStateLabel(stateName:string) {
        let state = this.getStateUI(stateName);
        let ret = (state && state.label) || stateName;
        switch (ret) {
            default: return ret;
            case '$': return '新单';
        }
    }
    getActionLabel(stateName:string, actionName:string) {
        let state = this.getStateUI(stateName);
        if (state === undefined) return actionName;
        let actions = state.actions;
        if (actions === undefined) return actionName;
        let action = actions[actionName];
        return (action && action.label) || actionName;
    }

    /*
    async submit(values:any) {
        return this.entity.submit(values);
    }*/
}
