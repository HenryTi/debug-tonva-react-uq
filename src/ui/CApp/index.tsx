import * as React from 'react';
import { Page, meInFrame, Controller } from "tonva-tools";
import { CApp, Link, CLink, CUsq, CSheet, Sheet } from "../../ui-usql";
import { FA, List } from 'tonva-react-form';
import { CMyOrder } from './jkOrder/myOrder';

export class CMyApp extends CApp {
    private exLinks: Link[] = [];

    protected async loadUsqs() {
        await super.loadUsqs();
        let cJkOrderUsq = this.cUsqCollection['JKDev/jkOrder'];
        let sheet = cJkOrderUsq.entities.sheet('order');
        let cMyOrder = new CMyOrder(cJkOrderUsq, sheet);
        this.exLinks.push(new CLink(cMyOrder));
    }

    private exLinkRender = (exLink: Link) => exLink.render();

    protected appPage = () => {
        return <Page header={this.caption} logout={()=>{meInFrame.unit = undefined}}>
            <List items={this.exLinks} item={{render: this.exLinkRender}} />
            {this.cUsqArr.map((v,i) => <div key={i}>{v.render()}</div>)}
        </Page>;
    };
}
