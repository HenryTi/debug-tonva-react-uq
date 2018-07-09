var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as React from 'react';
import { Page } from 'tonva-tools';
import { VmSheet } from './vmSheet';
import { VmForm } from '../vmForm';
export class VmEdit extends VmSheet {
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
        this.view = Edit;
    }
    load() {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            yield _super("load").call(this);
            let { schema } = this.entity;
            let { fields, arrs } = schema;
            this.vmForm = new VmForm({
                fields: fields,
                arrs: arrs,
                vmApi: this.vmApi,
            });
        });
    }
}
const Edit = ({ vm }) => {
    let { vmForm, showAll, showField1, showField2 } = vm;
    return React.createElement(Page, { header: vm.caption },
        vmForm.renderView(),
        React.createElement("div", null,
            React.createElement("button", { className: "btn btn-primary", onClick: showAll }, "all"),
            " \u00A0",
            React.createElement("button", { className: "btn btn-primary", onClick: showField1 }, "f1"),
            " \u00A0",
            React.createElement("button", { className: "btn btn-primary", onClick: showField2 }, "f2")));
};
//# sourceMappingURL=vmEdit.js.map