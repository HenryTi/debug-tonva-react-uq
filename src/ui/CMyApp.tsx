import * as React from 'react';
import { CApp, ControllerUsq } from "tonva-react-usql";
import { VPage, Page } from "tonva-tools";

export class CMyApp extends CApp {
    async start(param?:any) {
        await super.start(param);
        //let cProduct = new CProduct(undefined, undefined);
        //await cProduct.start();
    }
}

class CProduct extends ControllerUsq {
    protected async internalStart(param?: any): Promise<void> {
        this.showVPage(VProduct, param);
    }
}

class VProduct extends VPage<CProduct> {
    async showEntry(param?:any) {
        this.openPageElement(<Page>
            ddd
        </Page>);
    }
}
