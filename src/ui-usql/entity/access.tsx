import * as React from 'react';

export class Access {
    private static loadTime: Date;
    private static items: any;
    static loaded(items:any) {
        Access.loadTime = new Date();
        Access.items = items;
    }
    
    private checkTime: Date;
    private allow: boolean;
    private action:string;
    constructor(action:string) {
        this.action = action;
    }

    get ok(): boolean {
        if (Access.items === undefined) return false;
        if (this.action === undefined) return false;
        let accArr = this.action.split('.');
        let len = accArr.length;
        if (len > 3) return false;
        let val = Access.items;
        for (let i=0; i<len; i++) {
            let ac = accArr[i];
            if (ac === undefined) return false;
            let val1 = val[ac];
            if (val1 === undefined) return false;
            if (val1 === true && i==len-1) return true;
            val = val[ac];
        }
        return false;
    }
}

interface AccessProps {
    action: string,
    com: JSX.Element,
}
export class AccessCom extends React.Component<AccessProps, null> {
    private access: Access;
    //private action:string;
    //private _com: JSX.Element;
    constructor(props) {
        super(props);
        this.access = new Access(this.props.action);
        //this.action = action;
        //this._com= com;
    }
/*
    get com() {
        if (this.check() === false) return;
        return this._com;
    }
*/
    render() {
        if (this.access.ok === true) return this.props.com;
        return null;
    }
}
