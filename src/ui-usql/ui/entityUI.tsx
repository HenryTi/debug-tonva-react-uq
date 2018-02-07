import {UIComponent, FieldMappers, FieldMapper, FieldCompilers, FieldCompiler} from '../mapper';
import {EntitiesUI} from './entitiesUI';
import {Entity} from '../entities';

export class EntityUI<E extends Entity> {
    entitiesUI: EntitiesUI;
    entity: E;    
    caption: string;
    typeFieldMappers?: FieldMappers;
    nameFieldCompilers?: FieldCompilers;

    mapFields(schemaFields:any[]):any[] {
        let tfm = this.typeFieldMappers;
        let nfc = this.nameFieldCompilers;
        function tfmMap(sf:any, fc:FieldCompiler) {
            if (fc === undefined) {
                let fm = tfm[sf.type];
                if (fm === undefined) {
                    console.log('type field mapper not defined');
                    return;
                }
                return fm(sf);
            }
            else {
                let fm = fc.mapper || tfm[sf.type];
                if (fm === undefined) {
                    console.log('type field mapper not defined');
                    return;
                }
                let ret = fm(sf);
                let {label, notes, placeholder} = fc;
                if (label !== undefined) ret.label = label;
                let face = ret.face;
                if (face !== undefined) {
                    if (notes !== undefined) face.notes = notes;
                    if (placeholder !== undefined) face.placeholder = placeholder;
                }
                return ret;
            }
        }
        return schemaFields.map(sf => tfmMap(sf, nfc !== undefined&&nfc[sf.name]));
    }

    link?: UIComponent<E, EntityUI<E>>;
    mainPage?: UIComponent<E, EntityUI<E>>;
}
