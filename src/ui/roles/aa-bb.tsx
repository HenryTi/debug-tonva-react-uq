import * as React from 'react';
import { VPage, Page, nav } from 'tonva-tools';
import { CApp, RoleAppUI } from 'tonva-react-uq';
import { FA } from 'tonva-react-form';
import { aa_bbJkOrder } from "../jkOrder";

class VAaBbAppMain extends VPage<CApp> {
    async open(param?:any) {
        this.openPage(this.appPage);
    }

    protected appPage = () => {
        let {caption, cUqArr: cUsqArr} = this.controller;
        let content:any;
        if (cUsqArr.length === 0) {
            content = <div className="p-3 text-info">
                <FA name="minus-circle" className="text-danger" size="lg" /> &nbsp; 此APP没有绑定任何的USQ
            </div>;
        }
        else {
            content = cUsqArr.map((v,i) => <div key={i}>{v.render()}</div>);
        }
        return <Page header={caption} logout={true}>
            <div className="p-3">AaBb程序界面。显示这一段，自定义起作用了。可以在这里放置任何内容</div>
            <div className="p-3">hashParam: {nav.hashParam}</div>
            {content}
        </Page>;
    };
}

const aaBB:RoleAppUI = {
    main: VAaBbAppMain,
    uqs: {
        "JKDev/jkOrder": aa_bbJkOrder, // async ()=> (await import('./jkOrder')).aa_bbJkOrder, // 
    }
}

export default aaBB;