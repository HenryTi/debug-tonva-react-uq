import * as React from 'react';
import { List, Muted } from 'tonva-react-form';
import { ViewModel } from './viewModel';
export class VmApi extends ViewModel {
    constructor(api, links) {
        super();
        this.api = api;
        this.links = links;
    }
    /*
    getTuid(name:string) {return this.entities.tuid(name)}
    async getQuerySearch(name:string):Promise<Query> {
        let query = this.entities.query(name);
        if (query === undefined)
            alert(`QUERY ${name} 没有定义!`);
        else {
            await query.loadSchema();
            let {returns} = query;
            if (returns.length > 1) {
                alert(`QUERY ${name} 返回多张表, 无法做QuerySearch`);
            }
        }
        return query;
    }

    protected isSysVisible = false;
    protected isVisible(entity: Entity):boolean {
        return entity.sys !== true || this.isSysVisible;
    }

    async navSheet(sheetTypeId:number, sheetId:number) {
        let sheet = this.entities.sheetFromTypeId(sheetTypeId);
        if (sheet === undefined) {
            alert('sheetTypeId ' + sheetTypeId + ' is not exists!');
            return;
        }
        let vmSheetMain = this.newVmSheet(sheet);
        await vmSheetMain.showSheet(sheetId);
}

    vmLinkFromName(entityType:EntityType, entityName:string) {
        switch (entityType) {
        case 'sheet':
            let sheet = this.entities.sheet(entityName);
            if (sheet === undefined) return;
            let vmSheetMain = this.newVmSheet(sheet);
            return new VmEntityLink(vmSheetMain);
        case 'action':
            let action = this.entities.action(entityName);
            if (action === undefined) return;
            let vmActionMain = this.newVmAction(action);
            return new VmEntityLink(vmActionMain);
        case 'tuid':
            let tuid = this.entities.tuid(entityName);
            if (tuid === undefined) return;
            let vmTuidMain = this.newVmTuid(tuid);
            return new VmEntityLink(vmTuidMain);
        case 'query':
            let query = this.entities.query(entityName);
            if (query === undefined) return;
            let vmQueryMain = this.newVmQuery(query);
            return new VmEntityLink(vmQueryMain);
        case 'book':
            let book = this.entities.book(entityName);
            if (book === undefined) return;
            let vmBookMain = this.newVmBook(book);
            return new VmEntityLink(vmBookMain);
        case 'map':
            let map = this.entities.map(entityName);
            if (map === undefined) return;
            let vmMapMain = this.newVmMap(map);
            return new VmEntityLink(vmMapMain);
        }
    }

    private getUI<T extends EntityUI>(type:string, name:string):T {
        if (this.ui === undefined) return;
        let t = this.ui[type];
        if (t === undefined) return;
        let {collection} = t;
        if (collection === undefined) return;
        return collection[name];
    }

    private getUITypeCaption(type:EntityType):any {
        if (this.ui === undefined) return;
        let t = this.ui[type];
        if (t === undefined) return;
        let {caption} = t;
        return caption;
    }


    newVmSearch(entity:Entity, onSelected:(item:any)=>Promise<void>):VmPage {
        switch (entity.typeName) {
            case 'tuid': return this.newVmTuidSearch(entity as Tuid, onSelected);
            case 'query': return this.newVmQuerySearch(entity as Query, onSelected);
        }
    }
    newVmTuidSearch(tuid:TuidBase, onSelected:(item:any)=>Promise<void>):VmPage {
        let ui = this.getUI<TuidUI>('tuid', tuid.name);
        let vm = ui && ui.search;
        if (vm === undefined) vm = VmTuidSearch;
        let ret = new vm(this, tuid, ui);
        ret.onSelected = onSelected;
        return ret;
    }
    newVmQuerySearch(query:Query, onSelected:(item:any)=>Promise<void>):VmPage {
        let ui = this.getUI<QueryUI>('query', query.name);
        let vm = ui && ui.search;
        if (vm === undefined) vm = VmQuerySearch;
        let ret = new vm(this, query, ui);
        ret.onSelected = onSelected;
        return ret;
    }


    typeVmTuidControl(tuid:Tuid): TypeVmTuidControl {
        let ui = this.getUI<TuidUI>('tuid', tuid.name);
        let typeVmTuidControl = ui && ui.input;
        if (typeVmTuidControl === undefined) typeVmTuidControl = VmTuidControl;
        return typeVmTuidControl;
    }

    pickerConfig(tuid:Tuid): PickerConfig {
        let ui = this.getUI<TuidUI>('tuid', tuid.name);
        let pickerConfig:PickerConfig = ui && ui.pickerConfig;
        let pc:PickerConfig = {
            picker: VmTuidPicker,
            row: JSONContent,
        };
        return _.merge(pc, pickerConfig);
    }

    typeTuidContent(tuid:Tuid): TypeContent {
        let ui = this.getUI<TuidUI>('tuid', tuid.name);
        let typeTuidContent = ui && ui.content;
        if (typeTuidContent === undefined) typeTuidContent = JSONContent;
        return typeTuidContent;
    }

    async create<T extends VmEntity>(vmType: new (vmUsq:VmApi, entity:Entity, ui:EntityUI) => T,
        entity:Entity, ui:EntityUI): Promise<T> {
        let vm = new vmType(this, entity, ui);
        //await vm.loadSchema();
        return vm;
    }

    navVm = async <T extends VmEntity> (vmType: new (vmUsq:VmApi, entity:Entity, ui:EntityUI) => T,
    entity:Entity, ui:EntityUI, param?:any) => {
        let vm = await this.create<T>(vmType, entity, ui);
        await vm.start(param);
    }
    */
    get view() {
        return () => {
            const renderLink = (vmLink, index) => {
                return vmLink.render();
            };
            const linkClick = (vmLink) => {
                vmLink.onClick();
            };
            let linkItem = { render: renderLink, onClick: linkClick };
            let lists = [
                {
                    header: this.links.tuid.caption,
                    items: this.links.tuid.links,
                },
                {
                    cn: 'my-2',
                    header: this.links.map.caption,
                    items: this.links.map.links,
                },
                {
                    cn: 'my-2',
                    header: this.links.sheet.caption,
                    items: this.links.sheet.links,
                },
                {
                    cn: 'my-2',
                    header: this.links.action.caption,
                    items: this.links.action.links,
                },
                {
                    cn: 'my-2',
                    header: this.links.query.caption,
                    items: this.links.query.links,
                },
                {
                    cn: 'mt-2 mb-4',
                    header: this.links.book.caption,
                    items: this.links.book.links,
                }
            ];
            return React.createElement(React.Fragment, null,
                React.createElement("div", { className: "px-3 py-1 small" }, this.api),
                lists.map(({ cn, header, items }, index) => items.length > 0 && React.createElement(List, { key: index, className: cn, header: React.createElement(Muted, null, header), items: items, item: linkItem })));
        };
    }
}
/*
const ApiView = ({vm}:{vm:VmApi}) => {
    let {api, renderLink, linkClick,
        tuidTypeCaption, vmTuidLinks,
        mapTypeCaption, vmMapLinks,
        sheetTypeCaption, vmSheetLinks,
        actionTypeCaption, vmActionLinks,
        queryTypeCaption, vmQueryLinks,
        bookTypeCaption, vmBookLinks
    } = vm;
    let linkItem = { render: renderLink, onClick: linkClick };
    let lists = [
        {
            header: tuidTypeCaption,
            items: vmTuidLinks,
        },
        {
            cn: 'my-2',
            header: mapTypeCaption,
            items: vmMapLinks,
        },
        {
            cn: 'my-2',
            header: sheetTypeCaption,
            items: vmSheetLinks
        },
        {
            cn: 'my-2',
            header: actionTypeCaption,
            items: vmActionLinks
        },
        {
            cn: 'my-2',
            header: queryTypeCaption,
            items: vmQueryLinks
        },
        {
            cn: 'mt-2 mb-4',
            header: bookTypeCaption,
            items: vmBookLinks
        }
    ];
    return <>
        <div className="px-3 py-1 small">{api}</div>
        {lists.map(({cn, header, items},index) => items.length > 0 && <List
            key={index}
            className={cn}
            header={<Muted>{header}</Muted>}
            items={items}
            item={linkItem} />
        )}
    </>;
}
*/ 
//# sourceMappingURL=vmUsq.js.map