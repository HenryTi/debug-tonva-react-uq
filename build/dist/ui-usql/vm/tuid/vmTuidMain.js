var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as React from 'react';
import { SearchBox, List, Muted } from 'tonva-react-form';
import { Button } from 'reactstrap';
import { Page } from 'tonva-tools';
import { VmTuidEdit } from './vmTuidEdit';
import { VmTuid } from './vmTuid';
import { VmTuidList } from './vmTuidList';
export class VmTuidMain extends VmTuid {
    constructor() {
        super(...arguments);
        this.onNew = () => this.navVm(VmTuidEdit);
        this.onList = () => this.navVm(VmTuidList);
        this.onSearch = (key) => __awaiter(this, void 0, void 0, function* () { return yield this.navVm(VmTuidList, key); });
    }
    entityRender(link, index) {
        return link.render();
    }
    entityClick(link) {
        return __awaiter(this, void 0, void 0, function* () {
            yield link.onClick();
        });
    }
    beforeStart(param) {
        return __awaiter(this, void 0, void 0, function* () {
            let { owner } = this.entity;
            if (owner === undefined) {
                let tuid = this.entity;
                this.proxies = tuid.proxies;
                this.proxyLinks = [];
                for (let i in this.proxies) {
                    let link = this.crUsq.vmLinkFromName('tuid', i);
                    this.proxyLinks.push(link);
                }
            }
            //this.view = this.proxies === undefined? MainPage : ProxyMainPage;
        });
    }
    get view() {
        return () => React.createElement(Page, { header: this.label }, this.proxies === undefined ?
            React.createElement(React.Fragment, null,
                React.createElement(SearchBox, { className: "w-100", onSearch: this.onSearch, placeholder: '搜索' + this.label }),
                React.createElement("div", { className: 'my-3' },
                    React.createElement(Button, { className: "ml-3", color: "primary", onClick: this.onNew }, "\u65B0\u589E"),
                    React.createElement(Button, { className: "ml-3", color: "primary", onClick: this.onList }, "\u5217\u8868"))) :
            React.createElement(List, { className: "my-2", header: React.createElement(Muted, null,
                    this.label,
                    " \u4EE3\u7406\u4E0B\u5217Tuid"), items: this.proxyLinks, item: { render: this.entityRender, onClick: this.entityClick } }));
    }
}
/*
const MainPage = ({vm}:{vm:VmTuidMain}) => {
    let {label, onNew, onList, onSearch} = vm;
    return <Page header={label}>
        <SearchBox className="w-100" onSearch={onSearch} placeholder={'搜索'+label} />
        <div className='my-3'>
            <Button className="ml-3" color="primary" onClick={onNew}>新增</Button>
            <Button className="ml-3" color="primary" onClick={onList}>列表</Button>
        </div>
    </Page>;
}
        
const ProxyMainPage = ({vm}:{vm:VmTuidMain}) => {
    let {label, crUsq, entity, entityClick, entityRender, proxies} = vm;
    let arr:string[] = [];
    for (let i in proxies) {
        arr.push(i);
    }
    return <Page header={label}>
        <List className="my-2"
            header={<Muted>{label} 代理下列Tuid</Muted>}
            items={arr.map(v => crUsq.vmLinkFromName('tuid', v))}
            item={{render: entityRender, onClick:entityClick}} />
    </Page>
}
*/ 
//# sourceMappingURL=vmTuidMain.js.map