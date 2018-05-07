//import {MainPage} from './mainPage';
import { MainPage } from './lll';
import { EditPage } from './edit';
import { ArticleContent } from './articleInput';
import { CandidateRow, CustomerContent } from './customerInput';
export const mapperContainer = {
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
    },
};
/*
this.formRows = [
    {label: '申请人', field: fields.name, face: {type: 'string', placeholder: '真实姓名'}},
];
let a = `{
    "fields":[
        {"name":"b1","type":"bigint","tuid":"article"},
        {"name":"name","type":"char","size":50},
        {"name":"d2","type":"dec","scale":2,"precision":10},
        {"name":"discription","type":"text"}
    ],
    "name":"商品",
    "type":"tuid",
    "global":true,
    "id":"id","unique":["name"],
    "search":["name","discription"]
}`;
*/ 
//# sourceMappingURL=index.js.map