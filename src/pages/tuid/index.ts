import {RadioTuidInput, DropDownTuidInput, Tuid, EntityUI, TuidUI, MapperContainer,TuidMapper} from '../../ui-usql';
//import {MainPage} from './mainPage';
import {MainPage} from './lll';
import {EditPage} from './edit';
import {ArticleInput, ArticleContent} from './articleInput';
import {CandidateRow, CustomerContent} from './customerInput';
import {T1Content} from './t1';

export const mapperContainer:MapperContainer<Tuid, TuidUI, TuidMapper> = {
    //caption: '数据字典',
    mapper: {
        //link: EntityLink,
        //mainPage: MainPage,
    },
    mappers: {
        "商品inunit": {
            caption: 'xxx商品',
            mainPage: MainPage,
            editPage: EditPage,
            fieldFaces: {
                'd2': {
                    label: 'd2-d2d3',
                    notes: 'd2-d2d2-notes',
                    placeholder: 'd2-placeholder',
                },
                name: {
                    label: '名称',
                }
            },
        },
        "商品": {
            input: {
                inputContent: ArticleContent,
                //component: ArticleInput
            }
        },
        "t1": {
            input: {
                //component: DropDownTuidInput,
                component: RadioTuidInput,
                inputContent: T1Content,
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
        "currency": {
            input: {
                component: RadioTuidInput
            }
        },
        "innerorganization": {
            input: {
                component: DropDownTuidInput
            }
        }
    },
}
