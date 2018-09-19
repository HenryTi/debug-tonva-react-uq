var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import _ from 'lodash';
import { CEntity } from "../VM";
import { VTuidMain } from './vmTuidMain';
import { VTuidEdit } from './vmTuidEdit';
import { VmTuidSelect } from './vmTuidSelect';
import { VTuidList } from "./vmTuidList";
import { entitiesRes } from '../../res';
import { VmTuidInfo } from "./vmTuidInfo";
import { TuidPagedItems } from "./pagedItems";
export class CTuid extends CEntity {
    constructor(cUsq, entity, ui, res) {
        super(cUsq, entity, ui, res);
    }
    get icon() { return entitiesRes['tuid'].icon; }
    search(key) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.pagedItems === undefined) {
                this.pagedItems = new TuidPagedItems(this.entity);
            }
            yield this.pagedItems.first(key);
        });
    }
}
export class CrTuidMain extends CTuid {
    constructor(crUsq, entity, ui, res) {
        super(crUsq, entity, ui, res);
        let tuid = this.entity;
        this.proxies = tuid.proxies;
        if (this.proxies !== undefined) {
            this.proxyLinks = [];
            for (let i in this.proxies) {
                let link = this.crUsq.linkFromName('tuid', i);
                this.proxyLinks.push(link);
            }
        }
    }
    getLable(tuid) {
        if (tuid === this.entity)
            return this.label;
        let { name } = tuid;
        if (this.res !== undefined) {
            let { arrs } = this.res;
            if (arrs !== undefined) {
                let arr = arrs[name];
                if (arr !== undefined) {
                    let label = arr.label;
                    if (label !== undefined)
                        return label;
                }
            }
        }
        return name;
    }
    get VTuidMain() { return VTuidMain; }
    get VTuidEdit() { return VTuidEdit; }
    get VTuidList() { return VTuidList; }
    internalStart() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.showVPage(this.VTuidMain);
        });
    }
    onEvent(type, value) {
        return __awaiter(this, void 0, void 0, function* () {
            let vm;
            switch (type) {
                default: return;
                case 'new':
                    vm = this.VTuidEdit;
                    break;
                case 'list':
                    vm = this.VTuidList;
                    break;
                case 'edit':
                    yield this.edit(value);
                    return;
                case 'item-changed':
                    this.itemChanged(value);
                    return;
            }
            yield this.showVPage(vm, value);
        });
    }
    edit(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let ret = yield this.entity.load(id);
            let vm = this.VTuidEdit;
            yield this.showVPage(vm, ret);
        });
    }
    itemChanged({ id, values }) {
        let items = this.pagedItems.items;
        let item = items.find(v => v.id === id);
        if (item !== undefined) {
            _.merge(item, values);
        }
    }
}
export class CrTuidMainSelect extends CTuid {
    internalStart(param) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.showVPage(this.VmTuidSelect, param);
        });
    }
    get VmTuidSelect() { return VmTuidSelect; }
}
export class CrTuidDivSelect extends CTuid {
    internalStart(param) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.showVPage(this.VmTuidSelect, param);
        });
    }
    get VmTuidSelect() { return VmTuidSelect; }
}
export class CrTuidInfo extends CTuid {
    internalStart(param) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.showVPage(this.VmTuidInfo, param);
        });
    }
    get VmTuidInfo() { return VmTuidInfo; }
}
//# sourceMappingURL=crTuid.js.map