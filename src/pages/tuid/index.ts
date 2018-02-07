import {MapperContainer,TuidMapper} from '../../ui-usql/mapper';
import {Tuid} from '../../ui-usql/entities';
import {EntityUI, TuidUI} from '../../ui-usql/ui';
import {MainPage} from './mainPage';
//import {EntityLink} from '../entityLink';

export const mapperContainer:MapperContainer<Tuid, TuidUI, TuidMapper> = {
    //caption: '数据字典',
    mapper: {
        //link: EntityLink,
        //mainPage: MainPage,
    },
    mappers: {
        "商品inunit": {
            mainPage: MainPage,
            uiFields: {
                'd2': {
                    label: 'd2-d2d2',
                    notes: 'd2-d2d2-notes',
                    placeholder: 'd2-placeholder',
                },
                name: {
                    label: '名称',
                }
            },
        }
    },
}
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