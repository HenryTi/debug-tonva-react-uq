import * as React from 'react';

export interface TuidContentProps {
    values: any
}
export type TypeTuidContent = new (props:TuidContentProps) => React.Component<TuidContentProps>;

