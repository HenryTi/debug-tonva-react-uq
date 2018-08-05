import * as React from 'react';
import { observer } from 'mobx-react';
import { VmQueryMain } from '../../../../ui-usql';
class VMQuery查询Test extends VmQueryMain {
    renderExtra() { return React.createElement(Extra, { vm: this }); }
}
const Extra = observer(({ vm }) => React.createElement("div", null,
    "\u6D4B\u8BD5\u4EE3\u7801\uFF0C\u989D\u5916\u52A0\u70B9\u663E\u793A - new values: ",
    JSON.stringify(vm.vmForm.values)));
export default {
    main: VMQuery查询Test
};
//# sourceMappingURL=index.js.map