import {EntitiesMapper} from '../mapper';
import {Main} from './main';
import {tuidMapper} from './tuid';
import {TuidPage} from './tuid/tuidPage';
import {EntityLink} from './entityLink';

export const defaultMapper:EntitiesMapper = {
    mainPage: Main,
    caption: '同花默认界面',
    tuid: {
        caption: '数据字典',
        mapper: {
            link: EntityLink,
            mainPage: TuidPage,
        }
    },
    action: {
        caption: '操作',
        mapper: {
            link: EntityLink,
            mainPage: undefined,
        }
    },
    sheet: {
        caption: '凭单',
        mapper: {
            link: EntityLink,
            mainPage: undefined,
        }
    },
    query: {
        caption: '查询',
        mapper: {
            link: EntityLink,
            mainPage: undefined,
        }
    },
}
