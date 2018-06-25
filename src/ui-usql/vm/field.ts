export interface Field {
    name: string;
    type: 'tinyint' | 'smallint' | 'int' | 'bigint' | 'char' | 'text',
    tuid?: string;
    null?: boolean;
    size?: number;
}
