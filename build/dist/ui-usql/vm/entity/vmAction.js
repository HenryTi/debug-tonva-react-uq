import * as React from 'react';
import { VmEntity, vmLinkIcon } from './vmEnity';
import { Page, } from 'tonva-tools';
const vmRegs = {};
export function regVmAction(name) {
    return (target) => {
        vmRegs[name] = target;
        return target;
    };
}
export class VmAction extends VmEntity {
    static create(vmApi, action) {
        let vq = vmRegs[action.name];
        return vq !== undefined ? new vq(vmApi, action) : new VmAction(vmApi, action);
    }
    static get vmRegs() { return vmRegs; }
    get icon() { return vmLinkIcon('text-success', 'hand-o-right'); }
    renderView() {
        return React.createElement(Page, { header: this.caption }, "Action");
    }
}
//# sourceMappingURL=vmAction.js.map