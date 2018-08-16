import * as React from 'react';
import { Tuid, Book, Entity } from '../../entities';
import { VmEntity, vmLinkIcon } from '../vmEntity';
import { Page } from 'tonva-tools';
import { CrUsq } from '../crUsq';
import { Vm_Entity } from '../VM';
import { CrBook } from './crBook';

export class VmBookMain extends Vm_Entity<Book> {
    protected coordinator: CrBook;

    protected async showEntryPage(param?:any):Promise<void> {
        this.open(this.view);
    }

    protected view = () => <Page header={this.label}>
        Book
    </Page>;
}
