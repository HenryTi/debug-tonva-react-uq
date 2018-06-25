import * as React from 'react';
import { Tuid, Action, Entity } from '../../entities';
import { VmEntity, vmLinkIcon } from './vmEnity';
import { Page, } from 'tonva-tools';
import { VmApi } from '../vmApi';

const vmRegs:{[name:string]: any} = {};

export function regVmAction(name:string) {
    return (target: any) => {
        vmRegs[name] = target;
        return target;
    }
}

export class VmAction extends VmEntity {
    static create(name:string, vmApi:VmApi, entity:Entity) {
        let vq = vmRegs[name];
        return vq !== undefined? new vq(vmApi, entity) : new VmAction(vmApi, entity);
    }
    static get vmRegs() {return vmRegs}

    protected entity: Action;

    get icon() {return vmLinkIcon('text-success', 'hand-o-right')}
    renderView() {
        return <Page header={this.caption}>
            Action
        </Page>
    }
}
