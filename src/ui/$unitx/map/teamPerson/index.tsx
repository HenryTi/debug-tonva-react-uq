import * as React from 'react';
import { VmMapMain, MapUI, Field }  from '../../../../ui-usql';

class VmMapTeamPerson extends VmMapMain {
    protected keyQuery(key:Field):{queryName:string;idName:string} {
        switch (key.name) {
            case 'post': return {
                queryName: 'teamPosts',
                idName: 'post'
             };
        }
    }
    async searchOnKey(keyField:Field, param):Promise<number> {
        switch (keyField.name) {
            default: return await super.searchOnKey(keyField, param);
            case 'post': return await this.searchOnPost(param);                
        }
    }

    private async searchOnPost(param: any):Promise<number> {
        let query = await this.crUsq.getQuerySearch('teamPosts');
        let val = await this.crUsq.querySearch(query, param);
        return val['post'].id;
    }
}

const ui:MapUI = {
    label: '部门员工对照表',
    main: VmMapTeamPerson,
}

export default ui;
