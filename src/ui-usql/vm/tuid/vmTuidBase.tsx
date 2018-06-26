import * as React from 'react';
import { Tuid, Entity } from '../../entities';
import { VmEntity, vmLinkIcon } from '../entity/vmEnity';
import { Page, nav } from 'tonva-tools';
import { VmApi } from '../vmApi';
import { TypeContent, TuidContentJSON, VmTuidInput, TypeVmTuidInput } from '../tuid';

export abstract class VmTuidBase extends VmEntity {
    entity: Tuid;

    constructor(vmApi: VmApi, tuid: Tuid) {
        super(vmApi, tuid);
    }

    get icon() {return vmLinkIcon('text-info', 'list-alt')}

    async load() {
        await this.entity.loadSchema();
        this.buildObservableValues(this.entity.schema.fields);
    }
}
