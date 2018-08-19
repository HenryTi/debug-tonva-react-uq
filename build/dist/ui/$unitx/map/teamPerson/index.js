var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { VmMapMain } from '../../../../ui-usql';
class VmMapTeamPerson extends VmMapMain {
    keyQuery(key) {
        switch (key.name) {
            case 'post': return {
                queryName: 'teamPosts',
                idName: 'post'
            };
        }
    }
    searchOnKey(keyField, param) {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            switch (keyField.name) {
                default: return yield _super("searchOnKey").call(this, keyField, param);
                case 'post': return yield this.searchOnPost(param);
            }
        });
    }
    searchOnPost(param) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = yield this.coordinator.crUsq.getQuerySearch('teamPosts');
            //let val = await this.coordinator.crUsq.querySearch(query, param);
            //return val['post'].id;
            return 0;
        });
    }
}
const ui = {
//label: '部门员工对照表',
//main: VmMapTeamPerson,
};
export default ui;
//# sourceMappingURL=index.js.map