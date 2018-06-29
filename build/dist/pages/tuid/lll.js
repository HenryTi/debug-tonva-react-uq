var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as React from 'react';
import { Button } from 'reactstrap';
import { nav, Page } from 'tonva-tools';
import { LMR, SearchBox } from 'tonva-react-form';
//import {EntitiesUI, TuidUI} from '../../ui';
//import {EditPage} from './editPage';
//import {ListPage} from './listPage';
//import {SearchPage} from './searchPage';
export class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.addNew = this.addNew.bind(this);
        this.list = this.list.bind(this);
        this.onSearch = this.onSearch.bind(this);
    }
    addNew() {
        nav.push(React.createElement(this.props.ui.editPage, { ui: this.props.ui }));
    }
    list() {
        nav.push(React.createElement(this.props.ui.listPage.page, { ui: this.props.ui }));
    }
    onSearch(key) {
        return __awaiter(this, void 0, void 0, function* () {
            nav.push(React.createElement(this.props.ui.listPage.page, { ui: this.props.ui, data: key }));
        });
    }
    render() {
        let { entity, caption } = this.props.ui;
        let { name, schema } = entity;
        caption = caption || name;
        let right = React.createElement(SearchBox, { className: "mr-3", onSearch: this.onSearch, placeholder: '搜索' + caption });
        return React.createElement(Page, { header: caption || name },
            React.createElement(LMR, { className: "mt-3", right: right },
                React.createElement("div", null,
                    React.createElement(Button, { className: "mr-3", color: "success", onClick: this.addNew }, "\u65B0\u589E\u5546\u54C1"),
                    React.createElement(Button, { className: "mr-3", color: "primary", onClick: this.list }, "\u5217\u8868"))),
            "\u674E\u56FD\u58F02xxxx");
    }
}
// <pre>{JSON.stringify(schema, undefined, ' ')}</pre>
//# sourceMappingURL=lll.js.map