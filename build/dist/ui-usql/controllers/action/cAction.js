import { CEntity } from "../VM";
import { VActionMain } from "./vActionMain";
import { entitiesRes } from '../../res';
export class CAction extends CEntity {
    get icon() { return entitiesRes['action'].icon; }
    async internalStart() {
        await this.showVPage(this.VActionMain);
    }
    get VActionMain() { return VActionMain; }
    async submit(values) {
        return this.entity.submit(values);
    }
}
//# sourceMappingURL=cAction.js.map