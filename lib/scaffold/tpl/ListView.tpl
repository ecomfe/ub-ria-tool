/**
 * ${project.alias}
 * Copyright 2014 Baidu Inc. All rights reserved.
 *
 * @ignore
 * @file ${description}列表视图类
 * @author ${developer.name}(${developer.email})
 */
define(
    function (require) {
        var util = require('er/util');
        var ListView = require('common/ListView');

        require('tpl!./tpl/${templateFile}.tpl.html');

        /**
         * ${description}列表视图类
         *
         * @extends common.ListView
         * @constructor
         */
        function ${viewType}() {
            ListView.apply(this, arguments);
        }

        util.inherits(${viewType}, ListView);

        /** 
         * 使用的模板名称
         *
         * @type {string}
         * @override
         */
        ${viewType}.prototype.template = '${templateName}';

        var Status = require('./enum').Status;

        var tableFields = [
            // TODO: 表格列配置，添加列表相关列
            {
                title: '状态',
                field: 'status',
                sortable: false,
                resizable: false,
                width: 100,
                stable: true,
                content: function (item) {
                    var statusItem = Status[item.status];
                    var status = {
                        type: statusItem.alias.toLowerCase().replace(/_/g, '-'),
                        text: statusItem.text
                    };
                    var Table = require('esui/Table');
                    return Table.status(status);
                }
            },
            {
                title: '操作',
                field: 'operation',
                sortable: false,
                resizable: false,
                width: 80,
                stable: true,
                content: function (item) {
                    var config = [
                        {
                            text: '修改',
                            type: 'modify',
                            auth: item.canModify,
                            url: '#/${entity}/update~id=' + item.id
                        },
                        {
                            text: '查看',
                            type: 'read',
                            auth: !item.canModify,
                            url: '#/${entity}/view~id=' + item.id
                        }
                    ];

                    var Table = require('esui/Table');
                    return Table.operations(config);
                }
            }
        ];

        /**
         * 控件额外属性
         *
         * @type {Object}
         */
        ${viewType}.prototype.uiProperties = {
            table: {
                fields: tableFields
            }
        };
        
        return ${viewType};
    }
);
