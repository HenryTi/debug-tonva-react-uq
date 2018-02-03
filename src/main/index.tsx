import * as React from 'react';
import {nav, Page} from 'tonva-tools';
import {TestUsqlApi} from './testUsqlApi';
import UsqlPage from '../ui-usql/entity';
import {Main} from '../ui-usql/pages';

export default class AppView extends React.Component {

    render() {
        return <Page header='USQL'>
            <div style={{margin: '2em'}}>
                <div><button onClick={()=>nav.push(<TestUsqlApi />)}>update usql</button></div>
                <div><button onClick={()=>nav.push(<UsqlPage />)}>usql entities</button></div>
                <div><button onClick={()=>nav.push(<Main />)}>new usql entities</button></div>
            </div>
        </Page>
    }
}