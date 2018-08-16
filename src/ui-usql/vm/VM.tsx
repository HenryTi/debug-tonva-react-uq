import * as React from 'react';
import {observable} from 'mobx';
import Button from 'reactstrap/lib/Button';
import { nav, Page } from 'tonva-tools';
import { Entity } from '../entities';
import { CrUsq } from './crUsq';
import { EntityUI, VmEntity } from './vmEntity';
import { VmForm, VmFormOptions } from './form';

interface Result {
    type: string;
    value: any;
}

export abstract class CoordinatorBase {
    disposer = () => {
        // message listener的清理
    }

    private _value_$_:any;
    get value():any {return this._value_$_};

    protected async run(vm: Vm, param?:any):Promise<string> {
        let {type, value} = await vm.run(param);
        this._value_$_ = value;
        return type;
    }

    protected async show(vm: Vm, param?:any) {
        await vm.show(param);
    }

    async event(type:string, value:any) {
        await this.onEvent(type, value);
    }

    protected async onEvent(type:string, value:any) {}

    protected msg(text:string) {
        alert(text);
    }
    protected errorPage(header:string, err:any) {
        nav.push(<Page header="App error!">
            <pre>
                {typeof err === 'string'? err : err.message}
            </pre>
        </Page>);
    }
}

export abstract class Coordinator extends CoordinatorBase{
    crUsq: CrUsq;
    constructor(crUsq: CrUsq) {
        super();
        this.crUsq = crUsq;
    }
}

export abstract class EntityCoordinator<T extends Entity, UI extends EntityUI> extends Coordinator {
    protected ui: UI;
    constructor(crUsq: CrUsq, entity: T, ui: EntityUI) {
        super(crUsq);
        this.entity = entity;
        this.label = (ui && ui.label) || entity.name;
    }
    entity: T;
    abstract get icon(): any;
    readonly label:string;

    async start(param?:any):Promise<void> {
        await this.entity.loadSchema();
        await this.internalStart(param);
    }

    protected abstract internalStart(param?:any):Promise<void>;

    createVmFieldsForm() {
        let ret = this.newVmFieldsForm();
        ret.init(this.fieldsFormOptions);
        return ret;
    }

    protected get fieldsFormOptions():VmFormOptions {
        let {fields, arrFields} = this.entity;
        return {
            fields: fields || [],
            arrs: arrFields,
            crUsq: this.crUsq,
            ui: this.ui && this.ui.res,
        }
    }

    protected newVmFieldsForm(): VmForm {return new VmForm()}
    protected getRes() {
        return this.ui && this.ui.res;
    }
}

export abstract class Vm {
    private _resolve_$_: (value?:any) => void;
    protected coordinator: CoordinatorBase;

    constructor(coordinator: CoordinatorBase) {
        this.coordinator = coordinator;
    }

    async run(param?:any):Promise<Result> {
        return new Promise<Result>((resolve, reject) => {
            this._resolve_$_ = resolve;
            this.showEntryPage(param);
        });
    }

    async show(param?:any) {
        this.showEntryPage(param);
    }

    protected abstract showEntryPage(param?:any):Promise<void>;

    protected open(view: React.StatelessComponent) {
        nav.push(React.createElement(view));
    }

    protected close() {
        nav.pop();
    }

    protected async retn(type:string, value?:any) {
        nav.pop();
        await this.resolve(type, value);
    }

    protected async resolve(type:string, value?:any) {
        if (this._resolve_$_ !== undefined) {
            await this._resolve_$_({type:type, value:value});
            return;
        }
        await this.coordinator.event(type, value);
    }

    protected async cancel() {
        nav.pop();
        if (this._resolve_$_ === undefined) return;
        await this._resolve_$_({type:undefined, value:undefined});
    }
}

export abstract class Vm_Entity<T extends Entity> extends Vm {
    protected coordinator: EntityCoordinator<T, EntityUI>;
    protected entity: T;
    constructor(coordinator: EntityCoordinator<T, EntityUI>) {
        super(coordinator);
        this.entity = coordinator.entity;
    }

    get label():string {return this.coordinator.label}
}

export class TestCoordinator extends CoordinatorBase {
    async main():Promise<string> {
        let ret = await this.run(new TestVm(this));
        ret = await this.run(new TestVm1(this));
        return ret;
    }
}

class TestVm extends Vm {
    protected async showEntryPage():Promise<void> {
        this.open(this.view);
    }
    
    private click = () => {
        this.retn('click', 'kkkk');
    }

    private vm1Click = () => alert('dddd');
    private vm1Close = () => this.close();

    private click1 = () => {
        this.open(() => <Page>
            Test1 VM <br/>
            <Button onClick={this.vm1Click}>Button</Button> <br/>
            <Button onClick={this.vm1Close}>click result undefined</Button> <br/>
        </Page>);
    }

    protected view = () => <Page>
        Test View <br/>
        <Button onClick={this.click}>Button</Button> <br/>
        <Button onClick={this.click1}>显示新页面</Button> <br/>
    </Page>;
}

class TestVm1 extends Vm {
    protected async showEntryPage():Promise<void> {
        this.open(this.view);
    }
    
    private click = () => {
        this.retn('click', 'kkkk');
    }

    private click1 = () => {
        this.cancel();
    }

    protected view = () => <Page>
        Test1 VM <br/>
        <Button onClick={this.click}>Button</Button> <br/>
        <Button onClick={this.click1}>click result undefined</Button> <br/>
    </Page>;
}
