import * as React from 'react';
import { nav, Page } from "tonva-tools";
export class Coordinator {
    msg(text) {
        alert(text);
    }
    errorPage(header, err) {
        nav.push(React.createElement(Page, { header: "App start error!" },
            React.createElement("pre", null, typeof err === 'string' ? err : err.message)));
    }
}
//# sourceMappingURL=coordinator.js.map