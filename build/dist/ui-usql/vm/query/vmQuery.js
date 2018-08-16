import { VmEntity, vmLinkIcon } from '../vmEntity';
export class VmQuery extends VmEntity {
    constructor(crUsq, query, ui) {
        super(crUsq, query, ui);
    }
    get icon() { return vmLinkIcon('text-warning', 'search'); }
}
//# sourceMappingURL=vmQuery.js.map