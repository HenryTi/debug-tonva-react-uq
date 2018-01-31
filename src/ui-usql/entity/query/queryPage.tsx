import * as React from 'react';
import {Button} from 'reactstrap';
import {Page, ListView, nav} from 'tonva-tools';
import {Query} from '../tv';
import {MasterSlaveForm} from '../tools';

interface Props {
    entity: Query;
}
interface State {

}
export class QueryPage extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onSubmit(values:any) {
        nav.push(<ResultPage query={this.props.entity} params={values} />);
    }
    render() {
        return <Page>
            Query: {this.props.entity.props.name}
            <MasterSlaveForm 
                schema={this.props.entity.schema} 
                values={{}} 
                onSubmit={this.onSubmit} />
            <pre>{JSON.stringify(this.props.entity.schema, undefined, ' ')}</pre>
        </Page>;
    }
}

interface ResultProps {
    query: Query;
    params: any;
}
interface ResultState {
    items: any[];
    hasMore: boolean;
}
class ResultPage extends React.Component<ResultProps, ResultState> {
    constructor(props) {
        super(props);
        this.state = {
            items: undefined,
            hasMore: false,
        };
        this.mapper = this.mapper.bind(this);
        this.more = this.more.bind(this);
        this.props.query.resetPage(5, this.props.params);
    }
    componentDidMount() {
        this.loadPage();
    }
    private loadPage() {
        this.props.query.page().then(res => {
            //let data = res;
            //this.setState({
            //    items: data['$page']
            //})
            this.setState((prev, props) => {
                let pageData = res['$page'];
                let items:any[] = prev.items;
                if (items === undefined) {
                    items = pageData;
                }
                else {
                    items.push(...pageData);
                }
                return {
                    hasMore: this.props.query.hasMore,
                    items: items
                };
            });
            res.onUpdate(d => {
                this.setState((prev, props) => {
                    return {items: prev.items};
                });
            });
        });
    }
    mapper(item:any, index:number) {
        return <li key={index}>{index}: {JSON.stringify(item)}</li>;
    }
    more() {
        this.loadPage();
    }
    render() {
        let more;
        if (this.state.hasMore === true) {
            more = <Button onClick={this.more}>更多></Button>;
        }
        return <Page>
            <ListView renderRow={this.mapper} items={this.state.items} />
            {more}
        </Page>;
    }
}
