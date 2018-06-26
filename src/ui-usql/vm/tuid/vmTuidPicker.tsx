import * as React from 'react';
import { observer } from 'mobx-react';
import { Button } from 'reactstrap';
import { Page, nav, PagedItems } from 'tonva-tools';
import { List, SearchBox } from 'tonva-react-form';
import { VmTuid } from './vmTuid';
import { VmApi } from '../vmApi';
import { Tuid } from '../../entities';
import { VmTuidInput, PickerConfig } from './vmTuidInput';
import { TypeContent, ContentProps } from './tuidContent';

export type TypeVmTuidPicker = typeof VmTuidPicker;

export class VmTuidPicker extends VmTuid {
    vmTuidInput: VmTuidInput;
    pagedItems: PagedItems<any>;

    constructor(vmApi: VmApi, tuid: Tuid, vmTuidInput: VmTuidInput, pagedItems?: PagedItems<any>) {
        super(vmApi, tuid);
        this.vmTuidInput = vmTuidInput;
        this.pagedItems = pagedItems || new PickerPagedItems(tuid);
    }
    renderView() {
        return <Picker vm={this} />;
    }
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

@observer
export class Picker extends React.Component<{vm:VmTuidPicker}> {
    private rows = [
        {id: 1, name: 'ddd'},
        {id: 2, name: 'xxx'},
    ];
    private vmTuidInput: VmTuidInput;
    private pickerConfig: PickerConfig;
    private row: TypeContent;
    private idFromValue: (values) => number;
    constructor(props) {
        super(props);
        this.itemRender = this.itemRender.bind(this);
        this.itemClick = this.itemClick.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.vmTuidInput = this.props.vm.vmTuidInput;
        this.pickerConfig = this.vmTuidInput.pickerConfig;
        this.row = this.pickerConfig.row;
        this.idFromValue = this.pickerConfig.idFromValue;
        if (this.idFromValue === undefined) this.idFromValue = (values) => values.id;
    }
    private itemRender(item:any, index:number):JSX.Element {
        return <this.row values={item} />
    }
    private itemClick(item:any) {
        let id = this.idFromValue(item);
        this.vmTuidInput.idChanged(id);
        nav.pop();
    }
    private async onSearch(key:string) {
        await this.props.vm.pagedItems.first(key);
    }
    render() {
        let {vm} = this.props;
        let header = <SearchBox className="w-100" onSearch={this.onSearch} 
            placeholder={'搜索 - ' + vm.entity.name} />;
        return <Page header={header}>
            <List
                items={vm.pagedItems.items} 
                item={{render: this.itemRender, onClick: this.itemClick}} />
        </Page>;
    }
}