import * as React from 'react';

export default {
    user: {
        content: (values) => {
            let {id, nick, assigned} = values;
            return <>{assigned || nick || 'id ' + id + ' ...'}</>;
        }
    }
}
