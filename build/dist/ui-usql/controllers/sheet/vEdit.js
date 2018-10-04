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
import { FormMode } from '../form';
import { VSheetView } from './vSheetView';
export class VSheetEdit extends VSheetView {
    constructor() {
        super(...arguments);
        this.onSubmit = (values) => {
            alert('not implemented');
            return;
        };
        this.view = () => React.createElement(Page, { header: this.label }, this.vForm.render());
    }
    showEntry(param) {
        return __awaiter(this, void 0, void 0, function* () {
            this.vForm = this.createForm(this.onSubmit, param.data, FormMode.edit);
            this.openPage(this.view);
        });
    }
}
//# sourceMappingURL=vEdit.js.map