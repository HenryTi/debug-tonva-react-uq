import * as React from 'react';
import { TuidUI } from '../../../ui-usql';
import { observer } from 'mobx-react';
import { LMR, Muted } from 'tonva-react-form';
import { FieldTuidUI } from 'src/ui-usql/controllers/formUI';

const customer:TuidUI = {
    inputContent: (values) => {
        let {id, discription} = values;
        return <>{discription || 'id ' + id + ' ...'}</>;
    },
    rowContent: (row):JSX.Element => {
        let {discription} = row;
        let right = <Muted>{}</Muted>;
        return <LMR className="px-3 py-2" left={discription} right={right}/>
    },
};


const productPackRowContent = observer((values) => {
    let {id, ratio, name, $owner} = values;
    let content, rText = String(ratio);
    if ($owner !== undefined) {
        let packType = $owner.valueFromFieldName('packType');
        let packName = packType.name;
        if (packName) {
            if (name) content = name + ' = ' + (rText + packName);
            else content = (rText + packName);
        }
    }
    if (content === undefined) content = (name? name + ' ' + rText : rText) + ' err: no $owner in values';
    return <div className="px-3 py-2">{content}</div>;
});

const product:TuidUI = {
    inputContent: (values) => {
        let {id, discription} = values;
        return <>{discription || 'id ' + id + ' ...'}</>;
    },
    rowContent: observer((row):JSX.Element => {
        let {discription, packType} = row;
        let right;
        if (packType && packType.content) {
            right = <Muted>{packType.content()}</Muted>;
        }
        return <LMR className="px-3 py-2" left={discription} right={right}/>
    }),
    divs: {
        pack: {
            inputContent: observer((values) => {
                let {id, ratio, name, $owner} = values;
                if ($owner === undefined)
                    return <>{name || ratio || 'id' + id + ' ...'}</>;
                let packType = $owner.valueFromFieldName('packType');
                return <>{name || (ratio + (packType && packType.name)) || 'id' + id + ' ...'}</>;
            }),
            rowContent: productPackRowContent,
        }
    },
    form: {
        items: {
            packType: {
                autoList: true,
            } as FieldTuidUI,
            pack: {
                rowContent: productPackRowContent,
            }
        }
    }
};

const packType:TuidUI = {
    inputContent: (values) => {
        let {id, name, discription} = values;
        return <>{discription || name || 'id ' + id + ' ...'}</>;
    },
    rowContent: (row):JSX.Element => {
        let {name, discription} = row;
        let right = <Muted>{discription}</Muted>;
        return <LMR className="px-3 py-2" left={name} right={right}/>
    },
};

export default {
    customer: customer,
    product: product,
    packType: packType,
}
