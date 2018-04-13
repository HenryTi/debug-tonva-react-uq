import { ListRow } from './listRow';
export const mapperContainer = {
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
};
//# sourceMappingURL=index.js.map