import * as React from 'react';
import { VmQuery }  from '../../../../ui-usql';

class VMQuery查询Test extends VmQuery {
    renderExtra():JSX.Element {
        return <div>测试代码，额外加点显示 - new values: {JSON.stringify(this.values)}</div>;
    }
}

export default {
    vm: VMQuery查询Test
}
