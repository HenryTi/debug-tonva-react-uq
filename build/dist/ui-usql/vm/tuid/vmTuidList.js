var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { VmTuidEdit } from './vmTuidEdit';
import { VmTuidSearch } from './vmTuidSearch';
export class VmTuidList extends VmTuidSearch {
    constructor() {
        super(...arguments);
        this.onSelected = (item) => __awaiter(this, void 0, void 0, function* () {
            let data = yield this.entity.load(item.id);
            let vmEdit = new (this.ui && this.ui.edit || VmTuidEdit)(this.crUsq, this.entity, this.ui);
            yield vmEdit.start(data);
        });
    }
}
//# sourceMappingURL=vmTuidList.js.map