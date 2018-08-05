import * as React from 'react';
export class CustomerContent extends React.Component {
    render() {
        let { value } = this.props;
        //return <div>id = {value.id} {JSON.stringify(value)} </div>;
        if (value === undefined)
            return React.createElement("div", null, "\u5BA2\u6237");
        return React.createElement("div", null,
            "\u5BA2\u6237\u540D\uFF1A",
            value.name,
            " \u5BA2\u6237\u63CF\u8FF0\uFF1A",
            value.discription,
            " ");
    }
}
export class CandidateRow extends React.Component {
    render() {
        return React.createElement("div", { className: "p-4" }, JSON.stringify(this.props.item));
    }
}
//# sourceMappingURL=customerInput.js.map