import * as React from 'react';
export class ListRow extends React.Component {
    render() {
        let { num } = this.props.item;
        return React.createElement("div", null,
            "\u8F93\u5165\u6570\u91CF: ",
            num);
    }
}
//# sourceMappingURL=listRow.js.map