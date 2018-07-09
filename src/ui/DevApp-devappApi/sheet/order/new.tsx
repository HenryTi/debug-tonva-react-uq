import * as React from 'react';
import { observer } from 'mobx-react';
import { Button, ButtonProps } from 'reactstrap';
import { Page, nav, callCenterapi } from 'tonva-tools';
import { List, Muted, SearchBox, TonvaForm, PropGrid, Prop } from 'tonva-react-form';
import { VmSheetNew, VmSheetEdit, VmForm, VmTuidPicker, RowContent, Tuid, VmFormOptions, VmArr, TypeContent } from '../../../../ui-usql';
import article from '../../tuid/article';
import { observable, action, autorun } from '../../../../../node_modules/mobx';

const field客户 = '客户';
const fieldArticle = 'article';
const arrArticles = 'articles';

export class VmSheetOrderNew extends VmSheetNew {
    vmArticles: VmArr;
    tuidCustomer: Tuid;
    tuidArticle: Tuid;
    customer: any;
    @observable articleId: number;
    @observable totalAmount: number;
    ArticleContent: TypeContent;

    async start() {
        this.vmForm.onSubmit = this.onSubmit;
        this.vmArticles = this.vmForm.vmArrs[arrArticles];
        if (this.vmArticles === undefined) {
            alert(arrArticles + ' not have VmArrList');
        }
        else {
            this.vmArticles.onEditRow = this.onEditArticleRow;
            this.vmArticles.afterEditRow = this.afterEditArticleRow;
            this.vmArticles.footer = <ArticleFooter vm={this} />;
        }
        this.tuidCustomer = this.entity.getFieldTuid(field客户);
        this.tuidArticle = this.entity.getFieldTuid(fieldArticle, arrArticles);
        this.ArticleContent = this.vmApi.typeTuidContent(this.tuidArticle);
        nav.push(<Step1 vm={this} />);
        autorun(()=>{
            let {vmForm, list} = this.vmArticles;
            let {formValues} = vmForm;
            let {values} = formValues;
            let {price, quantity} = values;
            values.amount = Number((quantity * price).toFixed(2));
            // 求和
            this.totalAmount = list.reduce((t, c) => t+c.amount, 0);
        });
    }

    onSubmit = async (values:any):Promise<void> => {
        let ret = await this.entity.save('订单 from ' + this.customer.name , values);
        alert('订单已保存: ' + JSON.stringify(ret));
        nav.pop();
    }

    onSearchCustomer = async (key:string) => {
        let vmCustomerPicker = new VmTuidPicker(
            this.vmApi, 
            '选择客户', 
            this.tuidCustomer, 
            this.onCustomerSelected, RowContent);
        if (key !== undefined) {
            if (key.trim() === '') key = undefined;
        }
        await vmCustomerPicker.start(key);
    }

    confirmClose = async ():Promise<boolean> => {
        return confirm('订单尚未提交\n要作废订单吗？')
    }

    onCustomerSelected = async (item:any) => {
        let {id} = item;
        this.customer = await this.tuidCustomer.load(id);
        this.vmForm.setValue('客户', id);
        nav.push(<Customered vm={this} />);
    }

    startEditArticleRow = async () => {
        nav.pop();
        this.vmForm.showBands(undefined);
        nav.replace(<ShowAll vm={this} />);
        nav.regConfirmClose(this.confirmClose);
        await this.vmArticles.start(undefined);
    }

    private setArticle(id:number) {
        this.tuidArticle.useId(id);
        this.articleId = id;
    }
    onEditArticleRow = async (initValues:any, onRowChanged:(values:any)=>Promise<any>) => {
        if (initValues !== undefined) {
            this.setArticle(initValues.article);
            await this.editQuantity();
            return;
        }
        let vmPicker = new VmTuidPicker(this.vmApi, 
            '选择产品',
            this.tuidArticle, 
            (async (item:any) => {
                let {id} = item;
                this.setArticle(id);
                await onRowChanged({
                    article: id,
                    price: 29.99,
                    quantity: null,
                    amount: null,
                });
                await this.editQuantity();
            }),
            RowContent);
        vmPicker.start();
    }
    editQuantity = async () => {
        nav.push(<ArticleRowPage vm={this} />);
    }
    afterEditArticleRow = async (vlaues:any) => {
        nav.pop();
        await this.vmArticles.start(undefined);
    }
}

const Step1 = ({vm}:{vm:VmSheetOrderNew}) => {
    let {label, onSearchCustomer} = vm;
    return <Page header={'新建' + label}>
        <div className="p-3">
            <h5 className="text-center">选择客户</h5>
            <SearchBox onSearch={onSearchCustomer} placeholder="客户名或编号" size="md" />
        </div>
    </Page>
}

const Customered = ({vm}:{vm:VmSheetOrderNew}) => {
    let {customer, startEditArticleRow} = vm;
    let rows:Prop[] = [
        {type: 'string', label: '名称', name: 'name', },
        {type: 'string', label: '描述', name: 'discription', },
        {type: 'component', full: true, component: <div className="py-2 w-100 d-flex justify-content-center">
            <Button className="w-50" color="primary" onClick={startEditArticleRow}>开始选择产品</Button>
        </div>}
    ];
    return <Page header="订单客户">
        <PropGrid className="m-3" rows={rows} values={customer} />
    </Page>;
}

const ArticleFooter = observer(({vm}:{vm:VmSheetOrderNew}) => {
    let {totalAmount} = vm;
    return <div className="justify-content-end">总金额: {totalAmount}元</div>;
});

const ArticleRowPage = observer(({vm}:{vm:VmSheetOrderNew}) => {
    let {vmArticles, tuidArticle, articleId, ArticleContent} = vm;
    let {vmForm} = vmArticles;
    let {controls, formValues, onSubmitButtonClick, onFormSubmit} = vmForm;
    let {values} = formValues;
    let {price, quantity, amount} = values;
    let article = tuidArticle.getId(articleId);
    return <Page header="产品">
        <form className="m-3" onSubmit={onFormSubmit}>
            <ArticleContent {...article} /> <br/>
            产品产品 {JSON.stringify(values)} <br/>
            单价：{price}元 <br/>
            {controls['quantity'].render([undefined, 'text-danger'])}<br/>
            金额: {amount}元 <br/>
            <button type='button' onClick={onSubmitButtonClick}>确认</button>
        </form>
    </Page>
});

const ShowAll = observer(({vm}:{vm:VmSheetOrderNew}) => {
    let {label, vmForm} = vm;
    return <Page header={label} back="close">
        <div className="p-3">自己的单据程序</div>
        {vmForm.render()}
    </Page>;
});
