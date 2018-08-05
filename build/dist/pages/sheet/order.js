import * as React from 'react';
import { LMR } from 'tonva-react-form';
export class OrderRow extends React.Component {
    render() {
        let { ui, data } = this.props;
        let { item, detail } = data;
        let d = detail;
        let articleFieldFace = d.fields[0]; //['article'];
        let face = articleFieldFace.face;
        let { input, tuid } = face;
        let Component = input.component;
        let left = React.createElement(Component, { tuid: tuid, input: input, readOnly: true, entitiesUI: ui.entitiesUI, onPicked: undefined, id: item['article'], params: undefined });
        let right = React.createElement(React.Fragment, null,
            item['quantity'],
            " x ",
            item['price'],
            "\u5143 = ",
            item['amount'],
            "\u5143");
        return React.createElement(LMR, { className: "px-3 py-2", left: left, right: right });
    }
}
//# sourceMappingURL=order.js.map