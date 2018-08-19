var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as React from 'react';
import Button from 'reactstrap/lib/Button';
import { nav, Page } from 'tonva-tools';
import { VmForm } from './form';
export class CoordinatorBase {
    constructor() {
        this.disposer = () => {
            // message listener的清理
        };
    }
    showVm(vm, param) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (new vm(this)).showEntry(param);
        });
    }
    event(type, value) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.onEvent(type, value);
        });
    }
    onEvent(type, value) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    msg(text) {
        alert(text);
    }
    errorPage(header, err) {
        nav.push(React.createElement(Page, { header: "App error!" },
            React.createElement("pre", null, typeof err === 'string' ? err : err.message)));
    }
    start(param) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.internalStart(param);
        });
    }
    call(param) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this._resolve_$ = resolve;
                this.start(param);
            });
        });
    }
    return(value) {
        if (this._resolve_$ === undefined) {
            alert('the Coordinator call already returned, or not called');
            return;
        }
        this._resolve_$(value);
        this._resolve_$ = undefined;
    }
}
export class Coordinator extends CoordinatorBase {
    constructor(crUsq) {
        super();
        this.crUsq = crUsq;
    }
}
export class CrEntity extends Coordinator {
    constructor(crUsq, entity, ui, res) {
        super(crUsq);
        this.entity = entity;
        this.ui = ui;
        this.res = res;
        this.label = (res && res.label) || entity.name;
    }
    start(param) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.entity.loadSchema();
            yield this.internalStart(param);
        });
    }
    createForm(onSubmit, values) {
        let { fields, arrFields } = this.entity;
        let ret = new VmForm({
            fields: fields,
            arrs: arrFields,
            ui: this.ui && this.ui.form,
            res: this.res,
            calls: this.fieldCalls(),
        }, onSubmit);
        //ret.init(this.fieldsFormOptions);
        ret.setValues(values);
        return ret;
    }
    fieldCalls() {
        return;
    }
    /*
    protected get fieldsFormOptions():VmFormOptions {
        let {fields, arrFields} = this.entity;
        return {
            fields: fields || [],
            arrs: arrFields,
            crUsq: this.crUsq,
            ui: this.res,
        }
    }*/
    getRes() {
        return this.res;
    }
}
export class EntityCoordinator extends CrEntity {
    constructor(crUsq, entity, ui, res) {
        super(crUsq, entity, ui, res);
    }
}
export class Vm {
    constructor(coordinator) {
        this.coordinator = coordinator;
    }
    open(view) {
        nav.push(React.createElement(view));
    }
    close(level) {
        nav.pop(level);
    }
    /*
    protected async retn(type:string, value?:any) {
        nav.pop();
        await this.resolve(type, value);
    }
    */
    event(type, value) {
        return __awaiter(this, void 0, void 0, function* () {
            /*
            if (this._resolve_$_ !== undefined) {
                await this._resolve_$_({type:type, value:value});
                return;
            }*/
            yield this.coordinator.event(type, value);
        });
    }
    return(value) {
        this.coordinator.return(value);
    }
}
export class VmEntity extends Vm {
    constructor(coordinator) {
        super(coordinator);
        this.entity = coordinator.entity;
    }
    get label() { return this.coordinator.label; }
    createForm(onSubmit, values) {
        if (this._form_$ !== undefined)
            return this._form_$;
        return this.coordinator.createForm(onSubmit, values);
    }
}
export class TestCoordinator extends CoordinatorBase {
    internalStart() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.showVm(TestVm);
        });
    }
    onEvent(type, value) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (type) {
                case 'vm1':
                    yield this.testVm1();
                    return;
                case 'click':
                    alert('click: ' + value);
                    return;
                case 'click1':
                    alert('click1');
                    return;
            }
        });
    }
    testVm1() {
        return __awaiter(this, void 0, void 0, function* () {
            this.showVm(TestVm1);
        });
    }
}
class TestVm extends Vm {
    constructor() {
        super(...arguments);
        this.click = () => {
            this.close();
            this.event('click', 'kkkk');
        };
        this.vm1Click = () => alert('dddd');
        this.showVm1 = () => this.event('vm1');
        this.click1 = () => {
            this.open(() => React.createElement(Page, { header: "TestVm inner page" },
                "Test1 VM ",
                React.createElement("br", null),
                React.createElement(Button, { onClick: this.vm1Click }, "Button"),
                " ",
                React.createElement("br", null),
                React.createElement(Button, { onClick: this.showVm1 }, "show TestVm1"),
                " ",
                React.createElement("br", null)));
        };
        this.view = () => React.createElement(Page, null,
            "Test View ",
            React.createElement("br", null),
            React.createElement(Button, { onClick: this.click }, "Button"),
            " ",
            React.createElement("br", null),
            React.createElement(Button, { onClick: this.click1 }, "\u663E\u793A\u65B0\u9875\u9762"),
            " ",
            React.createElement("br", null));
    }
    showEntry() {
        return __awaiter(this, void 0, void 0, function* () {
            this.open(this.view);
        });
    }
}
class TestVm1 extends Vm {
    constructor() {
        super(...arguments);
        this.click = () => {
            this.close();
            this.event('click', 'kkkk');
        };
        this.click1 = () => {
            this.close(3);
            //this.event('click1');
            this.return('click1 returned');
        };
        this.view = () => React.createElement(Page, { header: "TestVm1" },
            "Test1 VM ",
            React.createElement("br", null),
            React.createElement(Button, { onClick: this.click }, "Button"),
            " ",
            React.createElement("br", null),
            React.createElement(Button, { onClick: this.click1 }, "return call"),
            " ",
            React.createElement("br", null));
    }
    showEntry() {
        return __awaiter(this, void 0, void 0, function* () {
            this.open(this.view);
        });
    }
}
//# sourceMappingURL=VM.js.map