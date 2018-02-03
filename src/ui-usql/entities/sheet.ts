import {Entity} from './entity';

export interface SheetState {
    name: string;
    actions: SheetAction[];
}

export interface SheetAction {
    name: string;
}

export class Sheet extends Entity {
    states: SheetState[] = [];

    setStates(states: SheetState[]) {
        for (let state of states) {
            this.setStateAccess(this.states.find(s=>s.name==state.name), state);
        }
    }
    private setStateAccess(s:SheetState, s1:SheetState) {
        if (s === undefined) return;
        for (let action of s1.actions) {
            let acn = action.name;
            let ac = s.actions.find(a=>a.name === acn);
            if (ac === undefined) continue;
            s.actions.push(action);
        }
    }
    save(discription:string, data:any) {
        let text = this.entities.pack(this.schema, data);
        return this.tvApi.sheetSave(this.name, {discription: discription, data:text});
    }
    action(id:number, flow:number, state:string, action:string) {
        return this.tvApi.sheetAction(this.name, {id:id, flow:flow, state:state, action:action});
    }
    getStateSheets(state:string, pageStart:number, pageSize:number) {
        return this.tvApi.stateSheets(this.name, {state:state, pageStart:pageStart, pageSize:pageSize});
    }
    getStateSheetCount() {
        return this.tvApi.stateSheetCount(this.name);
    }
    getSheet(id:number) {
        return this.tvApi.getSheet(this.name, id);
    }
    getArchives(pageStart:number, pageSize:number) {
        return this.tvApi.sheetArchives(this.name, {pageStart:pageStart, pageSize:pageSize})
    }
    getArchive(id:number) {
        return this.tvApi.sheetArchive(this.name, id)
    }
}
