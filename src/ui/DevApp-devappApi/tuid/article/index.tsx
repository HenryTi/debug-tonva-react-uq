import * as React from 'react';
import { Muted } from 'tonva-react-form';
import { VmTuidMain, RowContent, VmTuidEdit } from '../../../../ui-usql';
import res from './res';

export class VmArticleMain extends VmTuidMain {
}

export default {
    res: res,
    main: VmArticleMain,
    content: ({id, name, discription}) => <span>{name} <Muted>Article: id: {id}</Muted></span>,
    pickerConfig: {
        row: RowContent,
        idFromValue: ({id}) => id,
    },
    edit: undefined, // VmTuidNew,
};
