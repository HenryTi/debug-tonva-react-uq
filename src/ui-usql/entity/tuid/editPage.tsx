import * as React from 'react';
import {Button, Form, FormGroup, Label, Input, Container, Col} from 'reactstrap';
import {AvForm, AvField} from '../tools/reactstrap-validation';
import {nav, Page} from 'tonva-tools';
import {Tuid} from '../tv';
import AvButton from '../tools/avButton';
import config from '../consts';

const form = config.form;

interface Field {
    name: string;
    type: string;
}
interface TvFieldPrpos {
    field: Field
}
interface Props {
    entity: Tuid;
    item: any;
}
interface State {
    item:any;
}
export class EditPage extends React.Component<Props, State> {
    private form: AvForm;
    constructor(props) {
        super(props);
        //this.addNew = this.addNew.bind(this);
        this.callback = this.callback.bind(this);
        this.handleValidSubmit = this.handleValidSubmit.bind(this);
        this.state = {item:this.props.item||{}};
    }
    callback() {
        this.form.reset();
    }
    handleValidSubmit(event, values) {
        let entity = this.props.entity;
        let schema = entity.schema;
        entity.save(undefined, values).then(res => {
            let retId = res.id;
            if (retId < 0) {
                let unique = schema.unique;
                if (unique !== undefined) {
                    for (let u of unique) {
                        this.form.setError(u, true, '重复');
                    }
                }
            }
            else {
                let callback = this.callback;
                nav.push(<Success callback={callback} />);
            }
        });
    }
    render() {
        let type = this.props.entity.props.name;
        return <Page header={'新增' + type}>
            <AvForm ref={form => this.form = form} style={{margin: '20px'}} 
                onValidSubmit={this.handleValidSubmit}>
                {this.props.entity.schema.fields.map(v => {
                    //let f = this.createTvField(v);
                    let p = this.createAvFieldProps(v);
                    return <AvField {...p} key={p.key} />
                })}
                <FormGroup row={true}>
                    <Col {...form.submit}>
                        <AvButton color='primary'>提交</AvButton>
                    </Col>
            </FormGroup>
            </AvForm>
        </Page>
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

/*
<AvField
name="name"
label="App名称"
required={true}
value={''}
labelAttrs={form.label} 
type='text'
maxLength={50}
grid={form.input}
errorMessage='请提供App名称' />
*/
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
