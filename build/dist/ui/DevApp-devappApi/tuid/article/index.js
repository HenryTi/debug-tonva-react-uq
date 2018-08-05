import * as React from 'react';
import { Muted } from 'tonva-react-form';
import { VmTuidMain, RowContent } from '../../../../ui-usql';
import res from './res';
export class VmArticleMain extends VmTuidMain {
}
export default {
    res: res,
    main: VmArticleMain,
    content: ({ id, name, discription }) => React.createElement("span", null,
        name,
        " ",
        React.createElement(Muted, null,
            "Article: id: ",
            id)),
    pickerConfig: {
        row: RowContent,
        idFromValue: ({ id }) => id,
    },
};
//# sourceMappingURL=index.js.map