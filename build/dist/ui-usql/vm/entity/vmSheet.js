import * as React from 'react';
import { VmEntity, vmLinkIcon } from './vmEnity';
import { Page } from 'tonva-tools';
const vmRegs = {};
export function regVmSheet(name) {
    return (target) => {
        vmRegs[name] = target;
        return target;
    };
}
export class VmSheet extends VmEntity {
    static create(name, vmApi, entity) {
        let vq = vmRegs[name];
        return vq !== undefined ? new vq(vmApi, entity) : new VmSheet(vmApi, entity);
    }
    static get vmRegs() { return vmRegs; }
    get icon() { return vmLinkIcon('text-primary', 'wpforms'); }
    renderView() {
        return React.createElement(Page, { header: this.caption }, "Sheet");
    }
}
//# sourceMappingURL=vmSheet.js.map