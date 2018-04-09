import {EntitiesMapper} from '../ui-usql/ui';
import {mapperContainer as tuidMapperContainer} from './tuid';
//import {mapperContainer as sheetMapperContainer} from './sheet';
//import {mapperContainer as historyMapperContainer} from './history';

export const pageMapper:EntitiesMapper = {
    tuid: tuidMapperContainer,
};
