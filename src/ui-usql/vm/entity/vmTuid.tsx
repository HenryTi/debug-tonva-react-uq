import * as React from 'react';
import { Tuid, Entity } from '../../entities';
import { VmEntity, vmLinkIcon } from './vmEnity';
import { Page } from 'tonva-tools';
import { VmApi } from '../vmApi';

const vmRegs:{[name:string]: any} = {};

export function regVmTuid(name:string) {
    return (target: any) => {
        vmRegs[name] = target;
        return target;
    }
}

export class VmTuid extends VmEntity {
    static create(name:string, vmApi:VmApi, entity:Entity) {
        let vq = vmRegs[name];
        return vq !== undefined? new vq(vmApi, entity) : new VmTuid(vmApi, entity);
    }
    static get vmRegs() {return vmRegs}

    protected entity: Tuid;

    get icon() {return vmLinkIcon('text-info', 'list-alt')}
    renderView() {
        return <Page header={this.caption}>
            Tuid
        </Page>
    }
}
