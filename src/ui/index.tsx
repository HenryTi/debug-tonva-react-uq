import React from 'react';
import { VPage, Page, meInFrame } from 'tonva-tools';
import {AppUI, CApp} from '../ui-usql';
import $unitx from './$unitx';
import devApp from './devApp';
import jkOrder from './jkOrder';
import res from './res';
import { FA } from 'tonva-react-form';

class VAppMain extends VPage<CApp> {
    async showEntry(param?:any) {
        this.openPage(this.appPage);
    }

    protected appPage = () => {
        let {caption, cUsqArr} = this.controller;
        let content;
        if (cUsqArr.length === 0) {
            content = <div className="p-3 text-info">
                <FA name="minus-circle" className="text-danger" size="lg" /> &nbsp; 此APP没有绑定任何的USQ
            </div>;
        }
        else {
            content = cUsqArr.map((v,i) => <div key={i}>{v.render()}</div>);
        }
        return <Page header={caption} logout={()=>{meInFrame.unit = undefined}}>
            <div className="p-3">自定义程序界面了。显示这一段，自定义起作用了。可以在这里放置任何内容</div>
            {content}
        </Page>;
    };
}

const ui:AppUI = {
    //App: App,
    //"DevApp/devappApi": DevApp_devappApi,
    res: res,
    main: VAppMain,
    usqs: {
        "$$$/$unitx": $unitx,
        "DevApp/devappApi": devApp,
        "JKDev/jkOrder": jkOrder,
    }
};


//convertUIKeyToLowercase(ui);

export default ui;
//export { CMyApp } from './CApp';

