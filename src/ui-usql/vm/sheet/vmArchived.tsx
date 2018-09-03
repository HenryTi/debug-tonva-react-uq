import * as React from 'react';
import {Button} from 'reactstrap';
import {List} from 'tonva-react-form';
import {Page} from 'tonva-tools';
import { VmView } from './vmView';
import { VmEntity } from '../VM';
import { Sheet } from '../../entities';
import { CrSheet, SheetUI } from './crSheet';

export interface State {
    flows: any;
    data: any;
}
export class VmArchived extends VmView { // VmEntity<Sheet, SheetUI> {
    protected coordinator: CrSheet;
    brief: any;
    //vmView: VmView;

    async showEntry(inBrief:any) {
        let {brief, data, flows} = await this.coordinator.getArchived(inBrief.id);
        this.brief = brief;
        this.data = data;
        this.flows = flows;
        //this.vmView = new VmView(this.coordinator, sheetData, this.brief.state, flows);
        this.vmForm = this.createForm(this.data);
        this.open(this.view);
    }

    protected view = () => {
        return <Page header={this.label + ':' + '-' + this.brief.no}>
            <this.view />
        </Page>;
    };
}
