import { nav } from "tonva-tools";
import { VmApi } from "../vmApi";
import { Entity, TuidBase, Tuid, Query } from "../../entities";

//export type SearchFunc = (vmApi:VmApi, entity:Entity, param?:any) => Promise<any>;

export async function tuidSearch(vmApi:VmApi, tuid:TuidBase, param?:any):Promise<any> {
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
                let tuidSearch = vmApi.newVmTuidSearch(tuid, onTuidSelected);
                await tuidSearch.start(ownerId);
            }
            let ownerSearch = vmApi.newVmTuidSearch(owner, onOwnerSelected);
            ownerSearch.start(param);
        }
        else {
            let tuidSearch = vmApi.newVmTuidSearch(tuid, onTuidSelected);
            tuidSearch.start(param);
        }
    });
}

export async function querySearch(vmApi, query:Query, param?:any):Promise<any> {
    return new Promise<any>((resolve, reject) => {
        let onSelected = async (selecdValue:any) => {
            nav.pop();
            resolve(selecdValue);
        };
        let search = vmApi.newVmQuerySearch(query, onSelected);
        search.start(param);
    });
}
