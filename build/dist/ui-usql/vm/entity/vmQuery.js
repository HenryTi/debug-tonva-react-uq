var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as React from 'react';
import { VmEntity, vmLinkIcon } from './vmEnity';
import { Page, nav } from 'tonva-tools';
import { List } from 'tonva-react-form';
import { observer } from 'mobx-react';
const vmRegs = {};
export function regVmQuery(name) {
    return (target) => {
        vmRegs[name] = target;
        return target;
    };
}
export class VmQuery extends VmEntity {
    static create(name, vmApi, query) {
        let vq = vmRegs[name];
        return vq !== undefined ? new vq(vmApi, query) : new VmQuery(vmApi, query);
    }
    static get vmRegs() { return vmRegs; }
    constructor(vmApi, query) {
        super(vmApi, query);
    }
    load() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.entity.loadSchema();
            this.buildObservableValues(this.entity.schema.fields);
        });
    }
    get icon() { return vmLinkIcon('text-warning', 'search'); }
    submit(values) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.entity.resetPage(30, values);
            nav.push(React.createElement(QueryResultPage, { vm: this }));
            return;
        });
    }
    renderForm(className) {
        let vmForm = this.newVmForm(this.values, this.entity.schema.fields, undefined, className);
        return vmForm.renderView();
    }
    renderView() {
        return React.createElement(QueryPage, { vm: this });
    }
}
let QueryPage = class QueryPage extends React.Component {
    render() {
        let { vm } = this.props;
        let { caption, values } = this.props.vm;
        return React.createElement(Page, { header: caption },
            vm.renderForm('mx-3 my-2'),
            "values: ",
            JSON.stringify(values));
    }
};
QueryPage = __decorate([
    observer
], QueryPage);
export { QueryPage };
let VMQuery查询Test = class VMQuery查询Test extends VmQuery {
    renderExtra() {
        return React.createElement("div", null,
            "new values: ",
            JSON.stringify(this.values));
    }
};
VMQuery查询Test = __decorate([
    regVmQuery('查询test')
], VMQuery查询Test);
export { VMQuery查询Test };
let VMQuery商品流水q = class VMQuery商品流水q extends VmQuery {
};
VMQuery商品流水q = __decorate([
    regVmQuery('商品流水q')
], VMQuery商品流水q);
export { VMQuery商品流水q };
/*
export class MainPage extends React.Component<QueryUIProps> {
    private formRows: FormRow[];

    constructor(props) {
        super(props);
        let ui = this.props.ui;
        this.formRows = ui.mapMain();
        this.submit = this.submit.bind(this);
    }

    async submit(values: any): Promise<SubmitResult | undefined> {
        let {ui} = this.props;
        await ui.entity.resetPage(30, values);
        nav.push(<QueryResultPage ui={ui} />);
        return;
    }

    render() {
        let {ui} = this.props;
        let {caption, entity, entitiesUI} = ui;
        let {name, schema} = entity;
        return <Page header={caption || name}>
            <TonvaForm className="m-3"
                //context={entitiesUI}
                formRows={this.formRows}
                onSubmit={this.submit} />
        </Page>;
    }
}
*/
let QueryResultPage = class QueryResultPage extends React.Component {
    componentWillMount() {
        return __awaiter(this, void 0, void 0, function* () {
            let { vm } = this.props;
            let { entity } = vm;
            yield entity.loadPage();
        });
    }
    render() {
        let { vm } = this.props;
        let { entity, caption } = vm;
        let { name, loaded, list } = entity;
        let content;
        if (loaded === true) {
            content = React.createElement(List, { items: list, item: {} });
        }
        else {
            content = React.createElement("div", null, "...");
        }
        return React.createElement(Page, { header: caption || name }, content);
    }
};
QueryResultPage = __decorate([
    observer
], QueryResultPage);
//# sourceMappingURL=vmQuery.js.map