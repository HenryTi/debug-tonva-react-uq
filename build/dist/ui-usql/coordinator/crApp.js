var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Coordinator } from "./coordinator";
import { meInFrame, loadAppApis, nav } from "tonva-tools";
import { VmApp } from "../viewModel";
import { CrApi } from "./crApi";
import { centerApi } from "../centerApi";
export class CrApp extends Coordinator {
    constructor(tonvaApp, ui) {
        super();
        let parts = tonvaApp.split('/');
        if (parts.length !== 2) {
            throw 'tonvaApp name must be / separated, owner/app';
        }
        this.appOwner = parts[0];
        this.appName = parts[1];
        this.ui = ui;
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.vmApp = new VmApp;
                let hash = document.location.hash;
                this.isProduction = hash.startsWith('#tv');
                let { unit } = meInFrame;
                if (this.isProduction === false && (unit === undefined || unit <= 0)) {
                    let app = yield loadAppApis(this.appOwner, this.appName);
                    let { id } = app;
                    this.id = id;
                    let appUnits = yield this.loadAppUnits();
                    switch (appUnits.length) {
                        case 0:
                            this.msg('当前登录的用户不支持当前的APP');
                            return;
                        case 1:
                            unit = appUnits[0].id;
                            if (unit === undefined || unit <= 0) {
                                this.msg('当前unit不支持app操作，请重新登录');
                                yield nav.logout();
                                return;
                            }
                            meInFrame.unit = unit;
                            break;
                        default:
                            meInFrame.unit = yield this.vmApp.selectUnit(appUnits);
                            break; // 接下来显示主程序页面
                        //nav.clear();
                        //nav.push(<SelectUnit vm={this} />)
                        //return;
                    }
                }
                yield this.startMain();
            }
            catch (err) {
                this.errorPage('App start error!', err);
            }
        });
    }
    startMain() {
        return __awaiter(this, void 0, void 0, function* () {
            let parts = document.location.hash.split('-');
            if (parts.length > 2) {
                let action = parts[2];
                // sheet_debug 表示centerUrl是debug方式的
                if (action === 'sheet' || action === 'sheet_debug') {
                    let apiId = Number(parts[3]);
                    let sheetTypeId = Number(parts[4]);
                    let sheetId = Number(parts[5]);
                    let crApi = this.apiArr.find(v => v.id === apiId);
                    if (crApi === undefined) {
                        this.msg(`unknown apiId: ${apiId}`);
                        return;
                    }
                    yield crApi.startSheet(sheetTypeId, sheetId);
                    /*
                    this.clearPrevPages();
                    //nav.replace(<Page header="Sheet">API: {apiId} 编号：{sheetId}</Page>);
                    await crApi.navSheet(sheetTypeId, sheetId);
                    */
                    return;
                }
            }
            yield this.vmApp.main(this.apiArr.map(v => v.vmUsq));
        });
    }
    get vm() { return VmApp; }
    get crApi() { return CrApi; }
    loadApis() {
        return __awaiter(this, void 0, void 0, function* () {
            let unit = meInFrame.unit;
            let app = yield loadAppApis(this.appOwner, this.appName);
            let { id, apis } = app;
            this.id = id;
            this.apiCollection = {};
            this.apiArr = [];
            for (let appApi of apis) {
                let { id: apiId, apiOwner, apiName, url, urlDebug, ws, access, token } = appApi;
                let api = apiOwner + '/' + apiName;
                let ui = this.ui && this.ui[api];
                let crApi = new this.crApi(this, apiId, api, access, ui);
                yield crApi.loadSchema();
                this.apiCollection[api] = crApi;
                this.apiArr.push(crApi);
            }
        });
    }
    loadAppUnits() {
        return __awaiter(this, void 0, void 0, function* () {
            let ret = yield centerApi.userAppUnits(this.id);
            return ret;
            /*
            this.appUnits = ret;
            if (ret.length === 1) {
                meInFrame.unit = ret[0].id;
            }*/
        });
    }
}
//# sourceMappingURL=crApp.js.map