import * as React from 'react';
import { CApp, AppUI } from './controllers';
export * from './entities';
export * from './controllers';
export * from './res';
export * from './centerApi';

function convertUIKeyToLowercase(obj: any) {
    for (let i in obj) {
        let v = obj[i];
        obj[i.toLowerCase()] = v;
        if (typeof v === 'object') {
            if (React.isValidElement(v)) continue;
            if (Array.isArray(v) === true) {
                for (let i of (v as any[])) {
                convertUIKeyToLowercase(i);
            }
        }
        else {
            convertUIKeyToLowercase(v);
        }
      }
  }
}

// const appName = 'JKDev/jkOrder';
export async function startApp(appName:string, ui: AppUI) {
    convertUIKeyToLowercase(ui);
    let cApp = new CApp(appName, ui);
    await cApp.start();
}
