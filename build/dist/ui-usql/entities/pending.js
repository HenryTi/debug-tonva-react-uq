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
import { Query } from './query';
var Pending = /** @class */ (function (_super) {
    __extends(Pending, _super);
    function Pending() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.queryApiName = 'pending';
        return _this;
    }
    Object.defineProperty(Pending.prototype, "typeName", {
        get: function () { return 'pending'; },
        enumerable: true,
        configurable: true
    });
    return Pending;
}(Query));
export { Pending };
//# sourceMappingURL=pending.js.map