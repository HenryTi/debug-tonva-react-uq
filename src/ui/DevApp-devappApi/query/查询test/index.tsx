import * as React from 'react';
import { observer } from 'mobx-react';
import { VmQueryMain }  from '../../../../ui-usql';

class VmQuery查询Test extends VmQueryMain {
    renderExtra() { return <Extra vm={this} /> }
}

const Extra = observer(({vm}:{vm:VmQueryMain}) => <div>
    测试代码，额外加点显示 - new values: {JSON.stringify(vm.vmForm.values)}
</div>);

export default {
    main: VmQuery查询Test
}
