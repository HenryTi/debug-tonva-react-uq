import { VmEntity, vmLinkIcon } from '../vmEntity';
export class VmMap extends VmEntity {
    constructor(crUsq, map, ui) {
        super(crUsq, map, ui);
    }
    get icon() { return vmLinkIcon('text-muted', 'list-ul'); }
}
//# sourceMappingURL=vmMap.js.map