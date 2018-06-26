import * as React from 'react';
import { VmEntity, vmLinkIcon } from './vmEnity';
import { Page } from 'tonva-tools';
const vmRegs = {};
export function regVmBook(name) {
    return (target) => {
        vmRegs[name] = target;
        return target;
    };
}
export class VmBook extends VmEntity {
    static create(name, vmApi, book) {
        let vq = vmRegs[name];
        return vq !== undefined ? new vq(vmApi, book) : new VmBook(vmApi, book);
    }
    static get vmRegs() { return vmRegs; }
    get icon() { return vmLinkIcon('text-muted', 'book'); }
    renderView() {
        return React.createElement(Page, { header: this.caption }, "Book");
    }
}
//# sourceMappingURL=vmBook.js.map