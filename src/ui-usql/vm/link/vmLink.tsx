import * as React from 'react';
import { ViewModel } from '../viewModel';
import { VmEntity } from '../vmEntity';

export abstract class VmLink extends ViewModel {
    abstract onClick: () => void;
}

export class VmEntityLink extends VmLink {
    vmEntity: VmEntity

    constructor(vmEntity: VmEntity) {
        super();
        this.vmEntity = vmEntity;
    }

    protected view = Link;

    onClick = async () => {
        await this.vmEntity.start();
    }
}

export type TypeLink = React.StatelessComponent<{vm: VmEntityLink}>;

const Link = ({vm}:{vm: VmEntityLink}) => {
    let {vmEntity} = vm;
    return <div className="px-3 py-2  align-items-center">
        {vmEntity.icon} &nbsp; {vmEntity.label}
    </div>;
};
