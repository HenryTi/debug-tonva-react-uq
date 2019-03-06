import * as React from 'react';
import { CApp, ControllerUq } from "tonva-react-uq";
import { VPage, Page } from "tonva-tools";

export class CMyApp extends CApp {
    async start(param?:any) {
        await super.start(param);
        //let cProduct = new CProduct(undefined, undefined);
        //await cProduct.start();
    }
}

class CProduct extends ControllerUq {
    protected async internalStart(param?: any): Promise<void> {
        this.openVPage(VProduct, param);
    }
}

class VProduct extends VPage<CProduct> {
    async open(param?:any) {
        this.openPageElement(<Page>
            ddd
        </Page>);
    }
}
