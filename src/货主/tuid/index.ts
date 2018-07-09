import {MapperContainer,TuidMapper} from '../../ui-usql/ui';
import {Tuid} from '../../ui-usql/entities';
import {EntityUIO, TuidUIO} from '../../ui-usql/ui';
import {货品MainPage, FileUpload} from './货品MainPage';
//import {MainPage} from './mainPage';
//import {ArticleInput, ArticleContent} from './articleInput';
//import {CandidateRow, CustomerContent} from './customerInput';

export const mapperContainer:MapperContainer<Tuid, TuidUIO, TuidMapper> = {
    //caption: '数据字典',
    mapper: {
    },
    mappers: {
        "货品": {
            //mainPage: 货品MainPage,
            mainPage: FileUpload,
            fieldFaces: {
                'no': {
                    label: '编号',
                    notes: '货品编号',
                    placeholder: '在这里输入编号',
                },
                name: {
                    label: '名称',
                },
                discription: {
                    label: '描述',
                },
            },
        },
        /*
        "商品": {
            input: {
                inputContent: ArticleContent,
                //component: ArticleInput
            }
        },
        "article": {
            caption: '货品',
            input: {
                inputContent: ArticleContent,
            }
        },
        "customer": {
            caption: '客户',
            icon: 'user',
            input: {
                inputContent: CustomerContent,
                candidateRow: CandidateRow,
            },
            fieldFaces: {
                name: {
                    label: '名称',
                },
                discription: {
                    label: '描述',
                }
            }
        },
        */
    },
}
