import * as React from 'react';
import {Button} from 'reactstrap';
import {Page} from 'tonva-tools';
import {Sheet} from '../tv';

interface Props {
    entity: Sheet;
}
interface State {
    result: any;
}
export class SheetEditPage extends React.Component<Props, State> {
    data = {
        id1: 1,
        f1: 3,
        f2: 5,
        arr1: [
            {f11:'a', f12:'b'},
            {f11:'a1', f12: 'b1'},
            {f11:'a2', f12: 'b2'},
        ],
    };
    id:number;
    constructor(props) {
        super(props);
        this.state = {result:''}
    }
    click() {
        this.props.entity.save('kkk bbb', this.data).then(res => {
            this.setState({result: res})
            this.id = res.id;
            //alert(JSON.stringify(res, undefined, ' '));
        });
    }
    action() {
        /*
        this.props.entity.action(9, 'a', 'a1').then(res => {
            //this.setState({result: res})
            //this.id = res.id;
            //alert(JSON.stringify(res, undefined, ' '));
            <Button onClick={()=>this.action()}>单据操作</Button>
        });*/
    }

    render() {
        return <Page>
            <div>SheetEdit: {this.props.entity.props.name}</div>
            <div><Button onClick={()=>this.click()}>新建</Button></div>
            <Button onClick={()=>this.click()}>测试保存单据</Button>
            <pre>{JSON.stringify(this.state.result, undefined, ' ')}</pre>
            <pre>{JSON.stringify(this.props.entity.schema, undefined, ' ')}</pre>
        </Page>;
    }
}
