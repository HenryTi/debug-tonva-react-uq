import * as React from 'react';
import { Tuid, Sheet, Entity } from '../../entities';
import { VmEntity, vmLinkIcon } from './vmEnity';
import { Page } from 'tonva-tools';
import { VmApi } from '../vmApi';

/*
const vmRegs:{[name:string]: any} = {};

export function regVmSheet(name:string) {
    return (target: any) => {
        vmRegs[name.toLowerCase()] = target;
        return target;
    }
}
*/
export class VmSheet extends VmEntity {
/*
    static create(vmApi:VmApi, sheet:Sheet) {
        let vq = vmRegs[sheet.name];
        return vq !== undefined? new vq(vmApi, sheet) : new VmSheet(vmApi, sheet);
    }
    static get vmRegs() {return vmRegs}
*/
    entity: Sheet;

    get icon() {return vmLinkIcon('text-primary', 'wpforms')}
    renderView() {
        return <Page header={this.caption}>
            Sheet
        </Page>
    }
}
