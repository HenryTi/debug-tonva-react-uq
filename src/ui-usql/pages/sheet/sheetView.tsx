import * as React from 'react';
import {List, Muted} from 'tonva-react-form';
import {Page} from 'tonva-tools';
import {Sheet} from '../../entities';
import {EntitiesUIProps, SheetUIProps} from '../../ui';
import {EntitiesUI, SheetUI} from '../../ui';
import {MainDetails, MainDetailsView} from '../tools';

export interface SheetViewProps {
    className?: string;
    ui: SheetUI;
    sheetState: string;
    sheetData: any;
    flows: any;
}
export class SheetView extends React.Component<SheetViewProps> {
    private mainDetails: MainDetails; 
    constructor(props) {
        super(props);
        this.mainDetails = this.props.ui.mapMainDetails({
            arr1: (row:any) => <div className="mx-3 my-2">{JSON.stringify(row)}</div>
        });
    }

    render() {
        let {className, ui, sheetState, sheetData, flows} = this.props;
        let {entity:sheet} = ui;
        let removed;
        if (sheetState === '-')
            removed = <div className="mx-3 my-2" style={{color:'red'}}>本单据作废</div>;
        let flow = <List header={<Muted>流程</Muted>}
            items={flows}
            item={{}}/>
        return <div className={className}>
            {removed}
            <MainDetailsView
                entitiesUI={ui.entitiesUI}
                mainDetails={this.mainDetails} 
                values={sheetData} />

            {flow}
        </div>;
    }
}
/*
<pre>{JSON.stringify(this.state.data, undefined, ' ')}</pre>
<pre>{JSON.stringify(this.state.res, undefined, ' ')}</pre>
*/