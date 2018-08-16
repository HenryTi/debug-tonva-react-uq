import { EntityCoordinator } from "../VM";
import { Book } from "../../entities";
import { vmLinkIcon, EntityUI } from "../vmEntity";
import { VmBookMain } from "./vmBookMain";

export interface BookUI extends EntityUI {
    main: typeof VmBookMain,
}

export class CrBook extends EntityCoordinator<Book, BookUI> {

    get icon() {return vmLinkIcon('text-muted', 'book')}

    protected async internalStart() {
        await this.run(new this.VmBookMain(this));
    }

    protected get VmBookMain():typeof VmBookMain {
        return (this.ui&&this.ui.main) || VmBookMain;
    }
    /*
    async submit(values:any) {
        return this.entity.submit(values);
    }
    */
}
