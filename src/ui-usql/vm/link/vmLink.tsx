import * as React from 'react';
import { ViewModel } from '../viewModel';
import { VmEntity, EntityUI } from '../vmEntity';
import { Entity } from '../../entities';
import { CrUsq } from '../crUsq';
import { EntityCoordinator } from '../VM';

export abstract class VmLink extends ViewModel {
    abstract onClick: () => void;
}

export class VmEntityLink extends VmLink {
    vmEntity: VmEntity | EntityCoordinator<Entity, EntityUI>

    constructor(vmEntity: VmEntity | EntityCoordinator<Entity, EntityUI>) {
        super();
        this.vmEntity = vmEntity;
    }

    protected view = Link;

    onClick = async () => {
        await this.vmEntity.start();
    }
}

export class EntityLink<T extends Entity> {
    private crUsq: CrUsq;
    private entity: T;
    constructor(crUsq: CrUsq, entity: T) {
        this.crUsq = crUsq;
        this.entity = entity;
    }

    onClick = async () => {

    }
}

export type TypeLink = React.StatelessComponent<{vm: VmEntityLink}>;

const Link = ({vm}:{vm: VmEntityLink}) => {
    let {vmEntity} = vm;
    return <div className="px-3 py-2  align-items-center">
        {vmEntity.icon} &nbsp; {vmEntity.label}
    </div>;
};
