import * as React from 'react';
import {TuidPickFace, FormProps, Muted} from 'tonva-react-form';
import {nav, Page} from 'tonva-tools';
import {TuidUI, TuidInputProps} from '../../ui-usql/ui';

export class T1Content extends React.Component<{value:any}> {
    render() {
        let {discription, name} = this.props.value;
        return <>{discription} <Muted>{name}</Muted></>;
    }
}
