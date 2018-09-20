import React from "react";
import { List, Muted } from "tonva-react-form";
import { CLink } from "../link";
import { View } from "tonva-tools";
export class VUsq extends View {
    constructor(cUsq) {
        super(cUsq);
        this.isSysVisible = false;
        this.view = () => {
            let { res, usq } = this.controller;
            let linkItem = {
                render: (cLink, index) => cLink.render(),
                onClick: undefined,
            };
            let lists = [
                {
                    header: res.tuid || 'TUID',
                    items: this.tuidLinks,
                },
                {
                    cn: 'my-2',
                    header: res.map || 'MAP',
                    items: this.mapLinks,
                },
                {
                    cn: 'my-2',
                    header: res.sheet || 'SHEET',
                    items: this.sheetLinks
                },
                {
                    cn: 'my-2',
                    header: res.action || 'ACTION',
                    items: this.actionLinks
                },
                {
                    cn: 'my-2',
                    header: res.query || 'QUERY',
                    items: this.queryLinks
                },
                {
                    cn: 'mt-2 mb-4',
                    header: res.book || 'BOOK',
                    items: this.bookLinks
                }
            ];
            return React.createElement(React.Fragment, null,
                React.createElement("div", { className: "px-3 py-1 small" }, res.usq || usq),
                lists.map(({ cn, header, items }, index) => items.length > 0 && React.createElement(List, { key: index, className: cn, header: React.createElement("div", { className: "px-3 py-1 bg-light" },
                        React.createElement(Muted, null, header)), items: items, item: linkItem })));
        };
        let { tuidArr, mapArr, sheetArr, actionArr, queryArr, bookArr } = cUsq.entities;
        this.tuidLinks = tuidArr.filter(v => this.isVisible(v)).map(v => new CLink(this.controller.cTuidMain(v)));
        this.mapLinks = mapArr.filter(v => this.isVisible(v)).map(v => new CLink(this.controller.cMap(v)));
        this.sheetLinks = sheetArr.filter(v => this.isVisible(v)).map(v => new CLink(this.controller.cSheet(v)));
        this.actionLinks = actionArr.filter(v => this.isVisible(v)).map(v => new CLink(this.controller.cAction(v)));
        this.queryLinks = queryArr.filter(v => this.isVisible(v)).map(v => new CLink(this.controller.cQuery(v)));
        this.bookLinks = bookArr.filter(v => this.isVisible(v)).map(v => new CLink(this.controller.cBook(v)));
    }
    isVisible(entity) {
        return entity.sys !== true || this.isSysVisible;
    }
    render(param) {
        if (this.view === undefined)
            return React.createElement("div", null, "??? viewModel \u5FC5\u987B\u5B9A\u4E49 view ???");
        return React.createElement(this.view);
    }
}
//# sourceMappingURL=vUsq.js.map