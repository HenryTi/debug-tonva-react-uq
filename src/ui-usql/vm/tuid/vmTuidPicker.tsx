import * as React from 'react';
import { observer } from 'mobx-react';
import { Page, nav, PagedItems } from 'tonva-tools';
import { List, SearchBox } from 'tonva-react-form';
import { Tuid } from '../../entities';
import { VmTuid } from './vmTuid';
import { VmApi } from '../vmApi';
import { TypeContent } from '../viewModel';
import { VmTuidInput, PickerConfig } from './vmTuidInput';

export type TypeVmTuidPicker = typeof VmTuidPicker;

export class VmTuidPicker extends VmTuid {
    private row: TypeContent;

    vmTuidInput: VmTuidInput;
    pagedItems: PagedItems<any>;
    idFromValue: (values) => number;

    constructor(vmApi: VmApi, tuid: Tuid, vmTuidInput: VmTuidInput, pagedItems?: PagedItems<any>) {
        super(vmApi, tuid);
        this.vmTuidInput = vmTuidInput;
        this.pagedItems = pagedItems || new PickerPagedItems(tuid);
        let pc = this.vmTuidInput.pickerConfig;
        this.row = pc.row;
        this.idFromValue = pc.idFromValue;
        if (this.idFromValue === undefined) this.idFromValue = (values) => values.id;
    }

    itemRender = (item:any, index:number):JSX.Element => <this.row values={item} />;
    itemClick = (item:any) => {
        let id = this.idFromValue(item);
        this.vmTuidInput.idChanged(id);
        nav.pop();
    }
    onSearch = async (key:string) => {
        await this.pagedItems.first(key);
    }

    protected view = Picker;
}

class PickerPagedItems extends PagedItems<any> {
    private tuid: Tuid;
    constructor(tuid: Tuid) {
        super();
        this.tuid = tuid;
    }

    async load():Promise<any[]> {
        let ret = await this.tuid.search(this.param, this.pageStart, this.pageSize);
        return ret;
    }
    protected setPageStart(item:any) {
        if (item === undefined)
            this.pageStart = 0;
        else
            this.pageStart = item.id;
    }
}

const Picker = observer(({vm}:{vm:VmTuidPicker}) => {
    let {onSearch, itemRender, itemClick} = vm;
    let header = <SearchBox className="w-100" onSearch={onSearch} 
        placeholder={'搜索 - ' + vm.entity.name} />;
    return <Page header={header}>
        <List
            items={vm.pagedItems.items} 
            item={{render: itemRender, onClick: itemClick}} />
    </Page>;
});
