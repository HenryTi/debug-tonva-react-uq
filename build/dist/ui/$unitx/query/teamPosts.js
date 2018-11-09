import React from 'react';
import { observer } from 'mobx-react';
var ui = {
    row: observer(function (values) { return React.createElement("div", { className: "px-3 py-2" }, values.post.content()); }),
};
export default ui;
//# sourceMappingURL=teamPosts.js.map