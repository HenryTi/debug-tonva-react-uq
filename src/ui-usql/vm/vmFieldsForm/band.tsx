import * as React from 'react';
import { FA } from 'tonva-react-form';
import { FieldBandUIX, FieldsBandUIX, ArrBandUIX, SubmitBandUIX } from "./formUIX";

export type TypeFieldBand = ({}:FieldBandUIX) => JSX.Element;
export type TypeFieldsBand = ({}:FieldsBandUIX) => JSX.Element;
export type TypeArrBand = ({}:ArrBandUIX) => JSX.Element;
export type TypeSubmitBand = ({}:SubmitBandUIX) => JSX.Element;

export const FieldBand = ({label, control, field}:FieldBandUIX) => {
    return <div className='form-group row'>
        <label className='col-sm-2 col-form-label'>
            {label}
        </label>
        <div className="col-sm-10">
            {control.renderView()}
        </div>
    </div>;
}

export const FieldsBand = ({label, fieldUIs}:FieldsBandUIX) => {
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

export const ArrBand = ({label, name, bands, vmList}: ArrBandUIX) => {
    return <div className="form-group row flex-column">
        {vmList && vmList.renderView()}
    </div>;
}

export const SubmitBand = ({content, onSubmit}: SubmitBandUIX) => {
    return <div className="form-group row">
        <div className="offset-sm-2 col-sm-10">
            <button type="button" onClick={onSubmit} className="btn btn-primary">
                {content}
            </button>
        </div>
    </div>;
}
