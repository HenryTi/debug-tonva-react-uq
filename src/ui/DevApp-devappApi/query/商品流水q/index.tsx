import * as React from 'react';
import { VmQuery }  from '../../../../ui-usql';

class VMQuery商品流水q extends VmQuery {
    renderExtra() {
        return <div>商品流水q extra</div>;
    }
}

export default {
    vm: VMQuery商品流水q
}