import React from 'react';
import _ from 'lodash';
export default {
    x: {
        none: '[无]',
        no: '编号',
        team: '部门',
        staff: '员工',
        noStaff: '无员工',
        post: '职位',
        noPost: '无职位',
        product: '产品',
        pack: '包装',
        a: 'aaa',
        b: {
            s: 'sss',
            d: () => React.createElement("span", { className: "text-success" }, "ddd"),
        },
        c: () => React.createElement("span", { className: "text-danger" }, "ccc"),
    },
    usq: '百灵威订单',
    tuid: '基础档案',
    sheet: '单据',
    map: '对照表',
    tuidPlaceHolder: '点击选择',
    none: '无内容',
    submit: '提交',
    arrNew: '新增',
    arrEdit: '保存',
    entity: {
        product: {
            label: '产品',
            fields: {
                discription: '描述',
                packType: '基本包装类型',
            },
            arrs: {
                pack: {
                    label: '包装规格',
                    fields: {
                        ratio: '换算率',
                        name: { label: '名称', placeHolder: '如果空，则显示换算率+基本包装类型' },
                    },
                }
            }
        },
        packType: {
            label: '包装类型',
            fields: {
                name: '名称',
                discription: { label: '描述', placeHolder: '包装说明，不用于实际产品中' },
            }
        },
        customer: {
            label: '客户',
            fields: {
                discription: '描述',
            }
        },
        order: {
            x: {
                //top: 'xxx-xxx-订单顶部说明'
                top: () => React.createElement(React.Fragment, null,
                    React.createElement("h6", null, "\u8BA2\u5355\u6B65\u9AA4"),
                    React.createElement("div", null, "\u7B2C\u4E00\u6B65\uFF1A\u9009\u5B9A\u5BA2\u6237"),
                    React.createElement("div", null,
                        "\u7B2C\u4E8C\u6B65\uFF1A\u989C\u8272\u53D8\u5316",
                        React.createElement("span", { className: "text-success" }, "\u8BF4\u660E"),
                        React.createElement("span", { className: "text-danger" }, "\u6587\u5B57"),
                        "\uFF0C\u89E3\u91CA\u505A\u5355\u7684\u8FC7\u7A0B")),
                title: _.template('订单 ${customer} 金额${amount}元'),
                detail: '订单-详情',
            },
            label: '订单',
            arrNew: '新增',
            arrEdit: '保存',
            title: _.template('订单 客户${customer} 金额${amount}元'),
            //arrTitleNewButton: <small>XXX新增</small>,
            fields: {
                customer: '客户',
                fromUnit: '发送部门',
                type: '类型',
                date: '日期',
                subject: '主题',
                discription: '描述',
                content: '内容'
            },
            arrs: {
                products: {
                    label: '产品明细',
                    fields: {
                        product: { label: '产品', placeHolder: '点击选择产品' },
                        pack: { label: '包装规格', placeHolder: '点击选择包装规格' },
                        price: { label: '单价', suffix: '元' },
                        quantity: { label: '数量' },
                        amount: { label: '金额', suffix: '元' },
                    }
                }
            },
            states: {
                $: {
                    label: '新开单',
                    actions: {
                        submit: {
                            label: '新单提交',
                        }
                    }
                },
                deliver: {
                    label: '发货',
                    actions: {
                        finish: {
                            label: '完成发货',
                        }
                    }
                }
            }
        },
        price: {
            label: '产品价格表',
        },
        getMessage: {
            label: '获取Message',
            submit: '获取消息',
            fields: {
                msg: '消息'
            }
        },
        newMessage: {
            label: '新建消息',
            fields: {
                type: '类型',
                subject: '主题',
            },
            arrs: {
                to: {
                    label: '发送',
                    newSubmit: '新增to',
                    editSumbit: '保存to',
                },
                cc: {
                    label: '抄送',
                    newSubmit: '新增cc',
                    editSumbit: '保存cc',
                }
            }
        },
        sectionTeam: {
            label: '大部设置',
        },
        teamPerson: {
            label: '部门员工职位',
            fields: {},
            confirmDelete: _.template('真的要删除${label}吗'),
        },
        teamOrganization: {
            label: '部门机构对照表',
        },
        teamPosts: {
            label: '部门职位',
        },
        person: {
            label: '员工',
            fields: {
                name: '姓名',
                nick: '别名',
                given: '名字',
                sur: '姓',
                gender: '性别',
                user: '用户',
            }
        },
        organization: {
            label: '组织结构',
            arrs: {
                post: {
                    label: '职位',
                }
            }
        },
        user: {
            label: '用户'
        }
    }
};
//# sourceMappingURL=CN.js.map