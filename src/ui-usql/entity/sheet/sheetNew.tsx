import * as React from 'react';
import * as classNames from 'classnames';
import {Button, Form, FormGroup, Label, Input, Container, Col} from 'reactstrap';
import {nav, Page} from 'tonva-tools';
import {Sheet} from '../tv';
import {MasterSlaveForm} from '../tools';
import AvButton from '../tools/avButton';

interface Props {
    entity: Sheet;
    item: any;
}
class Item {
    id: number;
    name?: string;
    discription?: string;
}

class PackData {
    private timeInterval:any;
    item: Item;

    onChange(callback:(pd:PackData) => void) {
        let n = 0;
        return new Promise<void>((resolve, reject) => {
            this.timeInterval = setInterval(() => {
                this.item.name = 'ddd' + (n++);
                this.item.discription = 'kkkk';
                if (n > 10) {
                    clearInterval(this.timeInterval);
                    this.timeInterval = undefined;
                }
                callback(this);
            }, 1000);
        });
    }

    clearInterval() {
        if (this.timeInterval !== undefined) clearInterval(this.timeInterval);
    }
}

interface State {
    data:PackData;
}

export class SheetNewPage extends React.Component<Props, State> {
    private packData: PackData;
    constructor(props) {
        super(props);
        this.state = {
            data: undefined
        }
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount() {
        this.packData = new PackData;
        this.packData.item = {id: 1};
        this.setState({
            data: this.packData
        })
        this.packData.onChange(d => {
            this.setState({
                data: d
            });
        });
    }

    componentWillUnmount() {
        if (this.packData !== undefined) this.packData.clearInterval();
    }

    callback() {

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
                        //this.form.setError(u, true, '重复');
                    }
                }
            }
            else {
                let callback = this.callback.bind(this);
                nav.push(<Success callback={callback} />);
            }
        });
    }

    onSubmit(values) {
        let entity = this.props.entity;
        let schema = entity.schema;
        entity.save(undefined, values).then(res => {
            let retId = res.id;
            if (retId < 0) {
                let unique = schema.unique;
                if (unique !== undefined) {
                    for (let u of unique) {
                        //this.form.setError(u, true, '重复');
                    }
                }
            }
            else {
                let callback = this.callback.bind(this);
                nav.push(<Success callback={callback} />);
            }
        });
    }

    render() {
        let type = this.props.entity.props.name;
        let schema = this.props.entity.schema;
        let data = this.state.data;
        let view;
        if (data !== undefined) {
            let item = data.item;
            view = <div>{item.id} {item.name} {item.discription} </div>
        }
        return <Page header={'新' + type}>
            {view}
            <MasterSlaveForm 
                schema={this.props.entity.schema} 
                values={{}} 
                onSubmit={this.onSubmit} />
        </Page>
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
