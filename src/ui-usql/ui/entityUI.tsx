import {UIComponent} from '../mapper';
import {EntitiesUI} from './entitiesUI';
import {Entity} from '../entities';

export class EntityUI<E extends Entity> {
    entitiesUI: EntitiesUI;
    entity: E;    
    caption: string;

    link?: UIComponent<E, EntityUI<E>>;
    mainPage?: UIComponent<E, EntityUI<E>>;
}
