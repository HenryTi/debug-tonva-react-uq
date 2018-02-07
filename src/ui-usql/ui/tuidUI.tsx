import {Entities, Entity, Tuid, Action, Sheet, Query} from '../entities';
import {IdPickFace, TuidUIComponent} from '../mapper';
import {EntitiesUI} from './entitiesUI';
import {EntityUI} from './entityUI';

export class TuidUI extends EntityUI<Tuid> {
    editPage?: TuidUIComponent;
    listPage?: TuidUIComponent;
    idPick?: IdPickFace;
}
