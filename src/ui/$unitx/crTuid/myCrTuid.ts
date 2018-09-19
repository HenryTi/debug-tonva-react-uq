import { CTuidMain, VTuidMain, Field, FieldCall, VForm, TuidMain } from "../../../ui-usql";
import { MyVmTuidMain } from "./vmTuidMain";

export class MyCrTuid extends CTuidMain {
    protected get VTuidMain():typeof VTuidMain {return MyVmTuidMain}

    protected buildCall(field:Field, arr:string):FieldCall {
        let {name, _tuid} = field;
        switch (arr) {
        case undefined:
            switch (name) {
            case 'fromUser':
                return async (form:VForm, field:string, values:any):Promise<any> => {
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
