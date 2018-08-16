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
export class Coord {
    get value() { return this._$_value; }
    ;
    run(vm, funcs) {
        return __awaiter(this, void 0, void 0, function* () {
            let { type, value } = yield (new vm).run(funcs);
            this._$_value = value;
            return type;
        });
    }
    main() {
        return __awaiter(this, void 0, void 0, function* () {
            let funcs = {};
            alert(typeof Vm);
            let ret = yield this.run(Vm, funcs);
            if (ret === 'click') {
                alert('click: ' + this.value);
            }
            return ret;
        });
    }
}
export class Vm {
    constructor() {
        this.click = () => {
            this.result('click', 'kkkk');
        };
        this.click1 = () => {
            this.result(undefined, 'click1 value');
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
    }
    run(funcs) {
        return __awaiter(this, void 0, void 0, function* () {
            this.funcs = funcs;
            return new Promise((resolve, reject) => {
                this.resolve = resolve;
                nav.push(React.createElement(this.view));
            });
        });
    }
    result(type, value) {
        return __awaiter(this, void 0, void 0, function* () {
            nav.pop();
            if (this.resolve === undefined)
                return;
            yield this.resolve({ type: type, value: value });
        });
    }
}
//# sourceMappingURL=view.js.map