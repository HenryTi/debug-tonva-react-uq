import * as React from 'react';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import {nav, Page} from 'tonva-tools';
import {List} from 'tonva-react-form';
import {Tuid} from '../../entities';
import {EntitiesUIProps, TuidUIProps} from '../../ui';
import {EntitiesUI, TuidUI} from '../../ui';
import {EditPage} from './editPage';
import config from '../consts';

interface State {
    more: boolean;
    rows: any[];
}
export class ListPage extends React.Component<TuidUIProps, State> {
    constructor(props) {
        super(props);
        this.state = {
            more: false,
            rows: undefined,
        }
        this.mapper = this.mapper.bind(this);
        this.click = this.click.bind(this);
    }

    async componentDidMount() {
        /*
        this.props.entity.search('this.props.search', 0, 30).then(res => {
            this.setState({
                more: res.more,
                rows: res.rows
            });
        });*/
    }

    click(row:any) {
        nav.push(<EditPage ui={this.props.ui} data={row} />)
    }

    mapper(row:any, index:number) {
        let {name, discription, d2} = row;
        return <div className='app-row' onClick={()=>this.click(row)}>
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
        </div>
    }

    render() {
        let type = this.props.ui.entity.name;
        return <Page header={'Tuid: ' + type}>
            <List items={this.state.rows} item={{render: this.mapper, onClick: this.click}} />
        </Page>;
    }
}
