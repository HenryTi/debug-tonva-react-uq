import * as React from 'react';
import { left0 } from 'tonva-tools';
import { dictionary as x } from '../res';
import { MapUI } from "../../../ui-usql";
import { Muted } from 'tonva-react-form';
import { observer } from 'mobx-react';

const priceUI:MapUI = {
    //CMap: CMapTeamPerson,
    //label: '部门员工对照表',
    //main: VMapTeamPerson,
    keys: [
        {
            content: ({discription, id}:any) => <><Muted>{x.product}</Muted> &nbsp; {discription}</>,
            none: ()=>x.noStaff,
        },
        {
            content: (values:any) => {
                let {name, id, discription, $owner} = values;
                return <><Muted>{x.pack}</Muted> &nbsp; </>;
            },
            valuesContent: (values:any) => {
                let {pack, retail} = values;
                return <div className="px-3 py-1"><div className="d-inline-block w-25">{pack.content()}</div> {retail} 元</div>;
            },
            none: ()=>x.noPost,
        },
    ]
}

export default {
    price: priceUI,
};
