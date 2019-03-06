import { observer } from "mobx-react";
import React from "react";
import { FA } from "tonva-react-form";
import { Page } from "tonva-tools";
import { CQuery, VQueryMain } from "tonva-react-uq";
import { tv } from 'tonva-react-uq';

export class CGetMessage extends CQuery {
    protected get VQueryMain() {return VMain}
}

export class VMain extends VQueryMain {
    protected queryResult = observer((result:any) => {
        let ret0 = result.ret[0];
        let rightClose = <button
            className="btn btn-outline-success"
            onClick={this.again}>
            <FA name="search" /> 再查询
        </button>;
        return <Page header={this.label} right={rightClose}>
            重载的CGetMessage <br/>
            {tv(ret0.fromUser)/*ret0.fromUser.content()*/}
            <pre>{JSON.stringify(ret0, undefined, '\t')}</pre>
        </Page>;
    })
}
