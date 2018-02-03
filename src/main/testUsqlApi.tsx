import * as React from 'react';
import {nav, Page} from 'tonva-tools';
import {UsqlApi} from '../ui-usql';

let ua = new UsqlApi('$$$', 'a');

interface State {
    updateResult: string;
    buttonVisible: boolean;
};
const preStyle:React.CSSProperties = {
    padding: '1em',
    backgroundColor: 'white',
    whiteSpace: 'pre-wrap', 
    overflowX: 'hidden'
};
export class TestUsqlApi extends React.Component<{}, State> {
    constructor(props) {
        super(props);
        this.updateUsql = this.updateUsql.bind(this);
        this.state = {
            updateResult: undefined,
            buttonVisible: true,
        }
    }
    private async updateUsql() {
        this.setState({
            updateResult: '开始update...',
            buttonVisible: false,
        });
        let ret = await ua.update();
        this.setState({
            updateResult: ret,
        });
    }
    render() {
        let {updateResult, buttonVisible} = this.state;
        let pre, button;
        if (buttonVisible) {
            button = <button onClick={this.updateUsql}>update</button>;
        }
        if (updateResult) pre = <pre style={preStyle}>
            {updateResult}
        </pre>;

        return <Page header="test usql api">
            {button}
            {pre}
        </Page>
    }
}
