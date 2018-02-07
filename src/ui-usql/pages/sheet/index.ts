import {MapperContainer, SheetMapper} from '../../mapper';
import {Sheet} from '../../entities';
import {EntityUI, SheetUI} from '../../ui';
import {MainPage} from './mainPage';
import {EntityLink} from '../entityLink';

export const mapperContainer:MapperContainer<Sheet, SheetUI, SheetMapper> = {
    caption: '凭单',
    mapper: {
        link: EntityLink,
        mainPage: MainPage,
    }
}
