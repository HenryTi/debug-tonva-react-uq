import {MapperContainer,TuidMapper} from '../../mapper';
import {Tuid} from '../../entities';
import {EntityUI, TuidUI} from '../../ui';
import {MainPage} from './mainPage';
import {EditPage} from './editPage';
import {ListPage} from './listPage';
import {EntityLink} from '../entityLink';

export const mapperContainer:MapperContainer<Tuid, TuidUI, TuidMapper> = {
    caption: '数据字典',
    mapper: {
        link: EntityLink,
        mainPage: MainPage,
        editPage: EditPage,
        listPage: ListPage,
    }
}
