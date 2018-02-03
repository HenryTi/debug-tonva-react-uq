import * as React from 'react';
import * as _ from 'lodash';
import * as classNames from 'classnames';
import {nav, Page, TitleBar} from 'tonva-tools';
import {Row, Col, Button, Form, FormGroup, Label, Input, 
    FormText, FormFeedback} from 'reactstrap';
import {AvForm, AvField, AvGroup, AvInput, AvFeedback, AvRadioGroup, AvRadio} from '../tools/reactstrap-validation';
import AvButton from '../tools/avButton';
import config from '../consts';

const form = config.form;

export interface Field {
    name: string;
    label: string;
    type: 'text'|'number'|'list';
    maxLength?: number;
    tag?: string;
    required?: boolean
    placeholder?: string;
    inputClass?: string[]|string;
    errorMessage?: string;
    max?: number;
    min?: number;
    helpMessage?: string;
    defaultValue?: any;
    list?: List;
    gap?: number;
}

export interface List {
    listView: (field:Field, values:any) => JSX.Element;
}

interface Props {
    fields: Field[];
    className?: string|string[];
    values?: {[key:string]: any};
    extraButton?: JSX.Element;
    submit: (values:any) => void;
}
interface State {
}

export class DataForm extends React.Component<Props, State> {
    private submitButton: AvButton;
    constructor(props) {
        super(props);
        this.handleValidSubmit = this.handleValidSubmit.bind(this);
    }
    enableButton(enable: boolean) {
        this.submitButton.changeDirty(enable);
    }
    handleValidSubmit(event, values) {
        this.props.submit(values);
    }
    fieldMapper(field:Field, index:number, values:any) {
        switch (field.type) {
            default: return this.renderSinglField(field, index, values);
            case 'list': return field.list.listView(field, values);
        }
    }
    renderSinglField(f:Field, index:number, values:any) {
        return <AvField
        key={index}
        name={f.name}
        label={f.label}
        required={f.required? true: false}
        value={values[f.name] || f.defaultValue}
        inputClass={classNames('form-control', f.inputClass)}
        labelAttrs={form.label} 
        type={f.type}
        tag={f.tag}
        maxLength={f.maxLength}
        grid={form.input}
        errorMessage={f.errorMessage}
        helpMessage={f.helpMessage}
        placeholder={f.placeholder}
        min={f.min}
        max={f.max} />;
    }
    render() {
        let {fields, extraButton, values, className} = this.props;
        values = values || {};
        /*
        let deleteButton, f=false;
        if (f) deleteButton = (
            <Col className='justify-content-end align-items-end'
                sm={{offset: 3, size: 3}}
                md={{offset: 4, size: 3}}>
                <Button onClick={this.delete}>删除</Button>
            </Col>);
        */
        let exButton;
        if (extraButton !== undefined) {
            exButton = <Col className='justify-content-end align-items-end'
                sm={{offset: 3, size: 3}}
                md={{offset: 4, size: 3}}>
                {extraButton}
            </Col>
        }
        let elFields;
        if (fields !== undefined) {
            elFields = [];
            let len = fields.length, key = 0;
            for (let i=0; i<len; i++) {
                let f = fields[i];
                elFields.push(this.fieldMapper(f, key++, values));
                //elFields = fields.map((f, index) => );
                if (f.gap !== undefined) {
                    elFields.push(<div key={key++} style={{marginBottom:f.gap*4}} />);
                }
            }
        }
        return <AvForm
            className={classNames('va-data-form', className)}
            onValidSubmit={this.handleValidSubmit}
        >
            {elFields}
            <FormGroup row={true}>
                <Col {...form.submit}>
                    <AvButton ref={b => this.submitButton = b} color='primary'>提交</AvButton>
                </Col>
                {exButton}
            </FormGroup>
        </AvForm>;
    }
}
