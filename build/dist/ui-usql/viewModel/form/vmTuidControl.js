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
import { RedMark } from './control';
import { VmContentControl } from './vmContentControl';
const buttonStyle = {
    textAlign: 'left',
    paddingLeft: '0.75rem',
    paddingRight: '0.75rem',
    overflow: 'hidden'
};
export class VmTuidControl extends VmContentControl {
    constructor(fieldUI, formValues, vmContent, search
    //tuid: TuidBase, 
    //tuidContent: TypeContent, 
    //pickerConfig: PickerConfig
    ) {
        super(fieldUI, formValues, vmContent);
        this.onClick = () => __awaiter(this, void 0, void 0, function* () {
            if (this.readOnly === true) {
                yield super.onClick();
                return;
            }
            let id = yield this.search();
            this.setValue(id);
            this.vmContent.setValue(id);
        });
        this.view = observer(() => {
            let content = this.value === undefined ?
                React.createElement(React.Fragment, null, "\u70B9\u51FB\u9009\u62E9") :
                this.vmContent.render();
            if (this.readOnly === true) {
                return React.createElement("div", { className: "form-control form-control-plaintext border border-info rounded bg-light cursor-pointer", onClick: this.onClick }, content);
            }
            let redDot;
            let { field, required } = this.fieldUI;
            if (required === true || field.null === false) {
                redDot = React.createElement(RedMark, null);
            }
            return React.createElement(React.Fragment, null,
                redDot,
                React.createElement("button", { className: "form-control btn btn-outline-info", type: "button", style: buttonStyle, onClick: this.onClick }, content));
        });
        this.search = search;
        //this.tuid = tuid;
        //this.tuidContent = tuidContent;
        //this.pickerConfig = pickerConfig;
        this.setValue(formValues.values[this.name]);
        //if (id !== null) this.idChanged(id);
    }
}
//# sourceMappingURL=vmTuidControl.js.map