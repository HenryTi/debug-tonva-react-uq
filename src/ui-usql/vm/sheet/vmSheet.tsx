import * as React from 'react';
import { Page } from 'tonva-tools';
import {List, Muted, LMR, EasyDate, FA} from 'tonva-react-form';
import { Tuid, Sheet, Entity } from '../../entities';
import { VmEntity, vmLinkIcon, EntityUI } from '../vmEntity';
import { CrUsq } from '../crUsq';
import { VmSheetMain } from './vmMain';
import { VmSheetNew } from './vmNew';
import { VmSheetEdit } from './vmEdit';
import { VmSheetAction } from './vmSheetAction';

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

export abstract class VmSheet extends VmEntity {
    protected ui: SheetUI;

    constructor(crUsq:CrUsq, sheet:Sheet, ui?:SheetUI) {
        super(crUsq, sheet, ui);
    }

    entity: Sheet;

    get icon() {return vmLinkIcon('text-primary', 'wpforms')}
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
}
