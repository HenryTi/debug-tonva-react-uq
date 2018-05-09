import * as React from 'react';
import {TuidPickFace, FormProps, Muted} from 'tonva-react-form';
import {nav, Page} from 'tonva-tools';
import {TuidUI, TuidInputProps} from '../../ui-usql/ui';

export class T1Content extends React.Component<{value:any}> {
    render() {
        let {value} = this.props;
        //return <div>id = {value.id} {JSON.stringify(value)} </div>;
        //if (!value) return <div>t1</div>;
        return <>{value.discription} <Muted>{value.name}</Muted></>;
    }
}
