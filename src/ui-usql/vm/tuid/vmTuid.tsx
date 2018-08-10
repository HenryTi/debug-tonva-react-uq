import * as React from 'react';
import { Tuid, Entity, TuidBase } from '../../entities';
import { VmEntity, vmLinkIcon, EntityUI } from '../vmEntity';
import { Page } from 'tonva-tools';
import { VmApi } from '../vmApi';
import { VmTuidMain } from './vmTuidMain';
import { VmTuidEdit } from './vmTuidEdit';
import { VmTuidView } from './vmView';
import { VmTuidSearch } from './vmTuidSearch';

export interface TuidUI extends EntityUI {
    main: typeof VmTuidMain;
    edit: typeof VmTuidEdit;
    view: typeof VmTuidView;
    search: typeof VmTuidSearch;
}

export abstract class VmTuid extends VmEntity {
    entity: TuidBase;
    protected ui: TuidUI;

    constructor(vmApi: VmApi, tuid: TuidBase, ui?:TuidUI) {
        super(vmApi, tuid, ui);
    }

    get icon() {return vmLinkIcon('text-info', 'list-alt')}
}
