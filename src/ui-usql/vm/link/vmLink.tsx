import * as React from 'react';
import { nav } from 'tonva-tools';
import { Entity, Tuid } from '../../entities';
import { ViewModel } from '../viewModel';
import { VmEntity } from '../entity';
import { VmActionMain } from '../action';
import { VmTuidMain } from '../tuid';
import { VmQueryMain } from '../query';
import { VmSheetMain } from '../sheet';
import { VmBookMain } from '../book';

export abstract class VmLink extends ViewModel {
    abstract onClick: () => void;
}

export class VmEntityLink extends VmLink {
    vmEntity: VmEntity

    constructor(vmEntity: VmEntity) {
        super();
        this.vmEntity = vmEntity;
        //this.view = link;
    }

    protected view = Link;

    onClick = async () => {
        await this.vmEntity.load();
        nav.push(this.vmEntity.renderView());
    }
}

export type TypeLink = React.StatelessComponent<{vm: VmEntityLink}>;

const Link = ({vm}:{vm: VmEntityLink}) => {
    let {vmEntity} = vm;
    return <div className="px-3 py-2  align-items-center">
        {vmEntity.icon} &nbsp; {vmEntity.caption}
    </div>;
};
