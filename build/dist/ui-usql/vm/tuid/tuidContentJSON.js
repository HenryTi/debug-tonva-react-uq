import * as React from 'react';
export class TuidContentJSON extends React.Component {
    render() {
        return React.createElement("span", null,
            "tuid: ",
            JSON.stringify(this.props.values));
    }
}
//# sourceMappingURL=tuidContentJSON.js.map