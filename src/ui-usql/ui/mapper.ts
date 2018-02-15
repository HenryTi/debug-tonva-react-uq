import {Entities, Entity, Tuid, Action, Sheet, Query} from "../entities";
import {EntitiesUI} from './entitiesUI';
import {EntityUI} from './entityUI';
import {ActionUI} from './actionUI';
import {QueryUI} from './queryUI';
import {SheetUI} from './sheetUI';
import {TuidUI} from './tuidUI';

//export type FromPicked = (item:any)=>{id:number, caption?:string|JSX.Element};
//export type ItemFromId = (id:number)=>any;
//export type IdPick = (face: IdFace, params:any) => Promise<any>;

export interface TuidInput {
    component?: TuidInputComponent;
    inputContent?: new (props:{value:any}) => React.Component<{value:any}>;
    search?: (pageStart:any, pageSize:number, params:any) => Promise<any[]>;
    candidateRow?: new (props:{item:any; index:number}) => React.Component<any>;
    pickPage?: new (props:TuidPickPageProps) => React.Component<TuidPickPageProps>;
}
export interface TuidContentProps {
    id: number;
    tuidUI: TuidUI;
}
export interface TuidInputProps {
    id: number;
    tuid: string;
    input: TuidInput;
    readOnly: boolean;
    entitiesUI: EntitiesUI;
    params: any;
    onPicked: (value:any) => void;
}
export interface TuidPickPageProps {
    id: number;
    tuidUI: TuidUI;
    input: TuidInput;
    params: any;
    onPicked: (value:any) => void;
}
export type TuidInputComponent = new (props:TuidInputProps) => React.Component<TuidInputProps>;

export type FieldMapper = (field:any) => any;
export interface FieldMappers {
    [name:string]: FieldMapper;
}
export interface FieldFace {
    label?: string;
    notes?: string;
    placeholder?: string;
    input?: TuidInput;
    mapper?: FieldMapper;
}
export interface FieldFaces {
    [name:string]: FieldFace;
}

export interface EntityUIProps<T extends Entity, TUI extends EntityUI<T>> {
    ui: TUI;
    data?: any;
}
export type UIComponent<T extends Entity, TUI extends EntityUI<T>> = new (props:EntityUIProps<T, TUI>) => React.Component<EntityUIProps<T, TUI>>;
export type ActionUIProps = EntityUIProps<Action, ActionUI>;
export type ActionUIComponent = new (props:ActionUIProps) => React.Component<ActionUIProps>;
export type QueryUIProps = EntityUIProps<Query, QueryUI>;
export type QueryUIComponent = new (props:QueryUIProps) => React.Component<QueryUIProps>;
export type SheetUIProps = EntityUIProps<Sheet, SheetUI>;
export type SheetUIComponent = new (props:SheetUIProps) => React.Component<SheetUIProps>;
export type TuidUIProps = EntityUIProps<Tuid, TuidUI>;
export type TuidUIComponent = new (props:TuidUIProps) => React.Component<TuidUIProps>;

export interface EntityMapper<T extends Entity, TUI extends EntityUI<T>> {
    caption?: string;
    typeFieldMappers?: FieldMappers;
    fieldFaces?: FieldFaces;
    link?: UIComponent<T, TUI>;
    mainPage?: UIComponent<T, TUI>;
}
export interface TuidMapper extends EntityMapper<Tuid, TuidUI> {
    editPage?: TuidUIComponent;
    listPage?: TuidUIComponent;
    input?: TuidInput;
}

export interface ActionMapper extends EntityMapper<Action, ActionUI> {
}

export interface DetailFace {
    label?: string;
    fields: FieldFaces;
}
export interface SheetMapper extends EntityMapper<Sheet, SheetUI> {
    detailFaces?: {[detail:string]: DetailFace;}
}

export interface QueryMapper extends EntityMapper<Query, QueryUI> {
}

export interface EntitiesUIProps {
    ui: EntitiesUI;
}
export interface MapperContainer<E extends Entity, U extends EntityUI<E>, T extends EntityMapper<E, U>> {
    caption?: string;
    mapper?: T;
    mappers?: {[name:string]: T};
    list?: string[];    // 清单，如果undefined，则全部，按字母顺序排名
}
export interface EntitiesMapper {
    mainPage?: new (props:EntitiesUIProps) => React.Component<EntitiesUIProps>;
    caption?: string;

    typeFieldMappers?: {[name:string]: FieldMapper};

    tuid?: MapperContainer<Tuid, TuidUI, TuidMapper>;
    action?: MapperContainer<Action, ActionUI, ActionMapper>;
    sheet?: MapperContainer<Sheet, SheetUI, SheetMapper>;
    query?: MapperContainer<Query, QueryUI, QueryMapper>;
}
/*
export function mergeEntitiesMapper(dst:EntitiesMapper, src:EntitiesMapper) {
    dst.mainPage = src.mainPage || dst.mainPage;
    dst.caption = src.caption || (dst.caption || 'Tonva Usql Entities');

    let dstTuid = dst.tuid, srcTuid = src.tuid;
    if (dstTuid === undefined) dst.tuid = dstTuid = {};
    if (srcTuid !== undefined) {
        dstTuid.mapper = srcTuid.mapper || dstTuid.mapper;
        //if (dstTuid)
    }
}

function mergeMapperContainer<T>(dst:MapperContainer<T>, src:MapperContainer<T>):MapperContainer<T> {
    let ret:MapperContainer<T> = {};
    ret.mapper = mergeEntityMapper(dst.mapper, src.mapper);
    return ret;
}

function mergeEntityMapper<T>(dst:T, src:T):T {
    return undefined;
}
*/