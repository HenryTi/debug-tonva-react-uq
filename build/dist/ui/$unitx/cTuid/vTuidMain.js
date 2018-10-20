import * as React from 'react';
import { VTuidMain } from "../../../ui-usql";
import { Page } from 'tonva-tools';
import { SearchBox, List, Muted } from 'tonva-react-form';
import { Button } from 'reactstrap';
export class MyVTuidMain extends VTuidMain {
    get view() {
        let { label, proxyLinks } = this.controller;
        return () => React.createElement(Page, { header: label }, proxyLinks === undefined ?
            React.createElement(React.Fragment, null,
                React.createElement(SearchBox, { className: "w-100", onSearch: this.onSearch, placeholder: '搜索' + label }),
                "\u6539\u5199\u7684TuidMain",
                React.createElement("div", { className: 'my-3' },
                    React.createElement(Button, { className: "ml-3", color: "primary", onClick: this.onNew }, "\u65B0\u589E"),
                    React.createElement(Button, { className: "ml-3", color: "primary", onClick: this.onList }, "\u5217\u8868"))) :
            React.createElement(List, { className: "my-2", header: React.createElement(Muted, null,
                    label,
                    " \u4EE3\u7406\u4E0B\u5217Tuid"), items: proxyLinks, item: { render: this.entityRender, onClick: this.entityClick } }));
    }
}
//# sourceMappingURL=vTuidMain.js.map