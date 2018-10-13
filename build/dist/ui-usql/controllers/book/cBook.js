import { CEntity } from "../VM";
import { VBookMain } from "./vBookMain";
import { entitiesRes } from '../../res';
export class CBook extends CEntity {
    get icon() { return entitiesRes['action'].icon; }
    async internalStart() {
        await this.showVPage(this.VBookMain);
    }
    get VBookMain() { return VBookMain; }
}
//# sourceMappingURL=cBook.js.map