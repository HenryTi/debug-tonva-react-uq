import * as React from 'react';
import { Muted } from 'tonva-react-form';
export class T1Content extends React.Component {
    render() {
        let { discription, name } = this.props.value;
        return React.createElement(React.Fragment, null,
            discription,
            " ",
            React.createElement(Muted, null, name));
    }
}
//# sourceMappingURL=t1.js.map