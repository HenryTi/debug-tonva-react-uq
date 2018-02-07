import * as React from 'react';
import {Button} from 'reactstrap';
import {Page} from 'tonva-tools';
import {Sheet} from '../../entities';
import {EntitiesUIProps, SheetUIProps} from '../../mapper';

export class SchemaPage extends React.Component<SheetUIProps> {
    render() {
        let {name, schema} = this.props.ui.entity;
        return <Page>
            <div>SheetEdit: {name}</div>
            <pre>{JSON.stringify(schema, undefined, ' ')}</pre>
        </Page>;
    }
}
