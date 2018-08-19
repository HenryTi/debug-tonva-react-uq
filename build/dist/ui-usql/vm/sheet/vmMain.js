var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as React from 'react';
import { observer } from 'mobx-react';
import { Button, Badge } from 'reactstrap';
import { Page } from 'tonva-tools';
import { List, Muted, LMR } from 'tonva-react-form';
import { VmEntity } from '../VM';
export class VmSheetMain extends VmEntity {
    constructor() {
        super(...arguments);
        /* 移到CrSheet里面去
        protected async onReceive(msg: any) {
            await super.onReceive(msg);
            this.entity.onReceive(msg);
        }
        */
        this.newClick = () => this.event('new'); /* {
            let t = (this.ui && this.ui.new) || this.vmNew;
            await this.navVm(t);
        }*/
        this.schemaClick = () => this.event('schema'); // await this.navVm(this.vmSchema);
        this.archivesClick = () => this.event('archives'); //await this.navVm(this.vmArchives);
        this.sheetStateClick = (state) => this.event('state', state); // await this.navVm(this.vmSheetList, state);
        /* 移到CrSheet里面去了
        async showSheet(sheetId:number) {
            let vmAction = (this.ui && this.ui.action) || VmSheetAction;
            await this.navVm(vmAction, sheetId);
        }*/
        this.renderState = (item, index) => {
            let { state, count } = item;
            if (count === 0)
                return null;
            let badge = React.createElement(Badge, { className: "ml-5 align-self-end", color: "success" }, count);
            return React.createElement(LMR, { className: "px-3 py-2", left: this.coordinator.getStateLabel(state), right: badge });
        };
        this.view = observer(() => {
            let list = this.entity.statesCount.filter(row => row.count);
            return React.createElement(Page, { header: this.label },
                React.createElement("div", { className: "mx-3 my-2" },
                    React.createElement(Button, { className: "mr-2", color: "primary", onClick: this.newClick }, "\u65B0\u5EFA"),
                    React.createElement(Button, { className: "mr-2", color: "primary", onClick: this.schemaClick }, "\u6A21\u677F")),
                React.createElement(List, { className: "my-2", header: React.createElement(Muted, null,
                        "\u5F85\u5904\u7406",
                        this.label), none: "[ \u65E0 ]", items: list, item: { render: this.renderState, onClick: this.sheetStateClick } }),
                React.createElement("div", { className: "mx-3 my-2" },
                    React.createElement(Button, { color: "primary", onClick: this.archivesClick },
                        "\u5DF2\u5F52\u6863",
                        this.label)));
        });
    }
    showEntry() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.entity.getStateSheetCount();
            this.open(this.view);
        });
    }
}
//# sourceMappingURL=vmMain.js.map