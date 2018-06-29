import * as React from 'react';
import { Button } from 'reactstrap';
import { Page } from 'tonva-tools';
import { List, Muted } from 'tonva-react-form';
import { VmSheet } from './vmSheet';
export class VmSheetMain extends VmSheet {
    constructor() {
        super(...arguments);
        this.newClick = () => { this.nav(VmSheetA); };
        this.schemaClick = () => { this.nav(VmSheetA); };
        this.archivesClick = () => { this.nav(VmSheetA); };
        this.sheetStateClick = () => { this.nav(VmSheetA); };
        this.renderState = (item, index) => {
            return React.createElement("div", null);
        };
        this.view = Main;
    }
}
const Main = ({ vm }) => {
    let { caption, entity, newClick, schemaClick, renderState, sheetStateClick, archivesClick } = vm;
    return React.createElement(Page, { header: caption },
        React.createElement("div", { className: "mx-3 my-2" },
            React.createElement(Button, { className: "mr-2", color: "primary", onClick: newClick }, "\u65B0\u5EFA"),
            React.createElement(Button, { className: "mr-2", color: "primary", onClick: schemaClick }, "\u6A21\u677F")),
        React.createElement(List, { className: "my-2", header: React.createElement(Muted, null,
                "\u5F85\u5904\u7406",
                caption), none: "[ \u65E0 ]", items: entity.statesCount.filter(row => row.count), item: { render: renderState, onClick: sheetStateClick } }),
        React.createElement("div", { className: "mx-3 my-2" },
            React.createElement(Button, { color: "primary", onClick: archivesClick },
                "\u5DF2\u5F52\u6863",
                caption)));
};
class VmSheetA extends VmSheet {
    constructor() {
        super(...arguments);
        this.view = A;
    }
}
const A = ({ vm }) => {
    return React.createElement(Page, { header: "a" }, "a");
};
//# sourceMappingURL=vmSheetMain.js.map