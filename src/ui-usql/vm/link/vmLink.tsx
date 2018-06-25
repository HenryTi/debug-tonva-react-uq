import * as React from 'react';
import { nav } from 'tonva-tools';
import { Entity, Tuid } from '../../entities';
import { ViewModel } from '../viewModel';
import { VmEntity, VmTuid, VmAction, VmQuery, VmSheet, VmBook } from '../entity';

export abstract class VmLink extends ViewModel {
    abstract onClick();
}

export abstract class VmEntityLink extends VmLink {
    protected vmEntity: VmEntity

    constructor(vmEntity: VmEntity) {
        super();
        this.vmEntity = vmEntity;
        this.onClick = this.onClick.bind(this);
    }

    async onClick() {
        await this.vmEntity.load();
        nav.push(this.vmEntity.renderView());
    }

    renderView() {
        return <div className="px-3 py-2  align-items-center">{this.vmEntity.icon} &nbsp; {this.vmEntity.caption}</div>;
    }
}

export class VmTuidLink extends VmEntityLink {
    protected vmEntity: VmTuid;
}

export class VmActionLink extends VmEntityLink {
    protected vmEntity: VmAction;
}

export class VmQueryLink extends VmEntityLink {
    protected vmEntity: VmQuery;
}

export class VmSheetLink extends VmEntityLink {
    protected vmEntity: VmSheet;
}

export class VmBookLink extends VmEntityLink {
    protected vmEntity: VmBook;
}
