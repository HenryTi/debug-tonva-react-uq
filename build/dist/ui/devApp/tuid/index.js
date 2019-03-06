import * as React from 'react';
export default {
    customer: {
        content: (values) => {
            let { id, name, discription } = values;
            return React.createElement(React.Fragment, null, discription || name || 'id ' + id + ' ...');
        }
    },
    article: {
        content: (values) => {
            let { id, name, discription, casNO } = values;
            if (casNO !== undefined)
                return React.createElement(React.Fragment, null,
                    "CAS:",
                    casNO,
                    " - ",
                    discription || name);
            return React.createElement(React.Fragment, null, discription || name || 'id ' + id + ' ...');
        }
    },
};
//# sourceMappingURL=index.js.map