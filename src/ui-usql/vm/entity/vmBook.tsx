import * as React from 'react';
import { Tuid, Book, Entity } from '../../entities';
import { VmEntity, vmLinkIcon } from './vmEnity';
import { Page } from 'tonva-tools';
import { VmApi } from '../vmApi';

const vmRegs:{[name:string]: any} = {};

export function regVmBook(name:string) {
    return (target: any) => {
        vmRegs[name] = target;
        return target;
    }
}

export class VmBook extends VmEntity {
    static create(name:string, vmApi:VmApi, entity:Entity) {
        let vq = vmRegs[name];
        return vq !== undefined? new vq(vmApi, entity) : new VmBook(vmApi, entity);
    }
    static get vmRegs() {return vmRegs}

    protected entity: Book;

    get icon() {return vmLinkIcon('text-muted', 'book')}
    renderView() {
        return <Page header={this.caption}>
            Book
        </Page>
    }
}
