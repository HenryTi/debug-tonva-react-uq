import * as React from 'react';
import { Tuid, Book, Entity } from '../../entities';
import { VmEntity, vmLinkIcon, EntityUI } from '../vmEntity';
import { Page } from 'tonva-tools';
import { VmApi } from '../vmApi';
import { VmBookMain } from './vmBookMain';

export interface BookUI extends EntityUI {
    main: typeof VmBookMain,
}

export abstract class VmBook extends VmEntity {
    entity: Book;

    get icon() {return vmLinkIcon('text-muted', 'book')}
}
