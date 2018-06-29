import * as React from 'react';
import { VmQueryMain }  from '../../../../ui-usql';

class VMQuery商品流水q extends VmQueryMain {
    renderExtra() {
        return <div>商品流水q extra</div>;
    }
}

export default {
    main: VMQuery商品流水q
}
