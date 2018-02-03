import * as React from 'react';
import * as classNames from 'classnames';
import * as _ from 'lodash';
import {Button, Form, FormGroup, Label, Input, Container, Col} from 'reactstrap';
import {nav, Page} from 'tonva-tools';
import {List} from 'tonva-react-form';
import {AvForm, AvField} from '../tools/reactstrap-validation';
import AvButton from '../tools/avButton';
import config from '../consts';

const form = config.form;

interface Field {
    name: string;
    type: string;
}
interface Arr {
    name: string;
    fields: Field[];
}
interface Schema {
    name?: string;
    fields: Field[];
    arrs?: Arr[];
}
interface TvFieldPrpos {
    field: Field
}

interface Props {
    schema: Schema;
    values: any;
    confirmLeave?: boolean;
    onSubmit: (values:any) => void;
}
interface State {
    item: any;
}

export class MasterSlaveForm extends React.Component<Props, State> {
    private form: AvForm;
    constructor(props) {
        super(props);
        this.callback = this.callback.bind(this);
        this.handleValidSubmit = this.handleValidSubmit.bind(this);
        this.mapper = this.mapper.bind(this);
        this.onNew = this.onNew.bind(this);
        this.onSlaveSubmit = this.onSlaveSubmit.bind(this);
        let values = this.props.values||{};
        let schema = this.props.schema;
        for (let i in schema.arrs) {
            let arr = schema.arrs[i];
            values[arr.name] = [];
        }
        this.state = {
            item:values,
        };
    }
    callback() {
        this.form.reset();
    }
    handleValidSubmit(event, values) {
        let arrs = this.props.schema.arrs;
        if (arrs !== undefined) {
            for (let i in arrs) {
                let arrName = arrs[i].name;
                values[arrName] = this.state.item[arrName];
            }
        }
        this.props.onSubmit(values);
    }

    onSlaveEdit(arr:Arr, row:any) {
        nav.push(<SlavePage arr={arr} values={row} onSlaveSubmit={this.onSlaveSubmit}  />);
    }

    mapper(row:any, index:number) {
        return <div>
            {JSON.stringify(row)}
        </div>;
    }

    onSlaveSubmit(arr: Arr, inValues:any, values:any) {
        //nav.back(false);
        this.setState((prevState, props) => {
            let item = prevState.item;
            let arrValues = item[arr.name];
            if (inValues === undefined)
                arrValues.push(values);
            else
                _.assign(inValues, values);
            return {item:item};
        });
    }
    onNew(arr:Arr) {
        nav.push(<SlavePage arr={arr} values={undefined} onSlaveSubmit={this.onSlaveSubmit}  />);
    }

    render() {
        let schema = this.props.schema;
        let arrs = schema.arrs;
        return <AvForm ref={form => this.form = form} style={{margin: '20px'}} 
                onValidSubmit={this.handleValidSubmit}>
                {this.props.schema.fields.map(v => {
                    //let f = this.createTvField(v);
                    let p = this.createAvFieldProps(v);
                    return <AvField {...p} key={p.key} />
                })}
                {arrs && arrs.map((arr, index) => {
                    let header = <div className={classNames('unit-items-header')}>
                        <label>{arr.name}</label>
                        <Button size='sm' color='success' onClick={()=>this.onNew(arr)}> + </Button>
                    </div>;
                    return <List key={index}
                        header={header} 
                        item={{render:this.mapper, onClick: row=>this.onSlaveEdit(arr, row)}}
                        items={this.state.item[arr.name]} />
                })}
                <br />
                <FormGroup row={true}>
                    <Col {...form.submit}>
                        <AvButton color='primary' confirmLeave={this.props.confirmLeave === true}>提交</AvButton>
                    </Col>
            </FormGroup>
        </AvForm>
    }
    createAvFieldProps(field: Field): any {
        let ret:any;
        let {name, type} = field;
        let v = this.state.item[name];
        if (v === undefined) v = '';
        else v = v.toString();
        let props = {
            key: name,
            name: name,
            label: name,
            labelAttrs: form.label,
            tag: undefined,
            type: this.fieldType(type),
            maxLength: 50,
            grid: form.input,
            placeholder: type,
            inputClass: undefined,
            errorMessage: undefined,
            value: this.state.item[name]
        };
        switch (type) {
            case 'char':
            case 'bigint':
            case 'dec':
                break;
            case 'text': 
                props.tag = 'textarea';
                props.maxLength = 50;
                props.inputClass = 'form-control dev-app-discription';
                break;
        }
        /*
        let unique = this.props.entity.schema.unique;
        if (unique !== undefined) {
            for (let u of unique) {
                if (name === u) {
                    props.errorMessage = '重复了';
                    break;
                }
            }
        }*/
        return props;
    }
    createTvField(field: Field) {
        let {name, type} = field;
        switch (type) {
            case 'char':
            case 'bigint':
            case 'dec': return this.input(field);
            case 'text': return this.inputText(field);
        }
    }
    input(field) {
        let {name, type} = field;
        return <AvField key={name} name={name} label={name}
                value={this.state.item[name]}
                labelAttrs={form.label} 
                type={this.fieldType(type)}
                maxLength={50}
                grid={form.input}
                placeholder={type}
            />;
    }
    inputText(field: Field) {
        let {name} = field;
        return <AvField key={name} name={name} label={name}
        value={this.state.item[name]}
        tag='textarea'
        required={false} labelAttrs={form.label}
        inputClass='form-control dev-app-discription'
        type='text' maxLength={500}
        grid={form.input} />
    }
    fieldType(type:string) {
        switch (type) {
            case 'char': return 'text';
            case 'bigint':
            case 'dec': return 'number';
        }
    }
}

interface SlaveProps {
    arr: Arr;
    onSlaveSubmit: (arr:Arr, inValues:any, values:any) => void;
    values: any;
}
class SlavePage extends React.Component<SlaveProps, null> {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onSubmit(values:any) {
        this.props.onSlaveSubmit(this.props.arr, this.props.values, values);
        setTimeout(() => {
            nav.back(false);
        }, 0);
    }
    render() {
        return <Page>
            <MasterSlaveForm 
                schema={this.props.arr} 
                onSubmit={this.onSubmit}
                values={this.props.values} />
        </Page>;
    }
}

interface SuccessProps {
    callback: () => void;
}
class Success extends React.Component<SuccessProps, null> {
    constructor(props) {
        super(props);
        this.next = this.next.bind(this);
        this.return = this.return.bind(this);
    }

    next() {
        this.props.callback();
        nav.pop();
    }
    return() {
        nav.pop(2);
    }
    render() {
        return <Page header='提交成功'>
            <div>
                成功提交！
            </div>
            <Button onClick={this.next}>继续录入</Button>
            <Button onClick={this.return}>不继续</Button>
        </Page>;
    }
}
