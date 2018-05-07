var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as React from 'react';
import { SearchBox, List } from 'tonva-react-form';
import { nav, Page } from 'tonva-tools';
export class ArticleContent extends React.Component {
    render() {
        let { value } = this.props;
        return React.createElement("div", null,
            "id = ",
            value.id,
            " ",
            JSON.stringify(value),
            " ");
    }
}
export class CandidateRow extends React.Component {
    render() {
        return React.createElement("div", { className: "p-4" }, JSON.stringify(this.props.item));
    }
}
export class ArticleInput extends React.Component {
    constructor(props) {
        super(props);
        this.id = 0;
        this.onClick = this.onClick.bind(this);
    }
    onClick() {
        let { id, tuid, input, entitiesUI, params, onPicked } = this.props;
        if (entitiesUI === undefined) {
            alert('TonvaForm props 应该包含 context=EntitiesUI');
            return;
        }
        let tuidUI = entitiesUI.tuid.coll[tuid];
        if (tuidUI === undefined) {
            alert('Tuid ' + tuid + ' 没有定义');
            return;
        }
        nav.push(React.createElement(PickArticlePage, { id: id, input: input, tuidUI: tuidUI, params: params, onPicked: onPicked }));
    }
    render() {
        let { id, tuid } = this.props;
        return React.createElement("button", { className: "form-control btn btn-outline-info", type: "button", style: { textAlign: 'left', paddingLeft: '0.75rem' }, onClick: this.onClick },
            React.createElement("div", null,
                "Article: ",
                tuid,
                " id: ",
                id));
    }
}
export class PickArticlePage extends React.Component {
    constructor(props) {
        super(props);
        this.onSearch = this.onSearch.bind(this);
        this.renderRow = this.renderRow.bind(this);
        this.rowClick = this.rowClick.bind(this);
        this.state = {
            items: null
        };
    }
    onSearch(key) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield this.props.tuidUI.entity.search(key, 0, 30);
            this.setState({
                items: result
            });
        });
    }
    renderRow(item, index) {
        let { candidateRow: CandidateRow } = this.props.input;
        if (CandidateRow !== undefined)
            return React.createElement(CandidateRow, { item: item, index: index });
        return React.createElement("div", { className: "px-3 py-2" }, JSON.stringify(item));
    }
    rowClick(item) {
        this.props.onPicked(item);
        nav.pop();
    }
    render() {
        let { tuidUI, input } = this.props;
        let header = React.createElement(SearchBox, { className: "mx-1 w-100", placeholder: tuidUI.caption, onSearch: this.onSearch });
        return React.createElement(Page, { header: header },
            React.createElement(List, { className: "my-3", before: '搜索' + tuidUI.caption + '--哈哈', items: this.state.items, item: { render: this.renderRow, onClick: this.rowClick } }));
    }
}
//# sourceMappingURL=articleInput.js.map