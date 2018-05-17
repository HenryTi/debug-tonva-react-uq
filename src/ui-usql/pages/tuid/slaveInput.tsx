import * as React from 'react';
import {Button} from 'reactstrap';
import {TuidUIProps} from '../../ui/mapper';

export class SlaveInput extends React.Component<TuidUIProps&{slave:string}> {
    constructor(props) {
        super(props);
        this.click = this.click.bind(this);
    }
    private click() {
        alert(this.props.slave);
    }
    render() {
        return <Button className="mr-3" outline={true} color="primary" onClick={this.click}>
            从属{this.props.slave}
        </Button>;
    }
}
