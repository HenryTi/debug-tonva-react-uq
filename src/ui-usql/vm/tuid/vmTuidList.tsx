import * as React from 'react';
import { observer } from 'mobx-react';
import { FA, SearchBox, List } from 'tonva-react-form';
import { Tuid, Entity } from '../../entities';
import { Page, PagedItems } from 'tonva-tools';
import { VmTuid } from './vmTuid';
import { VmTuidEdit } from './vmTuidEdit';
import { VmTuidSearch } from './vmTuidSearch';

export class VmTuidList extends VmTuidSearch {
    onSelected = async (item:any) => {
        let data = await this.entity.load(item.id);
        //let vmEdit = new (this.ui && this.ui.edit || VmTuidEdit)(this.crUsq, this.entity, this.ui);
        //await vmEdit.start(data);
    }
}
