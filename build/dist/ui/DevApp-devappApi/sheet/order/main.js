import * as React from 'react';
import { Page } from 'tonva-tools';
import { Button } from 'reactstrap';
import { List, Muted } from 'tonva-react-form';
import { VmSheetMain } from '../../../../ui-usql';
export class VmSheetMainOrder extends VmSheetMain {
    constructor() {
        super(...arguments);
        this.view = Main;
    }
}
const Main = ({ vm }) => {
    let { label, entity, newClick, schemaClick, renderState, sheetStateClick, archivesClick } = vm;
    let list = entity.statesCount.filter(row => row.count);
    return React.createElement(Page, { header: label },
        React.createElement("div", { className: "mx-3 my-2" }, "\u5B9A\u5236\u7684Order"),
        React.createElement("div", { className: "mx-3 my-2" },
            React.createElement(Button, { className: "mr-2", color: "primary", onClick: newClick }, "\u65B0\u5EFA"),
            React.createElement(Button, { className: "mr-2", color: "primary", onClick: schemaClick }, "\u6A21\u677F")),
        React.createElement(List, { className: "my-2", header: React.createElement(Muted, null,
                "\u5F85\u5904\u7406",
                label), none: "[ \u65E0 ]", items: list, item: { render: renderState, onClick: sheetStateClick } }),
        React.createElement("div", { className: "mx-3 my-2" },
            React.createElement(Button, { color: "primary", onClick: archivesClick },
                "\u5DF2\u5F52\u6863",
                label)));
};
//# sourceMappingURL=main.js.map