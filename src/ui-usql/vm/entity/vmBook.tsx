import * as React from 'react';
import { Tuid, Book, Entity } from '../../entities';
import { VmEntity, vmLinkIcon } from './vmEnity';
import { Page } from 'tonva-tools';
import { VmApi } from '../vmApi';

/*
type TypeVmBook = new (vmApi:VmApi, book:Book) => VmBook;
const vmRegs:{[name:string]: TypeVmBook} = {};

export function regVmBook(name:string) {
    return (target: TypeVmBook) => {
        vmRegs[name.toLowerCase()] = target;
        return target;
    }
}
*/
export class VmBook extends VmEntity {
/*
    static create(vmApi:VmApi, book:Book) {
        let vq = vmRegs[book.name];
        return vq !== undefined? new vq(vmApi, book) : new VmBook(vmApi, book);
    }
    static get vmRegs() {return vmRegs}
*/
    entity: Book;

    get icon() {return vmLinkIcon('text-muted', 'book')}
    renderView() {
        return <Page header={this.caption}>
            Book
        </Page>
    }
}
