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
import { Entity } from './entity';
var Map = /** @class */ (function (_super) {
    __extends(Map, _super);
    function Map() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.actions = {};
        _this.queries = {};
        return _this;
    }
    Object.defineProperty(Map.prototype, "typeName", {
        get: function () { return 'map'; },
        enumerable: true,
        configurable: true
    });
    Map.prototype.setSchema = function (schema) {
        _super.prototype.setSchema.call(this, schema);
        var actions = schema.actions, queries = schema.queries, keys = schema.keys;
        this.entities.buildFieldTuid(this.keys = keys);
        //let t = this.schemaStringify();
        for (var i in actions) {
            var schema_1 = actions[i];
            var name_1 = schema_1.name;
            var action = this.entities.newAction(name_1, undefined);
            action.setSchema(schema_1);
            this.actions[i] = action;
        }
        for (var i in queries) {
            var schema_2 = queries[i];
            var name_2 = schema_2.name;
            var query = this.entities.newQuery(name_2, undefined);
            query.setSchema(schema_2);
            this.queries[i] = query;
        }
    };
    return Map;
}(Entity));
export { Map };
//# sourceMappingURL=map.js.map