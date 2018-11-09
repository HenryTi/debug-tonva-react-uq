var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import React from 'react';
import { VField } from './vField';
import { observer } from 'mobx-react';
var VComputeField = /** @class */ (function (_super) {
    __extends(VComputeField, _super);
    function VComputeField(form, field, fieldRes) {
        var _this = _super.call(this, form, field, undefined, fieldRes) || this;
        _this.view = observer(function () {
            var value = _this.form.values[_this.field.name];
            var _a = _this.fieldRes, placeHolder = _a.placeHolder, suffix = _a.suffix;
            var ctrlCN = 'form-control form-control-input bg-light';
            if (value === null)
                value = '';
            var input = React.createElement("input", { className: ctrlCN, type: "text", placeholder: placeHolder, readOnly: true, value: value });
            var inputGroup;
            if (suffix === undefined)
                inputGroup = input;
            else
                inputGroup = React.createElement("div", { className: "input-group" },
                    input,
                    React.createElement("div", { className: "input-group-append" },
                        React.createElement("span", { className: "input-group-text" }, suffix)));
            return inputGroup;
            /*
                return <div
                className="form-control form-control-plaintext border border-info rounded bg-light cursor-pointer">
                {value} &nbsp;
            </div>;
            */
        });
        return _this;
    }
    return VComputeField;
}(VField));
export { VComputeField };
//# sourceMappingURL=vComputeField.js.map