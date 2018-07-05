import {MapperContainer,SheetMapper, TuidContentProps} from '../../ui-usql/ui';
import {Sheet} from '../../ui-usql/entities';
import {EntityUIO, SheetUIO} from '../../ui-usql/ui';
import {GeneralTuidInput} from '../../ui-usql/pages/tuid/input'
import {ArticleInput, ArticleContent, CandidateRow, PickArticlePage} from './articleInput';
import {OrderRow} from './order';
import {SheetNew} from './sheetNew';

export const mapperContainer:MapperContainer<Sheet, SheetUIO, SheetMapper> = {
    caption: '凭单',
    mapper: {
        //link: EntityLink,
        mainPage: undefined,
        sheetNew: SheetNew,
    },
    mappers: {
        "购物单": {
            fieldFaces: {
                sumamount: {
                    label: '合计',
                },
            },
            detailFaces: {
                a1: {
                    label: 'a1a1--Label',
                    fields: {
                        article: {
                            label: '商品',
                            input: {
                                //ArticleInput
                                inputContent: ArticleContent,
                                candidateRow: CandidateRow,
                                pickPage: PickArticlePage,
                            }
                        },
                        price: {
                            label: '单价',
                        }
                    }
                }
            }
        },
        "order": {
            fieldFaces: {
                sumamount: {
                    label: '合计',
                },
            },
            detailFaces: {
                articles: {
                    label: '清单',
                    renderRow: OrderRow,
                    fields: {
                        article: {
                            label: '商品',
                            input: {
                                //ArticleInput
                                inputContent: ArticleContent,
                                candidateRow: CandidateRow,
                                pickPage: PickArticlePage,
                            }
                        },
                        price: {
                            label: '单价',
                        }
                    }
                }
            }
        }
    }
}
