var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as React from 'react';
import { Button } from 'reactstrap';
import { Page } from 'tonva-tools';
import { VmSheet } from './vmSheet';
import { VmView } from './vmView';
export class VmSheetAction extends VmSheet {
    constructor() {
        super(...arguments);
        this.actionClick = (action) => __awaiter(this, void 0, void 0, function* () {
            let { id, flow, state } = this.brief;
            let res = yield this.entity.action(id, flow, state, action.name);
            alert(JSON.stringify(res));
            yield this.back();
        });
        this.deleteClick = () => __awaiter(this, void 0, void 0, function* () {
            alert('单据作废：程序正在设计中');
        });
        this.editClick = () => __awaiter(this, void 0, void 0, function* () {
            alert('修改单据：程序正在设计中');
        });
        this.view = SheetAction;
    }
    start(sheetId) {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            let data = yield this.entity.getSheet(sheetId);
            let { brief, data: sheetData, flows } = data;
            this.brief = brief;
            this.sheetData = sheetData;
            this.flows = flows;
            this.vmView = new VmView(this.vmApi, this.entity, this.ui, this.sheetData, this.brief.state, flows);
            _super("start").call(this);
        });
    }
}
const SheetAction = ({ vm }) => {
    let { label, entity, brief, actionClick, vmView, deleteClick, editClick } = vm;
    let state = brief.state;
    let stateLabel = vm.getStateLabel(state);
    let { states } = entity.schema;
    let s = states.find(v => v.name === state);
    let actionButtons, startButtons;
    if (s === undefined) {
        let text, cn;
        switch (state) {
            default:
                text = '不认识的单据状态\'' + state + '\'';
                cn = 'text-info';
                break;
            case '-':
                text = '已作废';
                cn = 'text-danger';
                break;
            case '#':
                text = '已归档';
                cn = 'text-success';
                break;
        }
        actionButtons = React.createElement("div", { className: cn },
            "[",
            text,
            "]");
    }
    else {
        actionButtons = React.createElement("div", { className: "flex-grow-1" }, s.actions.map((v, index) => React.createElement(Button, { key: index, className: "mr-2", color: "primary", onClick: () => actionClick(v) }, vm.getActionLabel(state, v.name))));
        if (state === '$') {
            startButtons = React.createElement("div", null,
                React.createElement(Button, { outline: true, className: "ml-2", color: "info", onClick: editClick }, "\u4FEE\u6539"),
                React.createElement(Button, { outline: true, className: "ml-2", color: "danger", onClick: deleteClick }, "\u4F5C\u5E9F"));
        }
    }
    ;
    return React.createElement(Page, { header: label + ':' + stateLabel + '-' + brief.no },
        React.createElement("div", { className: "my-3" },
            React.createElement("div", { className: "d-flex mx-3 mb-3" },
                actionButtons,
                startButtons),
            vmView.render()));
};
//# sourceMappingURL=vmSheetAction.js.map