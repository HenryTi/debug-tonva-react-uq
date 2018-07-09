export default {
    label: "order客户订单",
    "bands": [
        {"name":"客户", "label":"客户", "readOnly":true},
        {
            "name": "articles",
            "label": "选中的产品",
            "bands": [
                {"name":"article", "label":"产品" },
                {"name":"price", "label":"单价" },
                {"name":"quantity", "label":"数量" },
                {"name":"amount", "label":"金额" }
            ]
        },

        {"type":"submit", "content":"{send} 提交订单"}
    ],

    "states": {
        "$": {
            label: '新单',
            actions: {
                批准订单: {label:'批准订单操作',"returns":[]},
                不批准: {label: '不批准操作',"returns":[]}
            }
        },
        "a": {
            label: '状态a',
            "actions": [
                {
                    "name": "a1",
                    "returns": [
                        {
                            "name": "statearet1",
                            "fields": [
                                {"name":"c","type":"int"},
                                {"name":"state","type":"char","size":30}
                            ]
                        },
                        {
                            "name": "statearet2",
                            "fields": [
                                {"name":"dd","type":"datetime"}
                            ]
                        }
                    ]
                },
                {
                    "name":"a2",
                    "returns":[]
                }
            ]
        },
        b: {
            label: "状态b",
            "actions":[]
        }
    }
}
