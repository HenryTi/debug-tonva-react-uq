import * as React from 'react';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
//import {AvForm, AvInput} from '../tools/reactstrap-validation';
import {nav, Page} from 'tonva-tools';
import {Tuid} from '../../entities';
//import AvButton from '../tools/avButton';
import {EditPage} from './editPage';
import {ListPage} from './listPage';

interface Props {
    entity: Tuid;
}
interface State {

}
export class TuidPage extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.addNew = this.addNew.bind(this);
        this.list = this.list.bind(this);
        //this.handleValidSubmit = this.handleValidSubmit.bind(this);
    }

    addNew() {
        nav.push(<EditPage entity={this.props.entity} item={{}} />);
    }

    list() {
        nav.push(<ListPage entity={this.props.entity} />);
    }
    /*
    handleValidSubmit(event, values) {
        let entity = this.props.entity;
        //nav.push(<ListPage entity={entity} search={values['key']} />);
    }*/

    render() {
        let type = this.props.entity.name;
        return <Page header={'Tuid: ' + type}>
            <div style={{margin:'6px 15px'}}>
                <div>
                    <Button className="m-3" color="primary" onClick={this.addNew}>新增</Button>
                    <Button className="m-3" color="primary" onClick={this.list}>清单</Button>
                </div>
        
                <pre>{JSON.stringify(this.props.entity.schema, undefined, ' ')}</pre>
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
