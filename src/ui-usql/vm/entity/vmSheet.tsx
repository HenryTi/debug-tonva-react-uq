import * as React from 'react';
import { Tuid, Sheet, Entity } from '../../entities';
import { VmEntity, vmLinkIcon } from './vmEnity';
import { Page } from 'tonva-tools';
import { VmApi } from '../vmApi';

const vmRegs:{[name:string]: any} = {};

export function regVmSheet(name:string) {
    return (target: any) => {
        vmRegs[name] = target;
        return target;
    }
}

export class VmSheet extends VmEntity {
    static create(name:string, vmApi:VmApi, entity:Entity) {
        let vq = vmRegs[name];
        return vq !== undefined? new vq(vmApi, entity) : new VmSheet(vmApi, entity);
    }
    static get vmRegs() {return vmRegs}

    protected entity: Sheet;

    get icon() {return vmLinkIcon('text-primary', 'wpforms')}
    renderView() {
        return <Page header={this.caption}>
            Sheet
        </Page>
    }
}
