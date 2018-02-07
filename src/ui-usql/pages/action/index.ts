import {MapperContainer, ActionMapper} from '../../mapper';
import {Action} from '../../entities';
import {EntityUI, ActionUI} from '../../ui';
import {MainPage} from './mainPage';
import {EntityLink} from '../entityLink';

export const mapperContainer:MapperContainer<Action, ActionUI, ActionMapper> = {
    caption: '操作',
    mapper: {
        link: EntityLink,
        mainPage: MainPage,
    }
}
