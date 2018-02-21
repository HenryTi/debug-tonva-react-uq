import * as React from 'react';

export class ListRow extends React.Component<{item:any; index:number}> {
    render() {
        let {num} = this.props.item;
        return <div>输入数量: {num}</div>
    }
}
