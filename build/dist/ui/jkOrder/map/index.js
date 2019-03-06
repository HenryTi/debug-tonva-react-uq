import * as React from 'react';
import { tv } from "tonva-react-uq";
import { Muted } from 'tonva-react-form';
const priceUI = {
    //CMap: CMapTeamPerson,
    //label: '部门员工对照表',
    //main: VMapTeamPerson,
    keys: [
        {
            content: ({ discription, id }, x) => React.createElement(React.Fragment, null,
                React.createElement(Muted, null, x.product),
                " \u00A0 ",
                discription),
            none: (x) => x.none,
        },
        {
            content: (values, x) => {
                let { name, id, discription, $owner } = values;
                return React.createElement(React.Fragment, null,
                    React.createElement(Muted, null, x.pack),
                    " \u00A0 ");
            },
            valuesContent: (values, x) => {
                let { pack, retail } = values;
                return React.createElement("div", { className: "px-0 py-1" },
                    React.createElement("div", { className: "d-inline-block w-25" }, tv(pack)),
                    " ",
                    retail,
                    " \u5143");
            },
            none: (x) => x.noPost,
        },
    ]
};
export default {
    price: priceUI,
};
//# sourceMappingURL=index.js.map