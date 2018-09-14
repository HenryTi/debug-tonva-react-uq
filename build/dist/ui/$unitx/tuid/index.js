import * as React from 'react';
import { Muted } from 'tonva-react-form';
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
            let { id, name, nick, assigned } = values;
            if (assigned !== undefined) {
                return React.createElement(React.Fragment, null,
                    assigned,
                    " - ",
                    React.createElement(Muted, null, name));
            }
            if (nick != undefined) {
                return React.createElement(React.Fragment, null,
                    nick,
                    " - ",
                    React.createElement(Muted, null, name));
            }
            if (name !== undefined)
                return name;
            return 'id ' + id + ' ...';
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