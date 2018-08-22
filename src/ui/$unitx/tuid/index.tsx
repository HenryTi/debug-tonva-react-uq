import * as React from 'react';
import { TuidUI } from '../../../ui-usql';

const organization:TuidUI = {
    divs: {
        post: {
            content: (values) => {
                let {id, title} = values;
                return <>{title}</>
            }
        }
    }
};

export default {
    user: {
        content: (values) => {
            let {id, nick, assigned} = values;
            return <>{assigned || nick || 'id ' + id + ' ...'}</>;
        }
    },
    section: {
        content: (values) => {
            let {id, name} = values;
            return <>{name}</>;
        }
    },
    organization: organization,
}
