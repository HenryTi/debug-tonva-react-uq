import React from 'react';
import { QueryUI, tv } from "tonva-react-uq";
import { observer } from 'mobx-react';

const ui:QueryUI = {
    row: observer((values:any) => <div className="px-3 py-2">{tv(values.post)/*.content()*/}</div>),
}

export default ui;