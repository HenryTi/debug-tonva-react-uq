import * as React from 'react';
import {ws} from 'tonva-tools';
import {EntitiesUI, Entities, defaultMapper} from './ui-usql';
import {pageMapper} from './pages';


const appAccess = process.env.REACT_APP_ACCESS;
//'$$$/a', appAccess
//const entities = new Entities();
const entitiesUI = new EntitiesUI('$$$/a', appAccess, defaultMapper, pageMapper);

interface State {
    content: JSX.Element;
}
export default class AppHome extends React.Component<{}, State> {
    constructor(props) {
        super(props);
        this.state = {
            content: <div/>,
        }
    }
    async componentDidMount() {
        ws.setToken('aaa');
        await ws.connect();
        await entitiesUI.loadEntities();
        await entitiesUI.buildUI();
        this.setState({
            content: entitiesUI.mainPage,
        });
    }
    componentWillUnmount() {
        ws.close();
    }
    render() {
        return this.state.content;
    }
}
