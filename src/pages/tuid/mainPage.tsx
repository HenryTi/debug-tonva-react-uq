import * as React from 'react';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
//import {AvForm, AvInput} from '../tools/reactstrap-validation';
import {nav, Page} from 'tonva-tools';
import {Tuid} from '../../ui-usql/entities';
//import AvButton from '../tools/avButton';
import {EntitiesUIProps, EntityUIProps} from '../../ui-usql/mapper';
import {EntitiesUI, TuidUI} from '../../ui-usql/ui';
//import {EditPage} from './editPage';
//import {ListPage} from './listPage';

export class MainPage extends React.Component<EntityUIProps<Tuid, TuidUI>> {
    constructor(props) {
        super(props);
        this.addNew = this.addNew.bind(this);
        this.list = this.list.bind(this);
        //this.handleValidSubmit = this.handleValidSubmit.bind(this);
    }

    addNew() {
        let ui = this.props.ui;
        nav.push(<ui.editPage ui={ui} data={{}} />);
    }

    list() {
        let ui = this.props.ui;
        nav.push(<ui.listPage ui={ui} />);
    }
    /*
    handleValidSubmit(event, values) {
        let entity = this.props.entity;
        //nav.push(<ListPage entity={entity} search={values['key']} />);
    }*/

    render() {
        let {entity} = this.props.ui;
        let {name, schema} = entity;
        return <Page header={'Tuid: ' + name}>
            <div>修正，修正，真的</div>
            <div style={{margin:'6px 15px'}}>
                <div>
                    <Button className="m-3" color="primary" onClick={this.addNew}>新增</Button>
                    <Button className="m-3" color="primary" onClick={this.list}>清单</Button>
                </div>
        
                <pre>{JSON.stringify(schema, undefined, ' ')}</pre>
            </div>
        </Page>;
    }
}
/*
<AvForm style={{padding: '6px 0'}} onValidSubmit={this.handleValidSubmit}>
<FormGroup className='w-100'>
    <AvInput type="text" name="key" placeholder={type+'关键字'} />
    <AvButton confirmLeave={false}>查找</AvButton>
</FormGroup>
</AvForm>
*/
