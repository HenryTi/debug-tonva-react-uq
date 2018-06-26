import * as React from 'react';
import { VmTuid } from '../entity';
import { Page, nav } from 'tonva-tools';
import { List } from 'tonva-react-form';
export class VmTuidSelect extends VmTuid {
    constructor(vmApi, tuid, vmTuidInput) {
        super(vmApi, tuid);
        this.vmTuidInput = vmTuidInput;
    }
    renderView() {
        return React.createElement(TuidSelect, { vm: this, row: Row });
    }
}
class Row extends React.Component {
    render() {
        return React.createElement("div", { className: "px-3 py-2" }, JSON.stringify(this.props.values));
    }
}
export class TuidSelect extends React.Component {
    constructor(props) {
        super(props);
        this.rows = [
            { id: 1, name: 'ddd' },
            { id: 2, name: 'xxx' },
        ];
        this.itemRender = this.itemRender.bind(this);
        this.itemClick = this.itemClick.bind(this);
    }
    itemRender(item, index) {
        return React.createElement(this.props.row, { values: item });
    }
    itemClick(item) {
        this.props.vm.vmTuidInput.vmFormRowTuidInput.setValue(item.id);
        nav.pop();
    }
    render() {
        return React.createElement(Page, { header: '选择 - ' + this.props.vm.entity.name },
            React.createElement(List, { items: this.rows, item: { render: this.itemRender, onClick: this.itemClick } }));
    }
}
//# sourceMappingURL=vmTuidSelect.js.map