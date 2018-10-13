import * as React from 'react';
import { Page } from 'tonva-tools';
import { VEntity } from '../VM';
export class VSheetNew extends VEntity {
    constructor() {
        super(...arguments);
        this.onSubmit = async () => {
            let values = this.vForm.getValues();
            let valuesWithBox = this.vForm.values;
            //let ret = 
            await this.controller.onSave(values, valuesWithBox);
            /*
            this.ceasePage();
            //this.openPage(this.finishedPage);
            await this.controller.showSaved(ret);
            */
        };
        this.view = () => React.createElement(Page, { header: this.label }, this.vForm.render());
        /*
            private finishedPage = () => {
                return <Page header="已保存" back="close">
                    <div className="p-3 d-flex flex-column align-items-center">
                        <div className="text-success"><FA name="check-circle-o" /> 成功</div>
                        <div className="p-3">
                            <button className="btn btn-sm btn-primary" onClick={this.restart}>继续开单</button>
                            <button className="ml-3 btn btn-sm btn-outline-info" onClick={()=>this.backPage()}>返回</button>
                        </div>
                    </div>
                </Page>;
            }
        */
    }
    async showEntry(param) {
        this.vForm = this.createForm(this.onSubmit, param);
        this.openPage(this.view);
    }
}
//# sourceMappingURL=vNew.js.map