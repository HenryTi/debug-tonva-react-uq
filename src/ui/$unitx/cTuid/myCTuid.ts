import { CTuidMain, VTuidMain, Field, FieldCall, VForm, TuidMain } from "../../../ui-usql";
import { MyVTuidMain } from "./vTuidMain";

export class MyCTuid extends CTuidMain {
    protected get VTuidMain():typeof VTuidMain {return MyVTuidMain}

    protected buildCall(field:Field, arr:string):FieldCall {
        let {name, _tuid} = field;
        switch (arr) {
        case undefined:
            switch (name) {
            case 'fromUser':
                return async (form:VForm, field:string, values:any):Promise<any> => {
                    let cTuidSelect = this.cUsq.cTuidSelect(_tuid as TuidMain);
                    let ret = await cTuidSelect.call();
                    return ret.id;
                };
            }
            break;
        }
        return super.buildCall(field, arr);
    }
}
