var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { CTuidMain } from "tonva-react-usql";
import { MyVTuidMain } from "./vTuidMain";
export class MyCTuid extends CTuidMain {
    get VTuidMain() { return MyVTuidMain; }
    buildSelect(field, arr, fieldTuidUI) {
        let { name } = field;
        switch (arr) {
            case undefined:
                switch (name) {
                    case 'fromUser':
                        return (form, field, values) => __awaiter(this, void 0, void 0, function* () {
                            let { _tuid } = field;
                            let cTuidSelect = this.cUsq.cTuidSelect(_tuid);
                            let ret = yield cTuidSelect.call();
                            return ret.id;
                        });
                }
                break;
        }
        return super.buildSelect(field, arr, fieldTuidUI);
    }
}
//# sourceMappingURL=myCTuid.js.map