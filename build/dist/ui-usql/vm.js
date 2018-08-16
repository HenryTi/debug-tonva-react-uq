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
export class Coordinator {
    constructor() {
        this.disposer = () => {
            // message listener的清理
        };
    }
    get value() { return this._value_$_; }
    ;
    run(vm) {
        return __awaiter(this, void 0, void 0, function* () {
            let { type, value } = yield (new vm(this)).run();
            this._value_$_ = value;
            return type;
        });
    }
    main() {
        return __awaiter(this, void 0, void 0, function* () {
            let ret = yield this.run(Vm);
            if (ret === 'click') {
                alert('click: ' + this.value);
            }
            return ret;
        });
    }
}
export class Vm {
    constructor(coordinator) {
        this.click = () => {
            this.close('click', 'kkkk');
        };
        this.click1 = () => {
            this.cancel();
        };
        this.view = () => React.createElement(Page, null,
            "Test View ",
            React.createElement("br", null),
            React.createElement(Button, { onClick: this.click }, "Button"),
            " ",
            React.createElement("br", null),
            React.createElement(Button, { onClick: this.click1 }, "click result undefined"),
            " ",
            React.createElement("br", null));
        this.coordinator = coordinator;
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this._resolve_$_ = resolve;
                nav.push(React.createElement(this.view), this.coordinator.disposer);
                this.coordinator.disposer = undefined;
            });
        });
    }
    close(type, value) {
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
//# sourceMappingURL=vm.js.map