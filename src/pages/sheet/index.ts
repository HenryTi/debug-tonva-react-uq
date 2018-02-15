import {MapperContainer,SheetMapper, TuidContentProps} from '../../ui-usql/ui';
import {Sheet} from '../../ui-usql/entities';
import {EntityUI, SheetUI} from '../../ui-usql/ui';
import {GeneralTuidInput} from '../../ui-usql/pages/tuid/input'
import {ArticleInput, ArticleContent, CandidateRow, PickArticlePage} from './articleInput';

export const mapperContainer:MapperContainer<Sheet, SheetUI, SheetMapper> = {
    caption: '凭单',
    mapper: {
        //link: EntityLink,
        mainPage: undefined,
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
        }
    }
}
