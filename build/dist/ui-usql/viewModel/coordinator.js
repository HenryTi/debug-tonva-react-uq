import * as React from 'react';
import { nav, Page } from "tonva-tools";
export class CoordinatorBase {
    msg(text) {
        alert(text);
    }
    errorPage(header, err) {
        nav.push(React.createElement(Page, { header: "App start error!" },
            React.createElement("pre", null, typeof err === 'string' ? err : err.message)));
    }
}
export class Coordinator extends CoordinatorBase {
    constructor(crApi) {
        super();
        this.crApi = crApi;
    }
}
//# sourceMappingURL=coordinator.js.map