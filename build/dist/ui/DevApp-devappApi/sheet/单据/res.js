export default {
    "bands": [
        { "name": "id1", "label": "id1中文", required: true },
        { "name": "f1", "label": "f1中文", min: 10, max: 100 },
        { "name": "f2", "label": "f2中文", "placeHolder": "输入f2中文" },
        {
            "name": "arr1",
            "label": "arr1中文",
            "bands": [
                { "name": "f11", "label": "arr1-f11中文" },
                { "name": "f12" }
            ]
        },
        { "type": "submit", "content": "bbb {plus} dddd {minus} fff" }
    ],
    "name": "单据",
    "type": "sheet",
    "fields": [
        { "name": "id1", "label": "id1中文", "type": "tuid", "tuid": "article" },
        { "name": "f1", "type": "dec", "scale": 2, "precision": 12 },
        { "name": "f2", "type": "dec", "scale": 2, "precision": 12 }
    ],
    "arrs": [
        {
            "name": "arr1",
            "fields": [
                { "name": "f11", "type": "char", "size": 50 },
                { "name": "f12", "type": "char", "size": 30 }
            ]
        }
    ],
    "states": [
        {
            "name": "$",
            "actions": [
                { "name": "s1", "returns": [] },
                { "name": "s2", "returns": [] }
            ]
        },
        {
            "name": "a",
            "actions": [
                {
                    "name": "a1",
                    "returns": [
                        {
                            "name": "statearet1",
                            "fields": [
                                { "name": "c", "type": "int" },
                                { "name": "state", "type": "char", "size": 30 }
                            ]
                        },
                        {
                            "name": "statearet2",
                            "fields": [
                                { "name": "dd", "type": "datetime" }
                            ]
                        }
                    ]
                },
                {
                    "name": "a2",
                    "returns": []
                }
            ]
        },
        {
            "name": "b",
            "actions": []
        }
    ]
};
//# sourceMappingURL=res.js.map