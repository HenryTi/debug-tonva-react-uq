import {MapperContainer,HistoryMapper} from '../../ui-usql/ui';
import {History} from '../../ui-usql/entities';
import {EntityUI, HistoryUI} from '../../ui-usql';
import {ListRow} from './listRow';

export const mapperContainer:MapperContainer<History, HistoryUI, HistoryMapper> = {
    caption: '流水台账',
    mapper: {
        //link: EntityLink,
        //mainPage: undefined,
    },
    mappers: {
        "商品流水": {
            listRow: ListRow,
            fieldFaces: {
                sumamount: {
                    label: '合计',
                },
            },
        }
    }
}
