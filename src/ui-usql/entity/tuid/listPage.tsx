import * as React from 'react';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import {nav, Page, ListView} from 'tonva-tools';
import {Tuid} from '../tv';
import {EditPage} from './editPage';
import config from '../consts';

interface Props {
    entity: Tuid;
    search: string;
}
interface State {
    more: boolean;
    rows: any[];
}
export class ListPage extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            more: false,
            rows: undefined,
        }
        this.mapper = this.mapper.bind(this);
        this.click = this.click.bind(this);
    }

    componentDidMount() {
        this.props.entity.search(this.props.search, 0, 30).then(res => {
            this.setState({
                more: res.more,
                rows: res.rows
            });
        });
    }

    click(row:any) {
        nav.push(<EditPage entity={this.props.entity} item={row} />)
    }

    mapper(row:any, index:number) {
        let {name, discription, d2} = row;
        return <li key={index} className='app-row' onClick={()=>this.click(row)}>
            <label>
                <img src={config.appIcon} />
            </label>
            <div>
                <div>{name}</div>
                <span>{discription}</span>
            </div>
            <footer>
                <span style={{color:'red'}}>{d2.toFixed(2)}</span>
                <span style={{fontSize:'smaller'}}>&nbsp;元</span>
            </footer>
        </li>
    }

    render() {
        let type = this.props.entity.props.name;
        return <Page header={'Tuid: ' + type}>
            <ListView items={this.state.rows} renderRow={this.mapper} />
        </Page>;
    }
}
