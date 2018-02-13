import {MapperContainer, ActionMapper, EntityUI, ActionUI} from '../../ui';
import {Action} from '../../entities';
import {MainPage} from './mainPage';
import {EntityLink} from '../entityLink';

export const mapperContainer:MapperContainer<Action, ActionUI, ActionMapper> = {
    caption: '操作',
    mapper: {
        link: EntityLink,
        mainPage: MainPage,
    }
}
