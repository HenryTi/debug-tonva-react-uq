import {FieldMapper, FieldMappers} from '../mapper';

export const typeFieldMappers:FieldMappers = {
    'bigint': bigInt,
    'char': char,
    'dec': dec,
    'text': text,
}

function bigInt(schemaField) {
    let {name, tuid} = schemaField;
    let face:any, field:any;
    if (tuid !== undefined) {
        field = {name: name, type: 'id'}
        face = {type: 'pick-id'};
    }
    else {
        field = {name: name, type: 'int'}
        face = {type: 'number'};
    }
    return {label: name, field: field, face: face};
}
function char(schemaField) {
    let {name} = schemaField;
    return {
        label: name,
        field: {name: name, type: 'string', maxLength: schemaField.size},
        face: {type: 'string'}
    };
}
function dec(schemaField) {
    let {name} = schemaField;
    return {
        label: name,
        field: {name: name, type: 'dec', step: 0.01}, 
        face: {type: 'number'}
    };
}
function text(schemaField) {
    let {name} = schemaField;
    return {
        label: name, 
        field: {name: name, type: 'string', maxLength: 1000},
        face: {type: 'textarea'}
    };
}
