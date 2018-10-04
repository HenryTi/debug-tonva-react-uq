var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    loadUsqs() {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            yield _super("loadUsqs").call(this);
            let cJkOrderUsq = this.cUsqCollection['JKDev/jkOrder'];
            let sheet = cJkOrderUsq.entities.sheet('order');
            let cMyOrder = new CMyOrder(cJkOrderUsq, sheet);
            this.exLinks.push(new CLink(cMyOrder));
        });
    }
}
//# sourceMappingURL=index.js.map