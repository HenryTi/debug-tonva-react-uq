import {EntitiesMapper} from '../ui-usql/mapper';
//import {Main} from './main';
//import {mapperContainer as actionMapperContainer} from './action';
//import {mapperContainer as queryMapperContainer} from './query';
//import {mapperContainer as sheetMapperContainer} from './sheet';
import {mapperContainer as tuidMapperContainer} from './tuid';

export const pageMapper:EntitiesMapper = {
    // mainPage: Main,
    caption: '同花默认--界面',
    tuid: tuidMapperContainer,
    /*
    action: {
        caption: '操作',
        mapper: {
            //link: EntityLink,
            mainPage: undefined,
        }
    },
    sheet: {
        caption: '凭单',
        mapper: {
            //link: EntityLink,
            mainPage: undefined,
        }
    },
    query: {
        caption: '查询',
        mapper: {
            //link: EntityLink,
            mainPage: undefined,
        }
    },*/
}
