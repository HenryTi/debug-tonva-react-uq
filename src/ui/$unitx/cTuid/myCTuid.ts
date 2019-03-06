import { CTuidMain, VTuidMain, Field, FieldCall, VForm, TuidMain, FieldTuidUI } from "tonva-react-uq";
import { MyVTuidMain } from "./vTuidMain";

export class MyCTuid extends CTuidMain {
    protected get VTuidMain():typeof VTuidMain {return MyVTuidMain}

    protected buildSelect(field:Field, arr:string, fieldTuidUI: FieldTuidUI):FieldCall {
        let {name} = field;
        switch (arr) {
        case undefined:
            switch (name) {
            case 'fromUser':
                return async (form:VForm, field:Field, values:any):Promise<any> => {
                    let {_tuid} = field;
                    let cTuidSelect = this.cUsq.cTuidSelect(_tuid);
                    let ret = await cTuidSelect.call();
                    return ret.id;
                };
            }
            break;
        }
        return super.buildSelect(field, arr, fieldTuidUI);
    }
}
