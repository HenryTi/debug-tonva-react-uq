import * as React from 'react';
export default {
    customer: {
        inputContent: function (values) {
            var id = values.id, name = values.name, discription = values.discription;
            return React.createElement(React.Fragment, null, discription || name || 'id ' + id + ' ...');
        }
    },
    article: {
        inputContent: function (values) {
            var id = values.id, name = values.name, discription = values.discription, casNO = values.casNO;
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