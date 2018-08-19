import * as React from 'react';
import { Page } from 'tonva-tools';
import { VmEntity } from '../VM';
import { Sheet } from '../../entities';

export class VmSheetSchema extends VmEntity<Sheet> {
    async showEntry(param?:any) {
        this.open(this.view);
    }

    protected view = () => <Page header={this.label + "模板"}>
        <pre className="mx-3 my-2">{this.entity.schemaStringify()}</pre>
    </Page>;
}

