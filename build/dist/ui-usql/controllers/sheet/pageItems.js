import { PageItems } from 'tonva-tools';
export class PageStateItems extends PageItems {
    constructor(sheet) {
        super(true);
        this.sheet = sheet;
    }
    async load() {
        let ret = await this.sheet.getStateSheets(this.param, this.pageStart, this.pageSize);
        return ret;
    }
    setPageStart(item) {
        this.pageStart = item === undefined ? 0 : item.id;
    }
}
//# sourceMappingURL=pageItems.js.map