import * as React from 'react';
import { Tuid, Entity, TuidBase } from '../../entities';
import { VmEntity, vmLinkIcon, EntityUI } from '../vmEntity';
import { Page } from 'tonva-tools';
import { CrUsq } from '../crUsq';
import { TuidUI } from './crTuid';

export abstract class VmTuid extends VmEntity {
    entity: TuidBase;
    protected ui: TuidUI;

    constructor(crUsq: CrUsq, tuid: TuidBase, ui?:TuidUI) {
        super(crUsq, tuid, ui);
    }

}
