import * as React from 'react';
import { observer } from 'mobx-react';
import { TonvaForm, List, SubmitResult, FA } from 'tonva-react-form';
import { Page } from 'tonva-tools';
import { Tuid, Query, Entity } from '../../entities';
import { VmEntity, vmLinkIcon, EntityUI } from '../vmEntity';
import { VmApi } from '../vmApi';
import { VmQueryMain } from './vmQueryMain';
import { VmQuerySearch } from './vmQuerySearch';

export interface QueryUI extends EntityUI {
    main: typeof VmQueryMain;
    search: typeof VmQuerySearch;
}

export abstract class VmQuery extends VmEntity {
    entity: Query;

    constructor(vmApi:VmApi, query:Query, ui?:QueryUI) {
        super(vmApi, query, ui);
    }

    get icon() {return vmLinkIcon('text-warning', 'search')}
}
