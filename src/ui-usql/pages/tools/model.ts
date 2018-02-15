import {TonvaForm, List, FormRow, SubmitResult} from 'tonva-react-form';

export interface Detail {
    name: string;
    label?: string;
    fields: FormRow[];
    renderRow: (row:any) => JSX.Element;
}
export interface MainDetails {
    main: FormRow[];
    details?: Detail[];
}
