import * as React from 'react';
import {LMR} from 'tonva-react-form';
import {SheetUIProps, FieldFace} from '../../ui-usql/ui';
import {Detail} from '../../ui-usql/pages/tools';

export class OrderRow extends React.Component<SheetUIProps> {
    render() {
        let {ui, data} = this.props;
        let {item, detail} = data;
        let d:Detail = detail;
        let articleFieldFace = d.fields[0]; //['article'];
        let face:FieldFace = (articleFieldFace as any).face;
        let {input, tuid} = face as any;
        let Component = input.component;
        let left = <Component 
            tuid={tuid} input={input} readOnly={true} 
            entitiesUI={ui.entitiesUI}
            onPicked={undefined}
            id={item['article']} params={undefined} />;
        let right = <>{item['quantity']} x {item['price']}元 = {item['amount']}元</>;
        return <LMR className="px-3 py-2" left={left} right={right} />;
    }
}
