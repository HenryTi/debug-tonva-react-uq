import * as React from 'react';
import {IdPickFace, FormProps} from 'tonva-react-form';
import {nav, Page} from 'tonva-tools';
import {EntitiesUI, TuidUI} from '../../ui';
import {TuidInputProps} from '../../ui';

export class GeneralTuidInput extends React.Component<TuidInputProps> {
    private id = 0;
    private tuidUI:TuidUI;
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        let {id, tuid, entitiesUI, params, changeId} = this.props;
        if (entitiesUI === undefined) {
            console.log('TonvaForm props 应该包含 context=EntitiesUI')
            return;
        }
        this.tuidUI = entitiesUI.tuid.coll[tuid];
        if (this.tuidUI === undefined) {
            console.log('Tuid ' + tuid + ' 没有定义');
            return;
        }
    }
    onClick() {
        let {id, tuid, entitiesUI, params, changeId} = this.props;
        nav.push(<PickTuidPage 
            id={id} 
            tuidUI={this.tuidUI} 
            params={params} 
            changeId={changeId} />);
    }
    render() {
        let {id, tuid, input, entitiesUI, params} = this.props;
        return <button className="form-control btn btn-outline-info"
            type="button"
            style={{textAlign:'left', paddingLeft:'0.75rem'}}
            onClick={this.onClick}>
            {
                input.inputContent? 
                    <input.inputContent id={id} tuidUI={this.tuidUI} /> :
                    <div>Tuid: {tuid} id: {id}</div>
             }
        </button>
    }
}

interface Props {
    id: number;
    tuidUI: TuidUI;
    params: any;
    changeId: (id:number) => void;
}
class PickTuidPage extends React.Component<Props> {
    render() {
        let {tuidUI} = this.props;
        return <Page header={'选择' + tuidUI.caption}>
            tuid: {JSON.stringify({
                name: tuidUI.entity.name,
                capiton: tuidUI.caption,
            })}
            <br/>
            <button onClick={()=>{
                let {id, changeId} = this.props;
                if (id === undefined) id = 0;
                changeId(++id);
                nav.pop();
            }}>选中</button>
        </Page>;
    }
}
