import * as React from 'react';
import { Map } from '../../entities';
import { VmEntity, vmLinkIcon, EntityUI } from '../vmEntity';
import { VmApi } from '../vmApi';
import { VmMapMain } from './vmMain';

export interface MapUI extends EntityUI {
    main: typeof VmMapMain,
    //keySearches: {[keyName:string]: (param:any)=>Promise<number>;};
}

export abstract class VmMap extends VmEntity {
    entity: Map;
    protected ui: MapUI;

    constructor(vmApi: VmApi, map: Map, ui?:MapUI) {
        super(vmApi, map, ui);
    }

    get icon() {return vmLinkIcon('text-muted', 'list-ul')}
}
