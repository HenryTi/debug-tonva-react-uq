import * as React from 'react';
import { observer } from "mobx-react";
import { Page } from 'tonva-tools';
import { VmApp } from "../../ui-usql";

export class VmMyApp extends VmApp {
    protected view = AppPage;
}

interface Props {
    vm: VmApp;
    apiName: string;
    type: 'sheet' | 'action' | 'tuid' | 'query' | 'book';
    entityName: string;
}
const EntityLink = ({vm, apiName, type, entityName}:Props) => {
    let vmApi = vm.getVmApi(apiName);
    if (vmApi === undefined) {
        return <div>unkown api: {apiName}</div>;
    }
    let vmLink = vmApi.vmLinkFromName(type, entityName);
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

const AppPage = observer(({vm}:{vm:VmApp}) => {
    let {caption, vmApiArr, vmApiCollection} = vm;
    let api = 'DevApp/devappApi';
    let sheets = ['order', '单据'];
    return <Page header={caption}>
        <div className="p-3">自定义的app界面</div>
        {sheets.map(v => <EntityLink key={v} vm={vm} apiName={api} type="sheet" entityName={v} />)}
        <br />
        {vmApiArr.map((v,i) => <div key={i}>{v.render()}</div>)}
    </Page>;
});
