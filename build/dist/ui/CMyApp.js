var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as React from 'react';
import { CApp, ControllerUsq } from "tonva-react-usql";
import { VPage, Page } from "tonva-tools";
export class CMyApp extends CApp {
    start(param) {
        const _super = Object.create(null, {
            start: { get: () => super.start }
        });
        return __awaiter(this, void 0, void 0, function* () {
            yield _super.start.call(this, param);
            //let cProduct = new CProduct(undefined, undefined);
            //await cProduct.start();
        });
    }
}
class CProduct extends ControllerUsq {
    internalStart(param) {
        return __awaiter(this, void 0, void 0, function* () {
            this.openVPage(VProduct, param);
        });
    }
}
class VProduct extends VPage {
    open(param) {
        return __awaiter(this, void 0, void 0, function* () {
            this.openPageElement(React.createElement(Page, null, "ddd"));
        });
    }
}
//# sourceMappingURL=CMyApp.js.map