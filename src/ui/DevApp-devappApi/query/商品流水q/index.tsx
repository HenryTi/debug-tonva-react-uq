import * as React from 'react';
import { VmQueryMain }  from '../../../../ui-usql';

class VmQuery商品流水q extends VmQueryMain {
    renderExtra() {
        return <div>商品流水q extra</div>;
    }
}

export default {
    main: VmQuery商品流水q
}
