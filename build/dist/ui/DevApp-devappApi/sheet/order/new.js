var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { Button } from 'reactstrap';
import { Page, nav } from 'tonva-tools';
import { SearchBox, PropGrid } from 'tonva-react-form';
import { VmSheetNew, VmTuidPicker, RowContent } from '../../../../ui-usql';
const field客户 = '客户';
const fieldArticle = 'article';
const arrArticles = 'articles';
export class VmSheetOrderNew extends VmSheetNew {
    constructor() {
        super(...arguments);
        this.onSubmit = (values) => __awaiter(this, void 0, void 0, function* () {
            let ret = yield this.entity.save('订单 from ' + this.customer.name, values);
            alert('订单已保存: ' + JSON.stringify(ret));
            this.popPage();
        });
        this.onSearchCustomer = (key) => __awaiter(this, void 0, void 0, function* () {
            let vmCustomerPicker = new VmTuidPicker(this.vmApi, '选择客户', this.tuidCustomer, this.onCustomerSelected, RowContent);
            if (key !== undefined) {
                if (key.trim() === '')
                    key = undefined;
            }
            yield vmCustomerPicker.start(key);
        });
        this.confirmClose = () => __awaiter(this, void 0, void 0, function* () {
            return confirm('订单尚未提交\n要作废订单吗？');
        });
        this.onCustomerSelected = (item) => __awaiter(this, void 0, void 0, function* () {
            let { id } = item;
            this.customer = yield this.tuidCustomer.load(id);
            this.vmForm.setValue('客户', id);
            this.pushPage(React.createElement(Customered, { vm: this }));
        });
        this.startEditArticleRow = () => __awaiter(this, void 0, void 0, function* () {
            this.popPage();
            this.vmForm.showBands(undefined);
            this.replacePage(React.createElement(ShowAll, { vm: this }));
            nav.regConfirmClose(this.confirmClose);
            yield this.vmArticles.start(undefined);
        });
        this.onEditArticleRow = (initValues, onRowChanged) => __awaiter(this, void 0, void 0, function* () {
            if (initValues !== undefined) {
                this.setArticle(initValues.article);
                yield this.editQuantity();
                return;
            }
            let vmPicker = new VmTuidPicker(this.vmApi, '选择产品', this.tuidArticle, ((item) => __awaiter(this, void 0, void 0, function* () {
                let { id } = item;
                this.setArticle(id);
                yield onRowChanged({
                    article: id,
                    price: 29.99,
                    quantity: null,
                    amount: null,
                });
                yield this.editQuantity();
            })), RowContent);
            vmPicker.start();
        });
        this.editQuantity = () => __awaiter(this, void 0, void 0, function* () {
            this.pushPage(React.createElement(ArticleRowPage, { vm: this }));
        });
        this.afterEditArticleRow = (vlaues) => __awaiter(this, void 0, void 0, function* () {
            this.popPage();
            yield this.vmArticles.start(undefined);
        });
    }
    beforeStart() {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            yield _super("beforeStart").call(this);
            //this.vmForm.onSubmit = this.onSubmit;
            this.vmArticles = this.vmForm.vmArrs[arrArticles];
            if (this.vmArticles === undefined) {
                alert(arrArticles + ' not have VmArrList');
            }
            else {
                this.vmArticles.onEditRow = this.onEditArticleRow;
                this.vmArticles.afterEditRow = this.afterEditArticleRow;
                this.vmArticles.footer = React.createElement(ArticleFooter, { vm: this });
            }
            this.tuidCustomer = this.entity.getFieldTuid(field客户);
            this.tuidArticle = this.entity.getFieldTuid(fieldArticle, arrArticles);
            this.ArticleContent = this.vmApi.typeTuidContent(this.tuidArticle);
            this.regAutorun(() => {
                let { vmForm, list } = this.vmArticles;
                let { formValues } = vmForm;
                let { values } = formValues;
                let { price, quantity } = values;
                values.amount = Number((quantity * price).toFixed(2));
                // 求和
                this.totalAmount = list.reduce((t, c) => t + c.amount, 0);
            });
        });
    }
    show() {
        return __awaiter(this, void 0, void 0, function* () {
            this.pushPage(React.createElement(Step1, { vm: this }));
        });
    }
    setArticle(id) {
        this.tuidArticle.useId(id);
        this.articleId = id;
    }
}
__decorate([
    observable
], VmSheetOrderNew.prototype, "articleId", void 0);
__decorate([
    observable
], VmSheetOrderNew.prototype, "totalAmount", void 0);
const Step1 = ({ vm }) => {
    let { label, onSearchCustomer } = vm;
    return React.createElement(Page, { header: '新建' + label },
        React.createElement("div", { className: "p-3" },
            React.createElement("h5", { className: "text-center" }, "\u9009\u62E9\u5BA2\u6237"),
            React.createElement(SearchBox, { onSearch: onSearchCustomer, placeholder: "\u5BA2\u6237\u540D\u6216\u7F16\u53F7", size: "md" })));
};
const Customered = ({ vm }) => {
    let { customer, startEditArticleRow } = vm;
    let rows = [
        { type: 'string', label: '名称', name: 'name', },
        { type: 'string', label: '描述', name: 'discription', },
        { type: 'component', full: true, component: React.createElement("div", { className: "py-2 w-100 d-flex justify-content-center" },
                React.createElement(Button, { className: "w-50", color: "primary", onClick: startEditArticleRow }, "\u5F00\u59CB\u9009\u62E9\u4EA7\u54C1")) }
    ];
    return React.createElement(Page, { header: "\u8BA2\u5355\u5BA2\u6237" },
        React.createElement(PropGrid, { className: "m-3", rows: rows, values: customer }));
};
const ArticleFooter = observer(({ vm }) => {
    let { totalAmount } = vm;
    return React.createElement("div", { className: "justify-content-end" },
        "\u603B\u91D1\u989D: ",
        totalAmount,
        "\u5143");
});
const ArticleRowPage = observer(({ vm }) => {
    let { vmArticles, tuidArticle, articleId, ArticleContent } = vm;
    let { vmForm } = vmArticles;
    let { controls, formValues, onSubmitButtonClick, onFormSubmit } = vmForm;
    let { values } = formValues;
    let { price, quantity, amount } = values;
    let article = tuidArticle.getId(articleId);
    return React.createElement(Page, { header: "\u4EA7\u54C1" },
        React.createElement("form", { className: "m-3", onSubmit: onFormSubmit },
            React.createElement("div", null,
                React.createElement(ArticleContent, Object.assign({}, article)),
                " "),
            React.createElement("div", null,
                "\u4EA7\u54C1\u4EA7\u54C1 ",
                JSON.stringify(values),
                " "),
            "\u5355\u4EF7\uFF1A",
            price,
            "\u5143",
            controls['quantity'].render(['border border-info rounded mx-2', 'text-danger']),
            React.createElement("div", null,
                "\u91D1\u989D: ",
                amount,
                "\u5143 "),
            React.createElement("button", { className: "btn btn-primary", type: "button", onClick: onSubmitButtonClick }, "\u786E\u8BA4")));
});
const ShowAll = observer(({ vm }) => {
    let { label, vmForm } = vm;
    return React.createElement(Page, { header: label, back: "close" },
        React.createElement("div", { className: "p-3" }, "\u81EA\u5DF1\u7684\u5355\u636E\u7A0B\u5E8F"),
        vmForm.render());
});
//# sourceMappingURL=new.js.map