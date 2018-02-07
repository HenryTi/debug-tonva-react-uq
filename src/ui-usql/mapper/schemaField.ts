/*
{
    "fields":[
        {"name":"b1","type":"bigint","tuid":"article"},
        {"name":"name","type":"char","size":50},
        {"name":"d2","type":"dec","scale":2,"precision":10},
        {"name":"discription","type":"text"}
    ],
    "name":"商品",
    "type":"tuid",
    "global":true,
    "id":"id",
    "unique":["name"],
    "search":["name","discription"]
}
*/

export interface SchemaField {
    name: string;
    type: 'tinyint'|'smallint'|'int'|'bigint'|'dec'|'date'|'time'|'datetime'|'char'|'text';
}

export interface SchemaFieldTinyInt extends SchemaField {
    type: 'tinyint';
}

export interface SchemaFieldSmallInt extends SchemaField {
    type: 'smallint';
}

export interface SchemaFieldInt extends SchemaField {
    type: 'int';
}

export interface SchemaFieldBigInt extends SchemaField {
    type: 'bigint';
}

export interface SchemaFieldTuid extends SchemaField {
    type: 'bigint';
    tuid: string;
}

export interface SchemaFieldDec extends SchemaField {
    type: 'dec';
    scale: number;
    pricision: number;
}

export interface SchemaFieldChar extends SchemaField {
    type: 'char';
    size: number;
}
