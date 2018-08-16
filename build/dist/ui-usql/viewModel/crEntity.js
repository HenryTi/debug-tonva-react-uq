import { Coordinator } from "./coordinator";
export class EntityCoordinator extends Coordinator {
    constructor(crApi, entity) {
        super(crApi);
        this.entity = entity;
    }
}
export class CrEntity extends EntityCoordinator {
}
//# sourceMappingURL=crEntity.js.map