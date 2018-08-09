import * as React from 'react';
import { Tuid, Book, Entity, Map } from '../../entities';
import { VmEntity, vmLinkIcon } from '../vmEntity';
import { Page } from 'tonva-tools';
import { VmApi } from '../vmApi';

export abstract class VmMap extends VmEntity {
    entity: Map;

    get icon() {return vmLinkIcon('text-muted', 'list-ul')}
}
