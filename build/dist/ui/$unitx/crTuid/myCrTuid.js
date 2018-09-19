var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { CTuidMain } from "../../../ui-usql";
import { MyVmTuidMain } from "./vmTuidMain";
export class MyCrTuid extends CTuidMain {
    get VTuidMain() { return MyVmTuidMain; }
    buildCall(field, arr) {
        let { name, _tuid } = field;
        switch (arr) {
            case undefined:
                switch (name) {
                    case 'fromUser':
                        return (form, field, values) => __awaiter(this, void 0, void 0, function* () {
                            let crTuidSelect = this.crUsq.crTuidSelect(_tuid);
                            let ret = yield crTuidSelect.call();
                            return ret.id;
                        });
                }
                break;
        }
        return super.buildCall(field, arr);
    }
}
//# sourceMappingURL=myCrTuid.js.map