import * as React from 'react';
import {Button} from 'reactstrap';
import {Page} from 'tonva-tools';
import {Sheet} from '../../entities';
import {EntitiesUIProps, SheetUIProps} from '../../ui';
import {EntitiesUI, SheetUI} from '../../ui';

interface State {
    res: any;
    data: any;
}
export class ArchivedPage extends React.Component<SheetUIProps, State> {
    constructor(props) {
        super(props);
        this.state = {
            res: undefined,
            data: undefined
        }
    }

    async componentDidMount() {
        let {ui, data} = this.props;
        let sheet = ui.entity;
        let res = await sheet.getArchive(data.id);
        let ret = res[0];
        let sheetData;
        if (ret.length === 1) {
            sheetData = sheet.unpack(ret[0].data);
        }
        this.setState({
            data: sheetData,
            res: res
        });
    }
    mapper(row:any, index:number) {
        return <li key={index}>id:{row.id}, no:{row.no}, discription:{row.discription}, date:{row.date}</li>
    }
    render() {
        let {ui, data:brief} = this.props;
        let {entity:sheet} = ui;
        let removed;
        if (brief.state === '-')
            removed = <div style={{color:'red'}}>已删除</div>;
        return <Page header={sheet.name + ':' + '-' + brief.no}>
            {removed}
            <pre>{JSON.stringify(this.state.data, undefined, ' ')}</pre>
            <pre>{JSON.stringify(this.state.res, undefined, ' ')}</pre>
        </Page>;
    }
}
