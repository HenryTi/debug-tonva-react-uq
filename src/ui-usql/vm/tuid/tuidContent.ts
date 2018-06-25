import * as React from 'react';

export interface ContentProps {
    values: any
}
export type TypeContent = new (props:ContentProps) => React.Component<ContentProps>;

