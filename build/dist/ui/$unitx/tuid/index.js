import * as React from 'react';
const organization = {
    divs: {
        post: {
            content: (values) => {
                let { id, title } = values;
                return React.createElement(React.Fragment, null, title);
            }
        }
    }
};
export default {
    user: {
        content: (values) => {
            let { id, nick, assigned } = values;
            return React.createElement(React.Fragment, null, assigned || nick || 'id ' + id + ' ...');
        }
    },
    section: {
        content: (values) => {
            let { id, name } = values;
            return React.createElement(React.Fragment, null, name);
        }
    },
    organization: organization,
};
//# sourceMappingURL=index.js.map