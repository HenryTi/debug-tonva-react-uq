var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as React from 'react';
import { ViewModel } from '../viewModel';
export class VmLink extends ViewModel {
}
export class VmEntityLink extends VmLink {
    constructor(vmEntity) {
        super();
        this.view = Link;
        this.onClick = () => __awaiter(this, void 0, void 0, function* () {
            yield this.vmEntity.start();
        });
        this.vmEntity = vmEntity;
    }
}
export class EntityLink {
    constructor(crUsq, entity) {
        this.onClick = () => __awaiter(this, void 0, void 0, function* () {
        });
        this.crUsq = crUsq;
        this.entity = entity;
    }
}
const Link = ({ vm }) => {
    let { vmEntity } = vm;
    return React.createElement("div", { className: "px-3 py-2  align-items-center" },
        vmEntity.icon,
        " \u00A0 ",
        vmEntity.label);
};
//# sourceMappingURL=vmLink.js.map