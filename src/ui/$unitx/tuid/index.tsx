import * as React from 'react';
import { Muted } from 'tonva-react-form';
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
            let {id, name, nick, assigned} = values;
            let c:string;
            if (assigned !== undefined) {
                return <>{assigned} - <Muted>{name}</Muted></>;
            }
            if (nick != undefined) {
                return <>{nick} - <Muted>{name}</Muted></>;
            }
            if (name !== undefined) return name;
            return 'id ' + id + ' ...';
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
