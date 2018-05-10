import * as React from 'react';
import { Muted } from 'tonva-react-form';
export class T1Content extends React.Component {
    render() {
        let { value } = this.props;
        //return <div>id = {value.id} {JSON.stringify(value)} </div>;
        //if (!value) return <div>t1</div>;
        return React.createElement(React.Fragment, null,
            value.discription,
            " ",
            React.createElement(Muted, null, value.name));
    }
}
//# sourceMappingURL=t1.js.map