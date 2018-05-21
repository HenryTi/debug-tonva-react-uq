import * as React from 'react';
import { Muted } from 'tonva-react-form';
import { nav, Page } from 'tonva-tools';
export class ArticleContent extends React.Component {
    render() {
        let { value } = this.props;
        //return <div>id = {value.id} {JSON.stringify(value)} </div>;
        if (value === undefined)
            return React.createElement("div", null, "Article");
        return React.createElement(React.Fragment, null,
            value.discription,
            " \u00A0 ",
            React.createElement(Muted, null, value.name));
    }
}
export class ArticleInput extends React.Component {
    constructor(props) {
        super(props);
        this.id = 0;
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
        nav.push(React.createElement(PickTuidPage, Object.assign({}, this.props)));
        //id={id} 
        //ui={ui} 
        //params={params} 
        //onPicked={onIdChanged} />);
    }
    render() {
        let { id, ui } = this.props;
        return React.createElement("button", { className: "form-control btn btn-outline-info", type: "button", style: { textAlign: 'left', paddingLeft: '0.75rem' }, onClick: this.onClick },
            React.createElement("div", null,
                "\u5546\u54C1\u7279\u5B9A\u7684input: ",
                ui.caption,
                " id: ",
                id));
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
class PickTuidPage extends React.Component {
    render() {
        let { ui } = this.props;
        return React.createElement(Page, { header: '选择' + ui.caption },
            "tuid: ",
            JSON.stringify({
                name: ui.entity.name,
                capiton: ui.caption,
            }),
            React.createElement("br", null),
            React.createElement("button", { onClick: () => {
                    let { id, onIdChanged } = this.props;
                    if (id === undefined)
                        id = 0;
                    onIdChanged({ id: ++id });
                    nav.pop();
                } }, "\u9009\u4E2D"));
    }
}
//# sourceMappingURL=articleInput.js.map