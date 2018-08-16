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
import { VmSheetNew, VmTuidPicker, RowContent } from '../../../../ui-usql';
export class VmSheetNew单据 extends VmSheetNew {
    constructor() {
        super(...arguments);
        this.showField1 = () => {
            this.vmForm.showBands(['f1'], 'f1');
        };
        this.showField2 = () => {
            this.vmForm.showBands(['f2'], 'f2');
        };
        this.showAll = () => {
            this.vmForm.showBands(undefined);
        };
        this.onArticleSelected = (item) => __awaiter(this, void 0, void 0, function* () {
            this.vmForm.setValue('id1', item.id);
            this.pushPage(React.createElement(InputArr1Row, { vm: this }));
        });
        this.onInputF1 = () => __awaiter(this, void 0, void 0, function* () {
            this.vmForm.showBands(['f1'], 'f1', this.onInputF2);
            this.replacePage(React.createElement(InputF1, { vm: this }));
        });
        this.onInputF2 = () => __awaiter(this, void 0, void 0, function* () {
            this.vmForm.showBands(['f2'], 'f2', this.onShowAll);
            this.replacePage(React.createElement(InputF1, { vm: this }));
        });
        this.onShowAll = () => __awaiter(this, void 0, void 0, function* () {
            this.vmForm.showBands(undefined);
            this.replacePage(React.createElement(ShowAll, { vm: this }));
        });
        this.view = AddNew;
    }
    show() {
        return __awaiter(this, void 0, void 0, function* () {
            //nav.push(this.renderView());
            //alert('started');
            let tuid = this.entity.getTuidFromName('id1');
            let vmTuidPicker = new VmTuidPicker(this.crUsq, '选择Id1', tuid, this.onArticleSelected, RowContent);
            //nav.push(<SelectId1 vm={this} />)
            vmTuidPicker.start();
        });
    }
}
const SelectId1 = ({ vm }) => {
    let { onArticleSelected } = vm;
    return React.createElement(Page, { header: "\u9009\u62E9Article" },
        React.createElement("div", { className: "p-3" }, "\u8FD9\u91CC\u53EF\u4EE5\u641C\u7D22article\uFF0C\u7136\u540E\u5217\u8868\uFF0C\u70B9\u51FB\u9009\u62E9\u3002\u4E0B\u9762\u6309\u94AE\u662F\u76F4\u63A5id=1"),
        React.createElement(Button, { color: "primary", onClick: onArticleSelected }, "\u9009\u4E2DArticle id=1"));
};
const InputArr1Row = ({ vm }) => {
    let { onInputF1 } = vm;
    return React.createElement(Page, { header: "Arr1" },
        React.createElement("div", { className: "p-3" }, "\u8FD9\u91CC\u53EF\u4EE5\u6309\u884C\u8F93\u5165Arr1"),
        React.createElement(Button, { color: "primary", onClick: onInputF1 }, "\u5B8C\u8F93\u5165Arr1 row"));
};
const InputF1 = ({ vm }) => {
    let { label, vmForm, showAll, showField1, showField2 } = vm;
    return React.createElement(Page, { header: label },
        React.createElement("div", { className: "p-3" }, "\u73B0\u5728\u8F93\u5165F1\u5B57\u6BB5"),
        vmForm.render());
};
const InputF2 = ({ vm }) => {
    let { label, vmForm, showAll, showField1, showField2 } = vm;
    return React.createElement(Page, { header: label },
        React.createElement("div", { className: "p-3" }, "\u73B0\u5728\u8F93\u5165F2\u5B57\u6BB5"),
        vmForm.render());
};
const ShowAll = ({ vm }) => {
    let { label, vmForm, showAll, showField1, showField2 } = vm;
    return React.createElement(Page, { header: label },
        React.createElement("div", { className: "p-3" }, "\u81EA\u5DF1\u7684\u5355\u636E\u7A0B\u5E8F"),
        vmForm.render());
};
const AddNew = ({ vm }) => {
    let { label, vmForm, showAll, showField1, showField2 } = vm;
    return React.createElement(Page, { header: label },
        React.createElement("div", { className: "p-3" }, "\u81EA\u5DF1\u7684\u5355\u636E\u7A0B\u5E8F"),
        vmForm.render(),
        React.createElement("div", { className: "px-3" },
            React.createElement("div", { className: "form-group row" },
                React.createElement("div", { className: "offset-sm-2 col-sm-10" },
                    React.createElement("button", { className: "btn btn-primary", onClick: showAll }, "all"),
                    " \u00A0",
                    React.createElement("button", { className: "btn btn-primary", onClick: showField1 }, "f1"),
                    " \u00A0",
                    React.createElement("button", { className: "btn btn-primary", onClick: showField2 }, "f2")))));
};
//# sourceMappingURL=new.js.map