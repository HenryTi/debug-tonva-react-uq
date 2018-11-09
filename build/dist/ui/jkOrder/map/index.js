import * as React from 'react';
import { Muted } from 'tonva-react-form';
var priceUI = {
    //CMap: CMapTeamPerson,
    //label: '部门员工对照表',
    //main: VMapTeamPerson,
    keys: [
        {
            content: function (_a, x) {
                var discription = _a.discription, id = _a.id;
                return React.createElement(React.Fragment, null,
                    React.createElement(Muted, null, x.product),
                    " \u00A0 ",
                    discription);
            },
            none: function (x) { return x.none; },
        },
        {
            content: function (values, x) {
                var name = values.name, id = values.id, discription = values.discription, $owner = values.$owner;
                return React.createElement(React.Fragment, null,
                    React.createElement(Muted, null, x.pack),
                    " \u00A0 ");
            },
            valuesContent: function (values, x) {
                var pack = values.pack, retail = values.retail;
                return React.createElement("div", { className: "px-3 py-1" },
                    React.createElement("div", { className: "d-inline-block w-25" }, pack.content()),
                    " ",
                    retail,
                    " \u5143");
            },
            none: function (x) { return x.noPost; },
        },
    ]
};
export default {
    price: priceUI,
};
//# sourceMappingURL=index.js.map