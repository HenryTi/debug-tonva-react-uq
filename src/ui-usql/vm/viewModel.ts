import * as React from 'react';

export abstract class ViewModel {
    abstract renderView():JSX.Element;
    async load():Promise<void> {}
}
