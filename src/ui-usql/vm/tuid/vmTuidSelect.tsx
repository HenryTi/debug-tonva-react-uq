import * as React from 'react';
import { observer } from 'mobx-react';
import { FA, SearchBox, List } from 'tonva-react-form';
import { Page, PagedItems } from 'tonva-tools';
import { Tuid, Entity, TuidBase } from '../../entities';
import { VmEntity } from '../VM';
import { VmTuidListBase } from './vmTuidList';

//export type TypeVmTuidList = typeof VmTuidList;

export class VmTuidSelect  extends VmTuidListBase {
    protected async onSelected(item:any): Promise<void> {
        this.return(item.id);
    }
}
