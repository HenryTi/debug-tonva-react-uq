import { CrEntity, EntityUI } from "../VM";
import { Book } from "../../entities";
import { VmBookMain } from "./vmBookMain";
import { vmLinkIcon } from '../link';

export interface BookUI extends EntityUI {
    main: typeof VmBookMain,
}

export class CrBook extends CrEntity<Book, BookUI> {

    get icon() {return vmLinkIcon('text-muted', 'book')}

    protected async internalStart() {
        await this.showVm(this.VmBookMain);
    }

    protected get VmBookMain():typeof VmBookMain {return VmBookMain}
    /*
    async submit(values:any) {
        return this.entity.submit(values);
    }
    */
}
