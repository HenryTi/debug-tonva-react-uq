import * as React from 'react';
import { TuidUI } from 'tonva-react-uq';

export default {
    customer: {
        content: (values) => {
            let {id, name, discription} = values;
            return <>{discription || name || 'id ' + id + ' ...'}</>;
        }
    },
    article: {
        content: (values) => {
            let {id, name, discription, casNO} = values;
            if (casNO !== undefined)
                return <>CAS:{casNO} - {discription || name}</>;
            return <>{discription || name || 'id ' + id + ' ...'}</>;
        }
    },
}
