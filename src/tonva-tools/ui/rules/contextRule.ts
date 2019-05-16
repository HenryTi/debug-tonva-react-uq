import { Context } from '../form/context';

export type ContextRule = (context:Context)=>{[target:string]:string[]|string} | string[] | string;
