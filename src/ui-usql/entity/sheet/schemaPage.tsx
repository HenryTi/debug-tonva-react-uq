import * as React from 'react';
import {Button} from 'reactstrap';
import {Page} from 'tonva-tools';
import {Sheet} from '../tv';

interface Props {
    entity: Sheet;
}
export class SchemaPage extends React.Component<Props, null> {
    render() {
        return <Page>
            <div>SheetEdit: {this.props.entity.props.name}</div>
            <pre>{JSON.stringify(this.props.entity.schema, undefined, ' ')}</pre>
        </Page>;
    }
}
