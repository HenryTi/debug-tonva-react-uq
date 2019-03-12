import React from 'react';
import { VPage, Page, meInFrame, nav } from 'tonva-tools';
import { FA } from 'tonva-react-form';
import {AppUI, CApp} from 'tonva-react-uq';
import $unitx from './$unitx';
import devApp from './devApp';
import jkOrder, { aa_bbJkOrder } from './jkOrder';
import cart from './cart';
import res from './res';
import { CMyApp } from './CMyApp';

class VAppMain extends VPage<CApp> {
    async open(param?:any) {
        this.openPage(this.appPage);
    }

    protected appPage = () => {
        let {caption, cUqArr: cUsqArr} = this.controller;
        let content;
        if (cUsqArr.length === 0) {
            content = <div className="p-3 text-info">
                <FA name="minus-circle" className="text-danger" size="lg" /> &nbsp; 此APP没有绑定任何的USQ
            </div>;
        }
        else {
            content = cUsqArr.map((v,i) => <div key={i}>{v.render()}</div>);
        }
        return <Page header={caption} logout={async ()=>{meInFrame.unit = undefined}}>
            <div className="p-3">自定义程序界面了。显示这一段，自定义起作用了。可以在这里放置任何内容</div>
            <div className="p-3">hashParam: {nav.hashParam}</div>
            {content}
        </Page>;
    };
}

let uqs = {
    "$$$/$unitx": $unitx,
    "DevApp/devappApi": devApp,
    "JKDev/jkOrder": jkOrder,
    "百灵威系统工程部/cart": cart,
}

const ui:AppUI = {
    //appName: 'JKDev/jkOrder',
    appName: 'bruce/SCMBase',
    CApp: CMyApp,
    res: res,
    main: VAppMain,
    uqs: uqs,

    roles: {
        'aa-bb': async () => (await import('./roles/aa-bb')).default,
    }
};


//convertUIKeyToLowercase(ui);

export default ui;
//export { CMyApp } from './CApp';

