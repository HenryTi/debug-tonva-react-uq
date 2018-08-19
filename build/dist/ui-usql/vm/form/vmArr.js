var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as React from 'react';
import { List, FA } from 'tonva-react-form';
import { nav } from 'tonva-tools';
import { ViewModel } from '../viewModel';
export class VmArr extends ViewModel {
    constructor(ownerForm, name, rowContent, bands) {
        super();
        this.onSubmit = () => __awaiter(this, void 0, void 0, function* () {
            let values = this.vmForm.values;
            //await this.onRowChanged(values);
            if (this.afterEditRow !== undefined)
                yield this.afterEditRow(values);
        });
        this.afterEditRow = (values) => __awaiter(this, void 0, void 0, function* () {
            nav.pop();
            return;
        });
        /*
            async start(rowValues?: any) {
                this.rowValues = rowValues;
                if (rowValues === undefined)
                    this.vmForm.reset();
                else
                    this.vmForm.values = rowValues;
                if (this.onEditRow !== undefined)
                    await this.onEditRow(rowValues, this.onRowChanged);
                else
                    nav.push(<RowPage vm={this} />);
            }
        
        
            onRowChanged = async (rowValues:any) => {
                if (this.rowValues === undefined) {
                    let len = this.list.push(rowValues);
                    this.rowValues = this.list[len-1];
                }
                else {
                    _.merge(this.rowValues, rowValues);
                }
                this.vmForm.values = this.rowValues;
            }
        */
        this.renderItem = (item, index) => {
            return React.createElement(this.row, Object.assign({}, item));
        };
        this.addClick = () => this.start(undefined);
        this.start = (param) => { };
        this.view = ({ vm }) => {
            //let {label, list, renderItem, start, addClick, header, footer, readOnly} = vm;
            let button;
            if (this.readOnly === false) {
                button = React.createElement("button", { onClick: this.addClick, type: "button", className: "btn btn-primary btn-sm" },
                    React.createElement(FA, { name: "plus" }));
            }
            let header = this.header || React.createElement("div", { className: "" },
                React.createElement("div", { className: "flex-fill align-self-center" }, this.label),
                button);
            return React.createElement(List, { header: header, items: this.list, item: { render: this.renderItem, onClick: this.start } });
        };
        this.ownerForm = ownerForm;
        this.name = name;
        this.rowContent = rowContent;
        this.bands = bands;
        /*
        this.start = this.start.bind(this);
        //this.vmApi = vmApi;
        this.arr = arr;
        this.arrBandUI = arrBandUI;
        let {label, row, form} = arrBandUI;
        this.readOnly = form.readOnly;
        this.label = label;
        this.row = row || RowContent;
        this.list = observable.array([], {deep:true});

        //let bands = this.arrBandUI.bands.slice();
        let submitBand:SubmitBandUI = {
            type: 'submit',
            content: '{save} 完成',                    // 显示在按钮上的文本
        };
        //bands.push(submitBand);
        this.vmForm = new VmForm();
        this.vmForm.init({
            fields: arr.fields,
            //vmApi: vmApi,
            ui: {
                bands: undefined, // bands,
                className: undefined,
            },
            readOnly: this.readOnly,
        });
        this.vmForm.onSubmit = this.onSubmit;
        */
    }
    reset() {
        this.vmForm.reset();
        this.list.clear();
    }
}
/*
const ArrList = ({vm}:{vm:VmArr}) => {
    let {label, list, renderItem, start, addClick, header, footer, readOnly} = vm;
    let button;
    if (readOnly === false) {
        button = <button onClick={addClick}
            type="button"
            className="btn btn-primary btn-sm">
            <FA name="plus" />
        </button>;
    }
    header = header || <div className="">
        <div className="flex-fill align-self-center">{label}</div>
        {button}
    </div>;
    return <List
        header={header}
        footer={footer}
        items={list}
        item={{render: renderItem, onClick: start}} />;
};

const RowPage = ({vm}:{vm:VmArr}) => {
    let {label, vmForm} = vm;
    
    return <Page header={label}>
        {vmForm.render()}
    </Page>
}
*/ 
//# sourceMappingURL=vmArr.js.map