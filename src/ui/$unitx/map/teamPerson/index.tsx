import * as React from 'react';
import { Muted } from 'tonva-react-form';
import { left0 } from 'tonva-tools';
import { dictionary as x } from '../../res';
import { VMapMain, MapUI, Field, CMap }  from '../../../../ui-usql'; 

class CrMapTeamPerson extends CMap {
    async searchOnKey(keyField:Field, param):Promise<number> {
        switch (keyField.name) {
            default: return await super.searchOnKey(keyField, param);
            case 'post': return await this.searchOnPost(param);                
        }
    }

    private async searchOnPost(param: any):Promise<number> {
        let querySelect = this.crQuerySelect('teamPosts');
        let val = await querySelect.call(param);
        return val['post'].id;
    }
}

class VmMapTeamPerson extends VMapMain {
}

const ui:MapUI = {
    CrMap: CrMapTeamPerson,
    //label: '部门员工对照表',
    //main: VmMapTeamPerson,
    keys: [
        {
            content: ({name, id}:any) => <><Muted>{x.team}</Muted> {name}</>,
            none: ()=>x.noStaff,
        },
        {
            content: ({name, id}:any) => <><Muted>{x.staff}</Muted> {name} &nbsp; <Muted>{x.no} {left0(id, 4)}</Muted></>,
            none: ()=>x.noPost,
        },
        {
            content: ({title, id}:any) => <><Muted>{x.post}</Muted> {title}</>,
            none: undefined,
        },
    ]
}

export default ui;
