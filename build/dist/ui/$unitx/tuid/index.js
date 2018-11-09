import * as React from 'react';
import { Muted } from 'tonva-react-form';
var organization = {
    divs: {
        post: {
            inputContent: function (values) {
                var id = values.id, title = values.title;
                return React.createElement(React.Fragment, null, title);
            }
        }
    }
};
export default {
    user: {
        inputContent: function (values) {
            var id = values.id, name = values.name, nick = values.nick, assigned = values.assigned;
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
        inputContent: function (values) {
            var id = values.id, name = values.name;
            return React.createElement(React.Fragment, null, name);
        }
    },
    organization: organization,
};
//# sourceMappingURL=index.js.map