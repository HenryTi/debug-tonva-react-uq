import * as React from 'react';
import {EntitiesUI, Entities, defaultMapper} from './ui-usql';

const entities = new Entities('$$$/a', '*');
const entitiesUI = new EntitiesUI(entities, defaultMapper);

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
        await entitiesUI.loadEntities();
        this.setState({
            content: entitiesUI.mainPage,
        });
    }
    render() {
        return this.state.content;
    }
}
