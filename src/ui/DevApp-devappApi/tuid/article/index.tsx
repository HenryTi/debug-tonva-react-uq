import * as React from 'react';
import { VmTuid, ContentProps, VmTuidEdit } from '../../../../ui-usql';
import res from './res';

const ArticleContent = (props: ContentProps) => {
    let {id, name, discription} = props.values;
    return <span>{name} <small>Article: id: {id}</small></span>;
}

const PickArticleRow = (props: ContentProps) => 
    <div className="px-3 py-2">Pick row : = {JSON.stringify(props.values)}</div>;

export class VmTuidArticle extends VmTuid {
}

export default {
    res: res,
    vm: VmTuidArticle,
    content: ArticleContent,
    pickerConfig: {
        row: PickArticleRow,
        idFromValue: (values) => values.id,
    },
    edit: undefined, // VmTuidNew,
};
