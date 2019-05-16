import * as React from 'react';
import { Page, Edit, StringSchema } from "tonva-tools";

export function testPage() {
    let schema = [
        {name:'a', type:'string', required: true} as StringSchema
    ];
    let data = {
        a: 'ttt'
    };
    return <Page>
        <Edit schema={schema} data={data} />
    </Page>
}