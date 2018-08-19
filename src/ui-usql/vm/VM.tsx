import * as React from 'react';
import Button from 'reactstrap/lib/Button';
import { nav, Page } from 'tonva-tools';
import { Entity, Field, Tuid } from '../entities';
import { CrUsq } from './crUsq';
import { EntityUI } from './vmEntity';
import { VmForm, FieldCalls } from './form';

export abstract class CoordinatorBase {
    disposer = () => {
        // message listener的清理
    }

    protected async showVm(vm: new (coordinator: CoordinatorBase)=>Vm, param?:any):Promise<void> {
        await (new vm(this)).showEntry(param);
    }

    async event(type:string, value:any) {
        await this.onEvent(type, value);
    }

    protected async onEvent(type:string, value:any) {
    }

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

    async start(param?:any):Promise<void> {
        await this.internalStart(param);
    }

    private _resolve_$:(value:any) => void;
    async call(param?:any):Promise<any> {
        return new Promise<any> ((resolve, reject) => {
            this._resolve_$ = resolve;
            this.start(param);
        });
    }

    return(value:any) {
        if (this._resolve_$ === undefined) {
            alert('the Coordinator call already returned, or not called');
            return;
        }
        this._resolve_$(value);
        this._resolve_$ = undefined;
    }

    protected abstract internalStart(param?:any):Promise<void>;
}

export abstract class Coordinator extends CoordinatorBase{
    crUsq: CrUsq;
    constructor(crUsq: CrUsq) {
        super();
        this.crUsq = crUsq;
    }
}

export abstract class CrEntity extends Coordinator {
    protected ui: EntityUI;
    protected res: any;
    constructor(crUsq: CrUsq, entity: Entity, ui: EntityUI, res: any) {
        super(crUsq);
        this.entity = entity;
        this.ui = ui;
        this.res = res;
        this.label = (res && res.label) || entity.name;
    }
    entity: Entity;
    abstract get icon(): any;
    readonly label:string;

    async start(param?:any):Promise<void> {
        await this.entity.loadSchema();
        await this.internalStart(param);
    }

    createForm(onSubmit:(values:any)=>Promise<void>, values?:any) {
        let {fields, arrFields} = this.entity;
        let ret = new VmForm({
            fields: fields,
            arrs: arrFields,
            ui: this.ui && this.ui.form,
            res: this.res,
            calls: this.buildCalls(),
        }, onSubmit);
        //ret.init(this.fieldsFormOptions);
        ret.setValues(values);
        return ret;
    }

    protected fieldCalls(): FieldCalls {
        return;
    }

    private buildCalls():FieldCalls {
        let {fields, arrFields} = this.entity;
        let ret:FieldCalls = {};
        this.buildFieldsCalls(ret, fields, undefined);
        if (arrFields !== undefined) {
            for (let arr of arrFields) {
                let {name, fields} = arr;
                this.buildFieldsCalls(ret, fields, name);
            }
        }
        return ret;
    }

    private buildFieldsCalls(ret:FieldCalls, fields:Field[], arr:string) {
        for (let field of fields) this.buildCall(ret, field, arr);
    }

    private buildCall(ret:FieldCalls, field:Field, arr:string) {
        let {name, type, tuid, _tuid} = field;
        if (tuid === undefined) return;
        let fn = arr === undefined? name : arr+'.'+name;
        ret[fn] = async (form:VmForm, field:string, values:any):Promise<any> => {
            let crTuidSelect = this.crUsq.crTuidSelect(_tuid as Tuid);
            return await crTuidSelect.call();
        };
    }

    /*
    protected get fieldsFormOptions():VmFormOptions {
        let {fields, arrFields} = this.entity;
        return {
            fields: fields || [],
            arrs: arrFields,
            crUsq: this.crUsq,
            ui: this.res,
        }
    }*/

    protected getRes() {
        return this.res;
    }
}

export abstract class EntityCoordinator<T extends Entity, UI extends EntityUI> extends CrEntity {
    protected ui: UI;
    entity: T;
    constructor(crUsq: CrUsq, entity: T, ui: UI, res: any) {
        super(crUsq, entity, ui, res);
    }
}

export abstract class Vm {
    //private _resolve_$_: (value?:any) => void;
    protected coordinator: CoordinatorBase;

    constructor(coordinator: CoordinatorBase) {
        this.coordinator = coordinator;
    }

    /*
    async run(param?:any):Promise<void> {
        //return new Promise<Result>((resolve, reject) => {
            //this._resolve_$_ = resolve;
            this.showEntry(param);
        //});
    }
    */
    /*
    async show(param?:any) {
        this.showEntry(param);
    }*/

    abstract showEntry(param?:any):Promise<void>;

    protected open(view: React.StatelessComponent) {
        nav.push(React.createElement(view));
    }

    protected close(level?:number) {
        nav.pop(level);
    }
    /*
    protected async retn(type:string, value?:any) {
        nav.pop();
        await this.resolve(type, value);
    }
    */
    protected async event(type:string, value?:any) {
        /*
        if (this._resolve_$_ !== undefined) {
            await this._resolve_$_({type:type, value:value});
            return;
        }*/
        await this.coordinator.event(type, value);
    }

    protected return(value:any) {
        this.coordinator.return(value);
    }
    /*
    protected async cancel() {
        nav.pop();
        //if (this._resolve_$_ === undefined) return;
        //await this._resolve_$_({type:undefined, value:undefined});
    }*/
}

export type VM = new (coordinator: CoordinatorBase)=>Vm;

export abstract class VmEntity<T extends Entity> extends Vm {
    protected coordinator: EntityCoordinator<T, EntityUI>;
    protected entity: T;
    constructor(coordinator: EntityCoordinator<T, EntityUI>) {
        super(coordinator);
        this.entity = coordinator.entity;
    }

    get label():string {return this.coordinator.label}

    private _form_$: VmForm;
    protected createForm(onSubmit:(values:any)=>Promise<void>, values?:any): VmForm {
        if (this._form_$ !== undefined) return this._form_$;
        return this.coordinator.createForm(onSubmit, values);
    }
}

export class TestCoordinator extends CoordinatorBase {
    protected async internalStart():Promise<void> {
        await this.showVm(TestVm);
    }

    protected async onEvent(type:string, value:any) {
        switch (type) {
            case 'vm1': await this.testVm1(); return;
            case 'click': alert('click: ' + value); return;
            case 'click1': alert('click1'); return;
        }
    }

    private async testVm1() {
        this.showVm(TestVm1);
    }
}

class TestVm extends Vm {
    async showEntry():Promise<void> {
        this.open(this.view);
    }
    
    private click = () => {
        this.close();
        this.event('click', 'kkkk');
    }

    private vm1Click = () => alert('dddd');
    private showVm1 = () => this.event('vm1');

    private click1 = () => {
        this.open(() => <Page header="TestVm inner page">
            Test1 VM <br/>
            <Button onClick={this.vm1Click}>Button</Button> <br/>
            <Button onClick={this.showVm1}>show TestVm1</Button> <br/>
        </Page>);
    }

    protected view = () => <Page>
        Test View <br/>
        <Button onClick={this.click}>Button</Button> <br/>
        <Button onClick={this.click1}>显示新页面</Button> <br/>
    </Page>;
}

class TestVm1 extends Vm {
    async showEntry():Promise<void> {
        this.open(this.view);
    }
    
    private click = () => {
        this.close();
        this.event('click', 'kkkk');
    }

    private click1 = () => {
        this.close(3);
        //this.event('click1');
        this.return('click1 returned');
    }

    protected view = () => <Page header="TestVm1">
        Test1 VM <br/>
        <Button onClick={this.click}>Button</Button> <br/>
        <Button onClick={this.click1}>return call</Button> <br/>
    </Page>;
}
