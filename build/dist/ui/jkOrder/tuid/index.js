import * as React from 'react';
import { observer } from 'mobx-react';
import { LMR, Muted } from 'tonva-react-form';
var customer = {
    inputContent: function (values) {
        var id = values.id, discription = values.discription;
        return React.createElement(React.Fragment, null, discription || 'id ' + id + ' ...');
    },
    rowContent: function (row) {
        var discription = row.discription;
        var right = React.createElement(Muted, null);
        return React.createElement(LMR, { className: "px-3 py-2", left: discription, right: right });
    },
};
var productPackRowContent = observer(function (values) {
    var id = values.id, ratio = values.ratio, name = values.name, $owner = values.$owner;
    var content, rText = String(ratio);
    if ($owner !== undefined) {
        var packType_1 = $owner.valueFromFieldName('packType');
        var packName = packType_1.valueFromFieldName ? packType_1.valueFromFieldName('name') : packType_1['name'];
        if (packName) {
            if (name)
                content = name + ' = ' + (rText + packName);
            else
                content = (rText + packName);
        }
    }
    if (content === undefined)
        content = (name ? name + ' ' + rText : rText) + ' err: no $owner in values';
    return React.createElement("div", { className: "px-3 py-2" }, content);
});
var product = {
    inputContent: function (values) {
        var id = values.id, discription = values.discription;
        return React.createElement(React.Fragment, null, discription || 'id ' + id + ' ...');
    },
    rowContent: observer(function (row) {
        var discription = row.discription, packType = row.packType;
        var right;
        if (packType && packType.content) {
            right = React.createElement(Muted, null, packType.content());
        }
        return React.createElement(LMR, { className: "px-3 py-2", left: discription, right: right });
    }),
    divs: {
        pack: {
            inputContent: observer(function (values) {
                var id = values.id, ratio = values.ratio, name = values.name, $owner = values.$owner;
                if ($owner === undefined)
                    return React.createElement(React.Fragment, null, name || ratio || 'id' + id + ' ...');
                var packType = $owner.valueFromFieldName('packType');
                return React.createElement(React.Fragment, null, name || (ratio + (packType && packType.name)) || 'id' + id + ' ...');
            }),
            rowContent: productPackRowContent,
        }
    },
    form: {
        items: {
            packType: {
                autoList: true,
            },
            pack: {
                rowContent: productPackRowContent,
            }
        }
    }
};
var packType = {
    inputContent: function (values) {
        var id = values.id, name = values.name, discription = values.discription;
        return React.createElement(React.Fragment, null, discription || name || 'id ' + id + ' ...');
    },
    rowContent: function (row) {
        var name = row.name, discription = row.discription;
        var right = React.createElement(Muted, null, discription);
        return React.createElement(LMR, { className: "px-3 py-2", left: name, right: right });
    },
};
export default {
    customer: customer,
    product: product,
    packType: packType,
};
//# sourceMappingURL=index.js.map