import * as React from 'react';
import { FieldBandUI, FieldsBandUI, ArrBandUI, SubmitUI } from "./formUI";

export type TypeFieldBand = ({}:FieldBandUI) => JSX.Element;
export type TypeFieldsBand = ({}:FieldsBandUI) => JSX.Element;
export type TypeArrBand = ({}:ArrBandUI) => JSX.Element;
export type TypeSubmitBand = ({}:SubmitUI) => JSX.Element;

export const FieldBand = ({label, control, field}:FieldBandUI) => {
    return <div className='form-group row'>
        <label className='col-sm-2 col-form-label'>
            {label}
        </label>
        <div className="col-sm-10">
            {control.renderView()}
        </div>
    </div>;
}

export const FieldsBand = ({label, fieldUIs}:FieldsBandUI) => {
    let f0 = fieldUIs[0];
    return <div className='form-group row'>
        <label className='col-sm-2 col-form-label'>
            {label}
        </label>
        <div className="col-sm-10">
            {fieldUIs.map(v => v.control.renderView())}
        </div>
    </div>;
}

export const ArrBand = ({label, name, bands, control}: ArrBandUI) => {
    return <div>
        <div>{label}</div>
        {control.renderView()}
    </div>;
}
