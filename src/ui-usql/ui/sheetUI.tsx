import * as React from 'react';
import {UIComponent, FieldMappers, FieldMapper, FieldFaces, FieldFace, DetailFace} from './mapper';
import {Entities, Entity, Tuid, Action, Sheet, Query} from '../entities';
import {EntitiesUI} from './entitiesUI';
import {EntityUI} from './entityUI';

const defaultRenderRow = (row:any) => <div className="px-3 py-2">{JSON.stringify(row)}</div>;
export class SheetUI extends EntityUI<Sheet> {
    detialFaces?: {
        [detail:string]: DetailFace;
    }
    
    mapDetail(name:string, schemaFields:any, detailView:(row:any)=>JSX.Element):any {
        let nfc = this.detialFaces[name];
        let fields = schemaFields.map(sf => this.tfmMap(sf, nfc !== undefined&&nfc.fields[sf.name]));
        return {
            name: name,
            label: nfc.label,
            fields: fields,
            renderRow: detailView || defaultRenderRow,
        }
    }
    mapMainDetails(detailViews: {[name:string]: (row:any)=>JSX.Element}):any {
        let {fields, arrs} = this.entity.schema;
        let main = this.mapFields(fields);
        let details:any[];
        if (arrs !== undefined) {
            details = [];
            for (let arr of arrs) {
                let {name, fields} = arr;
                details.push(this.mapDetail(name, fields, detailViews[name]));
            }
        }
        return {
            main: main,
            details: details,
        }
    }
}

