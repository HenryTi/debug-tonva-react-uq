/*
import * as React from 'react';
import { observer } from "mobx-react";
import { Page } from 'tonva-tools';
import { CrUsq, VmUsq } from "../../ui-usql";

export class CrMyUsq extends CrUsq {
    protected view = AppPage;
    protected get VmUsq():typeof VmUsq {return MyVmUsq}
}

interface Props {
    vm: CrUsq;
    apiName: string;
    type: 'sheet' | 'action' | 'tuid' | 'query' | 'book';
    entityName: string;
}
const EntityLink = ({vm, apiName, type, entityName}:Props) => {
    let crUsq = vm.getCrUsq(apiName);
    if (crUsq === undefined) {
        return <div>unkown api: {apiName}</div>;
    }
    let vmLink = crUsq.vmLinkFromName(type, entityName);
    let key = apiName + ':' + entityName;
    if (vmLink === undefined) {
        return <div key={key}>unkown {apiName}:{entityName}</div>;
    }
    return <div key={key}
        className="bg-white cursor-pointer border-bottom" 
        onClick={vmLink.onClick}>
        {vmLink.render()}
    </div>;
}

class MyVmUsq extends VmUsq {
    protected get view() {return () => {
        let {caption, crUsqArr, crUsqCollection} = vm;
        let api = 'DevApp/devappApi';
        let sheets = ['order', '单据'];
        return <Page header={caption}>
            <div className="p-3">自定义的app界面</div>
            {sheets.map(v => <EntityLink key={v} vm={vm} apiName={api} type="sheet" entityName={v} />)}
            <br />
            {crUsqArr.map((v,i) => <div key={i}>{v.show()}</div>)}
        </Page>;
    }}
}

const AppPage = observer(({vm}:{vm:CrApp}) => {
    let {caption, crUsqArr, crUsqCollection} = vm;
    let api = 'DevApp/devappApi';
    let sheets = ['order', '单据'];
    return <Page header={caption}>
        <div className="p-3">自定义的app界面</div>
        {sheets.map(v => <EntityLink key={v} vm={vm} apiName={api} type="sheet" entityName={v} />)}
        <br />
        {crUsqArr.map((v,i) => <div key={i}>{v.show()}</div>)}
    </Page>;
});
*/