import * as React from 'react';
import { MapUI } from "../../../ui-usql";
import { Muted } from 'tonva-react-form';

const priceUI:MapUI = {
    //CMap: CMapTeamPerson,
    //label: '部门员工对照表',
    //main: VMapTeamPerson,
    keys: [
        {
            content: ({discription, id}:any, x:any) => <><Muted>{x.product}</Muted> &nbsp; {discription}</>,
            none: (x:any)=>x.none,
        },
        {
            content: (values:any, x:any) => {
                let {name, id, discription, $owner} = values;
                return <><Muted>{x.pack}</Muted> &nbsp; </>;
            },
            valuesContent: (values:any, x:any) => {
                let {pack, retail} = values;
                return <div className="px-3 py-1"><div className="d-inline-block w-25">{pack.content()}</div> {retail} 元</div>;
            },
            none: (x:any)=>x.noPost,
        },
    ]
}

export default {
    price: priceUI,
};
