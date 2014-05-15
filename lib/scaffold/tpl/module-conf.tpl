    ---<if:xxx>---
    ... // 此处的内容只有在符合if条件的情况下才有效
    ---</if>---

    abc:xxx
    ---<ChoseOne>---  // 表示这个字段目前有两种表示的方法，但是未来要在两个里面选一种
    abc:yyy

    abc:xxx
    ---<or>---  // 表示这个字段有两种或根多种表示方法，未来可以选择一种，或者都用
    abc:yyy

    ======<default>======  // 此标记以下的内容为不填时所代表的默认值

    ======<optional>======
    name: 'basicInfo'    // 选填字段，可以不填
    ======</optional>======


    {
        /*
         * 列表
         */
        list: {
            cssType: 'sidebar',   // 框架类型，fullsize|sidebar
            ---<if:cssType === 'sidebar'>---
            sidebar: 'sidebarTpl', // sidebarTPL的target
            ---</if>---
            /*
             * 筛选
             */
            filters: [
                status: [
                    { alias: 'ALL', text: '全部', value: 'all' },
                    { alias: 'NOT_REMOVED', text: '未删除', value: '0,1,2,3,4' }
                ],
                ......
                ---<ChoseOne>---
                status: {
                    addition: [
                        { alias: 'ALL', text: '全部', value: 'all' },
                        { alias: 'NOT_REMOVED', text: '未删除', value: '0,1,2,3,4' }
                    ],
                    enum: 'Status'
                    ---<or>---
                    enum: [
                        { alias: 'REGISTERED', text: '当前用户已注册联盟账号' },
                        { alias: 'UNREGISTEED', text: '没有注册' }
                    ]
                },
                ......
            ],

            /*
             * 批量操作
             */
            batchModify: [
                {
                    statusName: "stop",
                    command = "停用",
                    status = 2,
                    accept: [0, 1, 2, 3, 4]
                },
                ......
            ],

            /*
             * 表格字段定义
             */
            table: [
                withCommand: true,
                fields: [
                    {
                        contentType: 'field',
                        title: '姓名',
                        field: 'name'

                        ======<default>======
                        sortable: true,
                        resizable: false,
                        width: 120,
                        stable: false,
                        content: 'name'
                    },
                    {
                        contentType: 'enum',
                        title: '状态',
                        field: 'status',
                        enum: 'status'

                        ======<default>======
                        sortable: false,
                        resizable: false,
                        width: 120,
                        stable: true
                    },
                    {
                        contentType: 'operation',
                        operations: ['modify', 'read', 'link']

                        ======<default>======
                        title: '操作',
                        field: 'operation',
                        sortable: false,
                        resizable: false,
                        width: 80,
                        stable: true
                    }
                ]
            ]
        },

        /*
         * 表单和只读
         */
        form: {
            cssType: 'sidebar',   // 框架类型，fullsize|sidebar
            ---<if:cssType === 'sidebar'>---
            sidebar: 'sidebarTpl', // sidebarTPL的target
            ---</if>---
            sections: [
                {
                    ======<optional>======
                    name: 'basicInfo',
                    title: '基本信息',
                    toggleable: true
                    ======</optional>======
                    fields:{
                        name: 'name',       // 用于字段的name和id中，id为dashlize化的形式
                        title: '姓名',
                        type: 'TextBox',    // 控件的Type
                        value: '@name',     // 对应的Model，不填默认就是name
                        properties: {
                            {key}: {value}, // 这里的内容，会以data-ui-{key}="{value}"的形式输出到模板中，{key}会dashlize化
                            ......
                        },
                        events: {
                            {evnet}: {func},// {event}事件类型，{func}事件处理函数名
                            ......
                        },
                        condition: [        // 这块怎么搞？Toggle类的操作是否要基类直接支持？
                            '{name1} === {value1} && {name2} >= {value2}',
                            ...             // 语句之间是或关系，语句解析只支持===, >=, <=和&&
                        ]
                        ======<default>======
                        inPanel: false      // 如果inPanel为true，则会在控件外层加一个id为{id}-wrapper的panel
                        ---<or>---
                        inPanel: 'groupName'// 如果inPanel值为字符串，则控件会被加入到这个为id（dashlize化）的panel中，并加上group
                    },
                    ......
                },
                ......
            ]
        }
    }