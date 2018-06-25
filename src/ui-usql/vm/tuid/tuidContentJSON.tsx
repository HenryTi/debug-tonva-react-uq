import * as React from 'react';
import { ContentProps } from './tuidContent';

export class TuidContentJSON extends React.Component<ContentProps> {
    render() {
        return <span>
            tuid: {JSON.stringify(this.props.values)}
        </span>;
    }
}
