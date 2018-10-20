import { PageItems } from 'tonva-tools';
export class TuidPageItems extends PageItems {
    constructor(tuid) {
        super(true);
        this.tuid = tuid;
    }
    async load() {
        let ret = await this.tuid.search(this.param, this.pageStart, this.pageSize);
        return ret;
    }
    setPageStart(item) {
        this.pageStart = item === undefined ? 0 : item.id;
    }
}
//# sourceMappingURL=pageItems.js.map