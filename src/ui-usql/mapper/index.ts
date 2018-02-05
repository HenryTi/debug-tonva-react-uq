import {Entities, Entity, Tuid, Action, Sheet, Query} from "../entities";
import {EntitiesUI, EntityUI, TuidUI, ActionUI, SheetUI, QueryUI} from '../ui';

export type FromPicked = (item:any)=>{id:number, caption?:string|JSX.Element};
export type ItemFromId = (id:number)=>any;
export type IdPick = (face: IdPickFace, params:any) => Promise<any>;

export interface IdPickFace {
    initCaption: string|JSX.Element;
    notes?: string;
    input: new (props:any) => React.Component;
    pick: new (props:any) => React.Component;
    fromPicked: FromPicked;
    itemFromId?: ItemFromId;
}

export interface FieldMapper {
    name: string;
    label: string;
}

export interface EntityUIProps<T extends Entity, TUI extends EntityUI<T>> {
    ui: TUI;
}
export type UIComponent<T extends Entity, TUI extends EntityUI<T>> = new (props:EntityUIProps<T, TUI>) => React.Component<EntityUIProps<T, TUI>>;
export interface EntityMapper<T extends Entity, TUI extends EntityUI<T>> {
    //name: string;
    caption?: string;
    link?: UIComponent<T, TUI>;
    mainPage?: UIComponent<T, TUI>;
}
export interface TuidMapper extends EntityMapper<Tuid, TuidUI> {
    schemaMapper?: {
        [name:string]: FieldMapper;
    };
    editPage?: UIComponent<Tuid, TuidUI>;
    listPage?: UIComponent<Tuid, TuidUI>;
    idPick?: IdPickFace;
}

export interface ActionMapper extends EntityMapper<Action, ActionUI> {
    schemaMapper?: {
        [name:string]: FieldMapper;
    };
}

export interface SheetMapper extends EntityMapper<Sheet, SheetUI> {
    schemaMapper?: {
        [name:string]: FieldMapper;
    };
}

export interface QueryMapper extends EntityMapper<Query, QueryUI> {
    schemaMapper?: {
        [name:string]: FieldMapper;
    };
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