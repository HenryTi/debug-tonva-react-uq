import * as React from 'react';
import { Tuid, Query, Entity } from '../../entities';
import { VmEntity, vmLinkIcon } from './vmEnity';
import { Page, nav } from 'tonva-tools';
import { VmApi } from '../vmApi';
import { TonvaForm, List, SubmitResult } from 'tonva-react-form';
import { observer } from 'mobx-react';
import { VmForm } from '../control/form';

const vmRegs:{[name:string]: any} = {};

export function regVmQuery(name:string) {
    return (target: any) => {
        vmRegs[name] = target;
        return target;
    }
}

export class VmQuery extends VmEntity {
    static create(name:string, vmApi:VmApi, entity:Entity) {
        let vq = vmRegs[name];
        return vq !== undefined? new vq(vmApi, entity) : new VmQuery(vmApi, entity);
    }
    static get vmRegs() {return vmRegs}

    entity: Query;

    async load() {
        await this.entity.loadSchema();
        this.buildObservableValues(this.entity.schema.fields);
    }

    get icon() {return vmLinkIcon('text-warning', 'search')}

    async submit(values: any): Promise<SubmitResult> {
        await this.entity.resetPage(30, values);
        nav.push(<QueryResultPage vm={this} />);
        return;
    }

    renderForm(className?:string) {
        let vmForm = this.newVmForm(this.values, this.entity.schema.fields, undefined, className);
        return vmForm.renderView();
    }

    renderView() {
        return <QueryPage vm={this} />;
    }
}

@observer
export class QueryPage extends React.Component<{vm:VmQuery}> {
    render() {
        let {vm} = this.props;
        let {caption, values} = this.props.vm;
        return <Page header={caption}>
            {vm.renderForm('mx-3 my-2')}
            values: {JSON.stringify(values)}
        </Page>
    }
}

@regVmQuery('查询test')
export class VMQuery查询Test extends VmQuery {
    renderExtra():JSX.Element {
        return <div>new values: {JSON.stringify(this.values)}</div>;
    }

    /*
    renderView() {
        return <Page header={this.caption}>
            Query 查询test
        </Page>
    }*/
}

@regVmQuery('商品流水q')
export class VMQuery商品流水q extends VmQuery {
    /*
    renderView() {
        return <Page header={this.caption}>
            Query 商品流水q {this.entity.name}
        </Page>
    }*/
}

/*
export class MainPage extends React.Component<QueryUIProps> {
    private formRows: FormRow[];

    constructor(props) {
        super(props);
        let ui = this.props.ui;
        this.formRows = ui.mapMain();
        this.submit = this.submit.bind(this);
    }

    async submit(values: any): Promise<SubmitResult | undefined> {
        let {ui} = this.props;
        await ui.entity.resetPage(30, values);
        nav.push(<QueryResultPage ui={ui} />);
        return;
    }

    render() {
        let {ui} = this.props;
        let {caption, entity, entitiesUI} = ui;
        let {name, schema} = entity;
        return <Page header={caption || name}>
            <TonvaForm className="m-3"
                //context={entitiesUI}
                formRows={this.formRows} 
                onSubmit={this.submit} />
        </Page>;
    }
}
*/

@observer
class QueryResultPage extends React.Component<{vm:VmQuery}> {
    async componentWillMount() {
        let {vm} = this.props;
        let {entity} = vm;
        await entity.loadPage();
    }
    render() {
        let {vm} = this.props;
        let {entity, caption} = vm;
        let {name, loaded, list} = entity;
        let content;
        if (loaded === true) {
            content = <List items={list} item={{}} />;
        }
        else {
            content = <div>...</div>;
        }
        return <Page header={caption || name}>
            {content}
        </Page>;
    }
}
