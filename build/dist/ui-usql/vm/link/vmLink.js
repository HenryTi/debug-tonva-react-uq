var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as React from 'react';
import { nav } from 'tonva-tools';
import { ViewModel } from '../viewModel';
export class VmLink extends ViewModel {
}
export class VmEntityLink extends VmLink {
    constructor(vmEntity) {
        super();
        this.vmEntity = vmEntity;
        this.onClick = this.onClick.bind(this);
    }
    onClick() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.vmEntity.load();
            nav.push(this.vmEntity.renderView());
        });
    }
    renderView() {
        return React.createElement("div", { className: "px-3 py-2  align-items-center" },
            this.vmEntity.icon,
            " \u00A0 ",
            this.vmEntity.caption);
    }
}
export class VmTuidLink extends VmEntityLink {
}
export class VmActionLink extends VmEntityLink {
}
export class VmQueryLink extends VmEntityLink {
}
export class VmSheetLink extends VmEntityLink {
}
export class VmBookLink extends VmEntityLink {
}
//# sourceMappingURL=vmLink.js.map