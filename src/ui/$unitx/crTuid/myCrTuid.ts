import { CrTuid, VmTuidMain, Field, FieldCall, VmForm, Tuid } from "../../../ui-usql";
import { MyVmTuidMain } from "./vmTuidMain";

export class MyCrTuid extends CrTuid {
    protected get VmTuidMain():typeof VmTuidMain {return MyVmTuidMain}

    protected buildCall(field:Field, arr:string):FieldCall {
        let {name, _tuid} = field;
        switch (arr) {
        case undefined:
            switch (name) {
            case 'fromUser':
                return async (form:VmForm, field:string, values:any):Promise<any> => {
                    let crTuidSelect = this.crUsq.crTuidSelect(_tuid as Tuid);
                    let ret = await crTuidSelect.call();
                    return ret.id;
                };
            }
            break;
        }
        return super.buildCall(field, arr);
    }
}
