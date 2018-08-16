import * as React from 'react';
import { observer } from "mobx-react";
import { Page } from 'tonva-tools';
import { CrApp } from "../../ui-usql";
export class CrMyApp extends CrApp {
    constructor() {
        super(...arguments);
        this.view = AppPage;
    }
}
const EntityLink = ({ vm, apiName, type, entityName }) => {
    let crUsq = vm.getCrUsq(apiName);
    if (crUsq === undefined) {
        return React.createElement("div", null,
            "unkown api: ",
            apiName);
    }
    let vmLink = crUsq.vmLinkFromName(type, entityName);
    let key = apiName + ':' + entityName;
    if (vmLink === undefined) {
        return React.createElement("div", { key: key },
            "unkown ",
            apiName,
            ":",
            entityName);
    }
    return React.createElement("div", { key: key, className: "bg-white cursor-pointer border-bottom", onClick: vmLink.onClick }, vmLink.render());
};
const AppPage = observer(({ vm }) => {
    let { caption, crUsqArr, crUsqCollection } = vm;
    let api = 'DevApp/devappApi';
    let sheets = ['order', '单据'];
    return React.createElement(Page, { header: caption },
        React.createElement("div", { className: "p-3" }, "\u81EA\u5B9A\u4E49\u7684app\u754C\u9762"),
        sheets.map(v => React.createElement(EntityLink, { key: v, vm: vm, apiName: api, type: "sheet", entityName: v })),
        React.createElement("br", null),
        crUsqArr.map((v, i) => React.createElement("div", { key: i }, v.render())));
});
//# sourceMappingURL=crMyApp.js.map