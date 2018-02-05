import {Entities, Entity, Tuid, Action, Sheet, Query} from '../entities';
import {UIComponent, IdPickFace} from '../mapper';
import {EntitiesUI} from './entitiesUI';
import {EntityUI} from './entityUI';

export class TuidUI extends EntityUI<Tuid> {
    editPage?: UIComponent<Tuid, TuidUI>;
    listPage?: UIComponent<Tuid, TuidUI>;
    idPick?: IdPickFace;
}
