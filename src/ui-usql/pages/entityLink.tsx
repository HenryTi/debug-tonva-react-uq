import * as React from 'react';
import {Entity} from '../entities';
import {EntitiesUIProps, EntityUIProps, EntitiesUI, EntityUI} from '../ui';

export class EntityLink<E extends Entity, U extends EntityUI<E>> extends React.Component<EntityUIProps<E, U>> {
    render() {
        return <div className="px-3 py-2">{this.props.ui.caption}</div>
    }
}
