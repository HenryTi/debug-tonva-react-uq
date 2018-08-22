import { CrTuidMain, VmTuidMain, Field, FieldCall, VmForm, TuidMain } from "../../../ui-usql";
import { MyVmTuidMain } from "./vmTuidMain";

export class MyCrTuid extends CrTuidMain {
    protected get VmTuidMain():typeof VmTuidMain {return MyVmTuidMain}

    protected buildCall(field:Field, arr:string):FieldCall {
        let {name, _tuid} = field;
        switch (arr) {
        case undefined:
            switch (name) {
            case 'fromUser':
                return async (form:VmForm, field:string, values:any):Promise<any> => {
                    let crTuidSelect = this.crUsq.crTuidSelect(_tuid as TuidMain);
                    let ret = await crTuidSelect.call();
                    return ret.id;
                };
            }
            break;
        }
        return super.buildCall(field, arr);
    }
}
