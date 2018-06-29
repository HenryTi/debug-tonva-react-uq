import { VmEntity, vmLinkIcon } from '../entity';
export class VmSheet extends VmEntity {
    constructor(vmApi, sheet) {
        super(vmApi, sheet);
    }
    get icon() { return vmLinkIcon('text-primary', 'wpforms'); }
}
//# sourceMappingURL=vmSheet.js.map