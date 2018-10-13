import * as React from 'react';
import { Page, meInFrame } from "tonva-tools";
import { CApp, CLink } from "../../ui-usql";
import { List } from 'tonva-react-form';
import { CMyOrder } from './jkOrder/myOrder';
export class CMyApp extends CApp {
    constructor() {
        super(...arguments);
        this.exLinks = [];
        this.exLinkRender = (exLink) => exLink.render();
        this.appPage = () => {
            return React.createElement(Page, { header: this.caption, logout: () => { meInFrame.unit = undefined; } },
                React.createElement(List, { items: this.exLinks, item: { render: this.exLinkRender } }),
                this.cUsqArr.map((v, i) => React.createElement("div", { key: i }, v.render())));
        };
    }
    async loadUsqs() {
        await super.loadUsqs();
        let cJkOrderUsq = this.cUsqCollection['JKDev/jkOrder'];
        let sheet = cJkOrderUsq.entities.sheet('order');
        let cMyOrder = new CMyOrder(cJkOrderUsq, sheet);
        this.exLinks.push(new CLink(cMyOrder));
    }
}
//# sourceMappingURL=index.js.map