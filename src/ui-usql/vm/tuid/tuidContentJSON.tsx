import * as React from 'react';
import { TuidContentProps } from './tuidContent';

export class TuidContentJSON extends React.Component<TuidContentProps> {
    render() {
        return <span>
            tuid: {JSON.stringify(this.props.values)}
        </span>;
    }
}
