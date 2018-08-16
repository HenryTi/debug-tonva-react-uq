import * as React from 'react';
import { ViewModel } from '../viewModel';
export class VmLink extends ViewModel {
}
export class VmEntityLink extends VmLink {
    constructor(entity, onLinkClick, label, icon) {
        super();
        this.onClick = () => this.onLinkClick(this.entity);
        this.view = () => React.createElement("div", { className: "px-3 py-2  align-items-center", onClick: this.onClick },
            this.icon,
            " \u00A0 ",
            this.label);
        this.entity = entity;
        this.onLinkClick = onLinkClick;
        this.label = label;
        this.icon = icon;
    }
}
//# sourceMappingURL=vmLink.js.map