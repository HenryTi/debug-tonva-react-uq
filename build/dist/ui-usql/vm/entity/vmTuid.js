import * as React from 'react';
import { VmEntity, vmLinkIcon } from './vmEnity';
import { Page } from 'tonva-tools';
import { TuidContentJSON, VmTuidInput } from '../tuid';
const vmRegs = {};
export function regVmTuid(name, content, input) {
    return (target) => {
        vmRegs[name] = {
            type: target,
            input: input,
            content: content,
        };
        return target;
    };
}
export class VmTuid extends VmEntity {
    static create(vmApi, tuid) {
        let vq = vmRegs[tuid.name];
        return vq !== undefined ? new vq.type(vmApi, tuid) : new VmTuid(vmApi, tuid);
    }
    static get vmRegs() { return vmRegs; }
    get icon() { return vmLinkIcon('text-info', 'list-alt'); }
    get typeContent() {
        return TuidContentJSON;
    }
    get typeVmInput() {
        return VmTuidInput;
    }
    renderView() {
        return React.createElement(Page, { header: this.caption }, "Tuid");
    }
}
//# sourceMappingURL=vmTuid.js.map