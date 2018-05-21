import * as React from 'react';
import {TuidPickFace, FormProps, Muted} from 'tonva-react-form';
import {nav, Page} from 'tonva-tools';
import {TuidUI, TuidInputProps, TuidPickPageProps} from '../../ui-usql/ui';

export class ArticleContent extends React.Component<{value:any}> {
    render() {
        let {value} = this.props;
        //return <div>id = {value.id} {JSON.stringify(value)} </div>;
        if (value === undefined) return <div>Article</div>;
        return <>{value.discription} &nbsp; <Muted>{value.name}</Muted></>;
    }
}

export class ArticleInput extends React.Component<TuidInputProps> {
    private id = 0;
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }
    onClick() {
        //let {id, tuid, entitiesUI, params, onPicked} = this.props;
        //let {id, ui, params, onIdChanged} = this.props;
        /*
        if (entitiesUI === undefined) {
            alert('TonvaForm props 应该包含 context=EntitiesUI')
            return;
        }
        let tuidUI = entitiesUI.tuid.coll[tuid];
        if (tuidUI === undefined) {
            alert('Tuid ' + tuid + ' 没有定义');
            return;
        }
        */
        nav.push(<PickTuidPage {...this.props} />);
            //id={id} 
            //ui={ui} 
            //params={params} 
            //onPicked={onIdChanged} />);
    }
    render() {
        let {id, ui} = this.props;
        return <button className="form-control btn btn-outline-info"
            type="button"
            style={{textAlign:'left', paddingLeft:'0.75rem'}}
            onClick={this.onClick}>
            <div>商品特定的input: {ui.caption} id: {id}</div>
        </button>
    }
}
/*
interface Props {
    id: number;
    tuidUI: TuidUI;
    params: any;
    changeId: (id:number) => void;
}
*/
class PickTuidPage extends React.Component<TuidPickPageProps> {
    render() {
        let {ui} = this.props;
        return <Page header={'选择' + ui.caption}>
            tuid: {JSON.stringify({
                name: ui.entity.name,
                capiton: ui.caption,
            })}
            <br/>
            <button onClick={()=>{
                let {id, onIdChanged} = this.props;
                if (id === undefined) id = 0;
                onIdChanged({id:++id});
                nav.pop();
            }}>选中</button>
        </Page>;
    }
}
