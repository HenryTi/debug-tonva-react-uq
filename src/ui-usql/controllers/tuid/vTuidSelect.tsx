import { nav } from 'tonva-tools';
import { VTuidMainListBase, VTuidDivListBase } from './vTuidList';

/*
export abstract class VTuidSelect   extends VTuidListBase {
    protected async onSelected(item:any): Promise<void> {
        this.closePage();
        this.return(item);
    }
}
*/

export class VTuidMainSelect extends VTuidMainListBase {
    protected async onSelected(item:any): Promise<void> {
        this.closePage();
        this.return(item);
    }
}

export class VTuidDivSelect  extends VTuidDivListBase {
    protected async onSelected(item:any): Promise<void> {
        
        alert('tuid div select');
        this.closePage();
        this.return(item);
    }
}
