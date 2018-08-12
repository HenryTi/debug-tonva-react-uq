import * as React from 'react';
import { observer } from 'mobx-react';
import { Tuid, Action, Entity } from '../../entities';
import { VmEntity, vmLinkIcon, EntityUI } from '../vmEntity';
import { Page, nav, } from 'tonva-tools';
import { VmForm } from '../vmForm';
import { VmActionMain } from './vmActionMain';

export interface ActionUI extends EntityUI {
    main: typeof VmActionMain,
}

export class VmAction extends VmEntity {
    entity: Action;

    get icon() {return vmLinkIcon('text-success', 'hand-o-right')}
}
