import * as React from 'react';

export class CustomerContent extends React.Component<{value:any}> {
    render() {
        let {value} = this.props;
        //return <div>id = {value.id} {JSON.stringify(value)} </div>;
        if (value === undefined) return <div>客户</div>;
        return <div>客户名：{value.name} 客户描述：{value.discription} </div>;
    }
}

export class CandidateRow extends React.Component<{item:any, index:number}> {
    render() {
        return <div className="p-4">{JSON.stringify(this.props.item)}</div>;
    }
}
