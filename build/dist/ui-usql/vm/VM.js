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
    get value() { return this._value_$_; }
    ;
    run(vm) {
        return __awaiter(this, void 0, void 0, function* () {
            let { type, value } = yield vm.run();
            this._value_$_ = value;
            return type;
        });
    }
    msg(text) {
        alert(text);
    }
    errorPage(header, err) {
        nav.push(React.createElement(Page, { header: "App error!" },
            React.createElement("pre", null, typeof err === 'string' ? err : err.message)));
    }
}
export class Coordinator extends CoordinatorBase {
    constructor(crUsq) {
        super();
        this.crUsq = crUsq;
    }
}
export class EntityCoordinator extends Coordinator {
    constructor(crUsq, entity, ui) {
        super(crUsq);
        this.entity = entity;
        this.label = (ui && ui.label) || entity.name;
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.entity.loadSchema();
            yield this.internalStart();
        });
    }
    createVmFieldsForm() {
        let ret = this.newVmFieldsForm();
        ret.init(this.fieldsFormOptions);
        return ret;
    }
    get fieldsFormOptions() {
        let { fields, arrFields } = this.entity;
        return {
            fields: fields || [],
            arrs: arrFields,
            crUsq: this.crUsq,
            ui: this.ui && this.ui.res,
        };
    }
    newVmFieldsForm() { return new VmForm(); }
}
export class Vm {
    constructor(coordinator) {
        this.coordinator = coordinator;
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this._resolve_$_ = resolve;
                this.show();
            });
        });
    }
    open(view) {
        nav.push(React.createElement(view), this.coordinator.disposer);
        this.coordinator.disposer = undefined;
    }
    close() {
        nav.pop();
    }
    retn(type, value) {
        return __awaiter(this, void 0, void 0, function* () {
            nav.pop();
            if (this._resolve_$_ === undefined)
                return;
            yield this._resolve_$_({ type: type, value: value });
        });
    }
    cancel() {
        return __awaiter(this, void 0, void 0, function* () {
            nav.pop();
            if (this._resolve_$_ === undefined)
                return;
            yield this._resolve_$_({ type: undefined, value: undefined });
        });
    }
}
export class TestCoordinator extends CoordinatorBase {
    main() {
        return __awaiter(this, void 0, void 0, function* () {
            let ret = yield this.run(new TestVm(this));
            ret = yield this.run(new TestVm1(this));
            return ret;
        });
    }
}
class TestVm extends Vm {
    constructor() {
        super(...arguments);
        this.click = () => {
            this.retn('click', 'kkkk');
        };
        this.vm1Click = () => alert('dddd');
        this.vm1Close = () => this.close();
        this.click1 = () => {
            this.open(() => React.createElement(Page, null,
                "Test1 VM ",
                React.createElement("br", null),
                React.createElement(Button, { onClick: this.vm1Click }, "Button"),
                " ",
                React.createElement("br", null),
                React.createElement(Button, { onClick: this.vm1Close }, "click result undefined"),
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
    show() {
        this.open(this.view);
    }
}
class TestVm1 extends Vm {
    constructor() {
        super(...arguments);
        this.click = () => {
            this.retn('click', 'kkkk');
        };
        this.click1 = () => {
            this.cancel();
        };
        this.view = () => React.createElement(Page, null,
            "Test1 VM ",
            React.createElement("br", null),
            React.createElement(Button, { onClick: this.click }, "Button"),
            " ",
            React.createElement("br", null),
            React.createElement(Button, { onClick: this.click1 }, "click result undefined"),
            " ",
            React.createElement("br", null));
    }
    show() {
        this.open(this.view);
    }
}
//# sourceMappingURL=VM.js.map