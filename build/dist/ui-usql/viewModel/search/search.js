var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { nav } from "tonva-tools";
//export type SearchFunc = (vmUsq:VmApi, entity:Entity, param?:any) => Promise<any>;
export function tuidSearch(vmUsq, tuid, param) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            let onTuidSelected = (selecdValue) => __awaiter(this, void 0, void 0, function* () {
                nav.pop();
                resolve(selecdValue);
            });
            let { owner } = tuid;
            if (owner !== undefined) {
                let onOwnerSelected = (ownerItem) => __awaiter(this, void 0, void 0, function* () {
                    nav.pop();
                    let ownerId = owner.getIdFromObj(ownerItem);
                    owner.useId(ownerId);
                    let tuidSearch = vmUsq.newVmTuidSearch(tuid, onTuidSelected);
                    yield tuidSearch.start(ownerId);
                });
                let ownerSearch = vmUsq.newVmTuidSearch(owner, onOwnerSelected);
                ownerSearch.start(param);
            }
            else {
                let tuidSearch = vmUsq.newVmTuidSearch(tuid, onTuidSelected);
                tuidSearch.start(param);
            }
        });
    });
}
export function querySearch(vmUsq, query, param) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            let onSelected = (selecdValue) => __awaiter(this, void 0, void 0, function* () {
                nav.pop();
                resolve(selecdValue);
            });
            let search = vmUsq.newVmQuerySearch(query, onSelected);
            search.start(param);
        });
    });
}
//# sourceMappingURL=search.js.map