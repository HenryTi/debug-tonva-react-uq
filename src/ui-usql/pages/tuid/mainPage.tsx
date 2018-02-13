import * as React from 'react';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import {nav, Page} from 'tonva-tools';
import {Tuid} from '../../entities';
import {EntitiesUIProps, TuidUIProps} from '../../ui';
import {EntitiesUI, TuidUI} from '../../ui';
import {EditPage} from './editPage';
import {ListPage} from './listPage';

export class MainPage extends React.Component<TuidUIProps> {
    constructor(props) {
        super(props);
        this.addNew = this.addNew.bind(this);
        this.list = this.list.bind(this);
        //this.handleValidSubmit = this.handleValidSubmit.bind(this);
    }

    addNew() {
        nav.push(<EditPage ui={this.props.ui} data={{}} />);
    }

    list() {
        nav.push(<ListPage ui={this.props.ui} />);
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
