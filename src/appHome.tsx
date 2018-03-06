import * as React from 'react';
import {List, Muted} from 'tonva-react-form';
import {ws, nav, Page} from 'tonva-tools';
import {pageMapper} from './pages';
import {AppUI, MainPage} from './ui-usql/ui';

const appUI = new AppUI('ui-usql-first', '$$$', {
    "$$$/usql-first": pageMapper,
});

interface State {
    uiLoaded: boolean;
}
export default class AppHome extends React.Component<{}, State> {
    constructor(props) {
        super(props);        
        this.state = {
            uiLoaded: false
        }
    }
    async componentDidMount() {
        ws.setToken('aaa');
        await ws.connect();
        await appUI.load();
        this.setState({
            uiLoaded: true,
        });

    }
    componentWillUnmount() {
        ws.close();
    }
    render() {
        let {uiLoaded} = this.state;
        if (uiLoaded === false) return <Page>loading UI ...</Page>;
        return <MainPage appUI={appUI} />;
    }
}
