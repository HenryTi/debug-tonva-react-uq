var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { EntityCoordinator } from "../VM";
import { vmLinkIcon } from "../vmEntity";
import { VmMapMain } from "./vmMain";
export class CrMap extends EntityCoordinator {
    get icon() { return vmLinkIcon('text-muted', 'list-ul'); }
    internalStart() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.showVm(this.VmMapMain);
        });
    }
    get VmMapMain() { return VmMapMain; }
}
//# sourceMappingURL=crMap.js.map