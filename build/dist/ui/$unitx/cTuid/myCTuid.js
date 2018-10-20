import { CTuidMain } from "../../../ui-usql";
import { MyVTuidMain } from "./vTuidMain";
export class MyCTuid extends CTuidMain {
    get VTuidMain() { return MyVTuidMain; }
    buildSelect(field, arr, fieldTuidUI) {
        let { name } = field;
        switch (arr) {
            case undefined:
                switch (name) {
                    case 'fromUser':
                        return async (form, field, values) => {
                            let { _tuid } = field;
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
//# sourceMappingURL=myCTuid.js.map