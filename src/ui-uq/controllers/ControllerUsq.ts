import { Controller } from "tonva-tools";
import { CUq } from "./usq";

export abstract class ControllerUsq extends Controller {
    constructor(cUsq: CUq, res:any) {
        super(res);
        this.cUsq = cUsq;
    }
    cUsq: CUq;
}
