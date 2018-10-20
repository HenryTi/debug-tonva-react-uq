import * as React from 'react';
import { Muted } from 'tonva-react-form';
import { left0 } from 'tonva-tools';
//import { dictionary as x } from '../../res';
import { VMapMain, CMap } from '../../../../ui-usql';
class CMapTeamPerson extends CMap {
    async searchOnKey(keyField, param) {
        switch (keyField.name) {
            default: return await super.searchOnKey(keyField, param);
            case 'post': return await this.searchOnPost(param);
        }
    }
    async searchOnPost(param) {
        let querySelect = this.cQuerySelect('teamPosts');
        let val = await querySelect.call(param);
        return val['post'].id;
    }
}
class VMapTeamPerson extends VMapMain {
}
const ui = {
    CMap: CMapTeamPerson,
    //label: '部门员工对照表',
    //main: VMapTeamPerson,
    keys: [
        {
            content: ({ name, id }, x) => React.createElement(React.Fragment, null,
                React.createElement(Muted, null, x.team),
                " ",
                name),
            none: (x) => x.noStaff,
        },
        {
            content: ({ name, id }, x) => React.createElement(React.Fragment, null,
                React.createElement(Muted, null, x.staff),
                " ",
                name,
                " \u00A0 ",
                React.createElement(Muted, null,
                    x.no,
                    " ",
                    left0(id, 4))),
            none: (x) => x.noPost,
        },
        {
            content: ({ x, title, id }) => React.createElement(React.Fragment, null,
                React.createElement(Muted, null, x.post),
                " ",
                title),
            none: undefined,
        },
    ]
};
export default ui;
//# sourceMappingURL=index.js.map