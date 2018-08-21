import { observer } from "mobx-react";
import React from "react";
import { FA } from "tonva-react-form";
import { Page } from "tonva-tools";
import { CrQuery, VmQueryMain } from "../../../../ui-usql";

export class CrGetMessage extends CrQuery {
    protected get VmQueryMain() {return VmMain}
}

export class VmMain extends VmQueryMain {
    protected queryResult = observer((result:any) => {
        let ret0 = result.ret[0];
        let rightClose = <button
            className="btn btn-outline-success btn-sm"
            onClick={this.again}>
            <FA name="search" /> 再查询
        </button>;
        return <Page header={this.label} right={rightClose}>
            重载的CrGetMessage <br/>
            {ret0.fromUser.content()}
            <pre>{JSON.stringify(ret0, undefined, '\t')}</pre>
        </Page>;
    })
}
