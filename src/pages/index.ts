import {EntitiesMapper} from '../ui-usql/ui';
//import {Main} from './main';
//import {mapperContainer as actionMapperContainer} from './action';
//import {mapperContainer as queryMapperContainer} from './query';
//import {mapperContainer as sheetMapperContainer} from './sheet';
import {mapperContainer as tuidMapperContainer} from './tuid';
import {mapperContainer as sheetMapperContainer} from './sheet';

export const pageMapper:EntitiesMapper = {
    // mainPage: Main,
    caption: '同花默认--界面',
    tuid: tuidMapperContainer,
    sheet: sheetMapperContainer,
    /*
    action: {
        caption: '操作',
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
