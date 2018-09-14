import * as React from 'react';
import { List, Muted, EasyDate, FA } from 'tonva-react-form';
import { VmEntity } from '../VM';
export class VmSheetView extends VmEntity {
    constructor() {
        super(...arguments);
        /*
        constructor(crSheet:CrSheet, data: any, state:string, flows:any[]) {
            super(crSheet);
            this.data = data;
            this.state = state;
            this.flows = flows;
        }
        */
        //async showEntry(param?:any) {}
        /*
        render() {
            this.vmForm = this.createForm(this.data);
            return <this.view />;
        }
        */
        /*
        protected get fieldsFormOptions():VmFormOptions {
            let ret = super.fieldsFormOptions;
            ret.readOnly = true;
            return ret;
        }*/
        this.flowRow = (item, index) => {
            let { date, user, preState, state, action } = item;
            if (action === undefined)
                action = React.createElement(React.Fragment, null,
                    React.createElement(FA, { className: "text-primary", name: "pencil-square-o" }),
                    " \u5236\u5355");
            let to;
            switch (state) {
                case '$': break;
                case '#':
                    to = React.createElement(React.Fragment, null,
                        React.createElement(FA, { className: "text-success", name: "file-archive-o" }));
                    break;
                default:
                    to = React.createElement(React.Fragment, null,
                        React.createElement(FA, { className: "text-muted", name: "arrow-right" }),
                        " \u00A0 ",
                        state);
                    break;
            }
            return React.createElement("div", { className: "row" },
                React.createElement("div", { className: "col-sm" },
                    React.createElement("div", { className: "pl-3 py-2" }, action)),
                React.createElement("div", { className: "col-sm" },
                    React.createElement("div", { className: "p-2" }, to)),
                React.createElement("div", { className: "col-sm text-right" },
                    React.createElement("div", { className: "p-2" },
                        React.createElement(Muted, null,
                            React.createElement(EasyDate, { date: date })))));
        };
        this.sheetView = () => {
            let removed;
            if (this.state === '-')
                removed = React.createElement("div", { className: "mx-3 my-2", style: { color: 'red' } }, "\u672C\u5355\u636E\u4F5C\u5E9F");
            return React.createElement("div", null,
                removed,
                this.vmForm.render(),
                React.createElement(List, { header: React.createElement(Muted, { className: "mx-3 my-1" }, "\u6D41\u7A0B"), items: this.flows, item: { render: this.flowRow } }));
        };
    }
}
//# sourceMappingURL=vmView.js.map