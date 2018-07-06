import * as React from 'react';
import { TypeContent, ViewModel } from "../viewModel";
import { Field } from "../field";
import { VmControl } from "./control";
import { TypeFieldBand, TypeFieldsBand, TypeArrBand, TypeSubmitBand } from './band';
import { FormUI, FieldBandUI, FieldsBandUI, ArrBandUI, SubmitBandUI, FieldUI,
    TuidUI, InputUI, StringUI, IntUI, DecUI, TextUI, CheckUI, SelectUI, RadioUI } from './formUI';
import { VmFieldsForm } from './vmFieldsForm';

export interface FormUIX extends FormUI {
    bands: BandUIX[];
    visibleBands?: BandUIX[];
}

export type BandUIX = FieldBandUIX | FieldsBandUIX | ArrBandUIX | SubmitBandUIX;

export interface FieldBandUIX extends FieldBandUI, FieldUIX {
    band?: TypeFieldBand;
    key?: string;
}

export interface FieldsBandUIX extends FieldsBandUI {
    type?: 'fields';
    band?: TypeFieldsBand;
    key?: string;
    fieldUIs: FieldUIX[];                // 对应的多个field ui
}

export interface ArrBandUIX extends ArrBandUI {
    name?: string;
    type?: 'arr';
    vmList?: ViewModel;                  // list view model
    band?: TypeArrBand;
    key?: string;
    bands: BandUIX[];                    // 下一级页面的展开描述
}

export interface SubmitBandUIX extends SubmitBandUI {
    //type: 'submit';
    //content: any;                    // 显示在按钮上的文本
    onSubmit?: () => void;
    band?: TypeSubmitBand;
    key?: string;
    form?: VmFieldsForm;
}

export interface FieldUIX extends FieldUI {
    field?: Field;
    control?: VmControl;              // field control element
}

export interface TuidUIX extends TuidUI {
}

export interface InputUIX extends InputUI {
    placeholder: string;
}

export interface StringUIX extends StringUI {
    //type: 'string';
}

export interface IntUIX extends IntUI {
    //type: 'int';
}

export interface DecUIX extends DecUI {
    //type: 'dec';
}

export interface TextUIX extends TextUI {
    //type: 'text';
} 

export interface CheckUIX extends CheckUI {
    //type: 'check';
}

export interface SelectUIX extends SelectUI {
    //type: 'select';
}

export interface RadioUIX extends RadioUI {
    //type: 'radio';
}
