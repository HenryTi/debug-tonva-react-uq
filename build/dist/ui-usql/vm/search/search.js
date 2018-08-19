/*
import { nav } from "tonva-tools";
import { CrUsq } from "../crUsq";
import { Entity, TuidBase, Tuid, Query } from "../../entities";

//export type SearchFunc = (crUsq:CrUsq, entity:Entity, param?:any) => Promise<any>;

export async function tuidSearch(crUsq:CrUsq, tuid:TuidBase, param?:any):Promise<any> {
    return new Promise<any>((resolve, reject) => {
        let onTuidSelected = async (selecdValue:any) => {
            nav.pop();
            resolve(selecdValue);
        };
        let {owner} = tuid;
        if (owner !== undefined) {
            let onOwnerSelected = async (ownerItem:any) => {
                nav.pop();
                let ownerId = owner.getIdFromObj(ownerItem);
                owner.useId(ownerId);
                let tuidSearch = crUsq.newVmTuidSearch(tuid, onTuidSelected);
                await tuidSearch.start(ownerId);
            }
            let ownerSearch = crUsq.newVmTuidSearch(owner, onOwnerSelected);
            ownerSearch.start(param);
        }
        else {
            let tuidSearch = crUsq.newVmTuidSearch(tuid, onTuidSelected);
            tuidSearch.start(param);
        }
    });
}

export async function querySearch(crUsq, query:Query, param?:any):Promise<any> {
    return new Promise<any>((resolve, reject) => {
        let onSelected = async (selecdValue:any) => {
            nav.pop();
            resolve(selecdValue);
        };
        let search = crUsq.newVmQuerySearch(query, onSelected);
        search.start(param);
    });
}
*/ 
//# sourceMappingURL=search.js.map