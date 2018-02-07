import {MapperContainer, QueryMapper} from '../../mapper';
import {Query} from '../../entities';
import {EntityUI, QueryUI} from '../../ui';
import {MainPage} from './mainPage';
import {EntityLink} from '../entityLink';

export const mapperContainer:MapperContainer<Query, QueryUI, QueryMapper> = {
    caption: '查询',
    mapper: {
        link: EntityLink,
        mainPage: MainPage,
    }
}
