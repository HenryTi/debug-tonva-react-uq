import * as React from 'react';
import {Button} from 'reactstrap';
import {Page} from 'tonva-tools';
import {Action} from '../tv';

interface Props {
    entity: Action;
}
interface State {
    result: any;
}
export class ActionPage extends React.Component<Props, State> {
    data = {
        id1: 1,
        text1: 'ddd',
        arr1: [
            {t1: 1, k: 'a',},
            {t1: 2, k: 'a1',},
            {t1: 3, k: 'a2',},
        ],
        arr2: [
            {k1: 'bb'},
            {k1: 'bb2'},
            {k1: 'bb3'},
        ]
    };
    constructor(props) {
        super(props);
        this.state = {result:''}
    }
    click() {
        this.props.entity.submit(this.data).then(res => {
            this.setState({result: res})
            //alert(JSON.stringify(res, undefined, ' '));
        });
    }
    render() {
        return <Page>
            Action: {this.props.entity.props.name} 
            <Button onClick={()=>this.click()}>测试命令</Button>
            <pre>{JSON.stringify(this.state.result, undefined, ' ')}</pre>
            <pre>{JSON.stringify(this.props.entity.schema, undefined, ' ')}</pre>
        </Page>;
    }
}
