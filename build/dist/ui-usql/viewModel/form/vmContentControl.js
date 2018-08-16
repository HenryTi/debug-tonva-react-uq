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
import { VmControl } from './control';
const buttonStyle = {
    textAlign: 'left',
    paddingLeft: '0.75rem',
    paddingRight: '0.75rem',
    overflow: 'hidden'
};
export class VmContentControl extends VmControl {
    //tuid: TuidBase;
    //tuidContent: TypeContent;
    //pickerConfig: PickerConfig;
    constructor(fieldUI, formValues, vmContent
    //tuid: TuidBase, 
    //tuidContent: TypeContent, 
    //pickerConfig: PickerConfig
    ) {
        super(fieldUI, formValues);
        this.onClick = () => __awaiter(this, void 0, void 0, function* () {
            yield this.vmContent.show();
        });
        this.view = observer(() => {
            return React.createElement("div", { className: "form-control form-control-plaintext border border-info rounded bg-light cursor-pointer", onClick: this.onClick }, this.vmContent.render());
        });
        this.vmContent = vmContent;
        //this.tuid = tuid;
        //this.tuidContent = tuidContent;
        //this.pickerConfig = pickerConfig;
        this.setValue(formValues.values[this.name]);
        //if (id !== null) this.idChanged(id);
    }
}
//# sourceMappingURL=vmContentControl.js.map