import * as React from 'react';
import { observer } from 'mobx-react';
import { TonvaForm, List, SubmitResult, FA } from 'tonva-react-form';
import { Page, nav } from 'tonva-tools';
import { Tuid, Query, Entity } from '../../entities';
import { VmEntity, vmLinkIcon } from '../entity';
import { VmApi } from '../vmApi';

export class VmQuery extends VmEntity {
    constructor(vmApi:VmApi, query:Query) {
        super(vmApi, query);
        //this.onSubmitClick = this.onSubmitClick.bind(this);
    }

    entity: Query;

    get icon() {return vmLinkIcon('text-warning', 'search')}

    async load() {
        await this.entity.loadSchema();
        this.buildObservableValues(this.entity.schema.fields);
    }

    async submit() {
        await this.entity.resetPage(30, this.values);
        nav.push(<QueryResultPage vm={this} />);
        return;
    }

    renderForm(className?:string) {
        let fieldUIs:any[] = undefined;
        let vmForm = this.newVmForm(this.values, 
            this.entity.schema.fields, fieldUIs, className);
        return vmForm.renderView();
    }

    renderExtra() {
        return;
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
            {vm.renderExtra()}
        </Page>;
    }
}

@observer
class QueryResultPage extends React.Component<{vm:VmQuery}> {
    async componentWillMount() {
        let {vm} = this.props;
        let {entity} = vm;
        await entity.loadPage();
    }
    close() {nav.pop(2)}
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
        let rightClose = <button
            className="btn btn-outline-secondary btn-sm"
            onClick={this.close}>
            <FA name="close" />
        </button>;
        return <Page header={caption || name} right={rightClose}>
            {content}
        </Page>;
    }
}
