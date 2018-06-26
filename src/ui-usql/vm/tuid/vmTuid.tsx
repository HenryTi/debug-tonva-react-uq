import * as React from 'react';
import { Tuid, Entity } from '../../entities';
import { VmEntity, vmLinkIcon } from '../entity/vmEnity';
import { Page, nav } from 'tonva-tools';
import { VmApi } from '../vmApi';
import { TypeContent, TuidContentJSON, VmTuidInput, TypeVmTuidInput } from '../tuid';
import { VmTuidEdit } from './vmTuidEdit';
import { VmTuidBase } from './vmTuidBase';
import { VmTuidList } from './vmTuidList';

export class VmTuid extends VmTuidBase {
    protected initBind() {
        super.initBind();
        this.onNew = this.onNew.bind(this);
        this.onList = this.onList.bind(this);
    }

    onNew() {
        this.nav(VmTuidEdit);
    }

    onList() {
        this.nav(VmTuidList);
    }

    renderView() {
        return <Page header={this.caption}>
            Tuid 
            <button className="btn btn-primary" onClick={this.onNew}>新建</button>
            <button className="btn btn-primary" onClick={this.onList}>列表</button>
        </Page>
    }
}
