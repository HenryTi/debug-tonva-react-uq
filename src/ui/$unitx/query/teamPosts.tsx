import React from 'react';
import { QueryUI, PureJSONContent } from "tonva-react-usql";
import { observer } from 'mobx-react';

const ui:QueryUI = {
    row: observer((values:any) => <div className="px-3 py-2">{values.post.content()}</div>),
}

export default ui;