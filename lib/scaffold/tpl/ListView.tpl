/**
 * <%-: project.alias %>
 * Copyright 2014 Baidu Inc. All rights reserved.
 *
 * @file <%-: description %>列表视图类
 * @class <%-: viewType %>
 * @extends common.ListView
 * @author <%-: developer.name %>(<%- developer.email %>)
 */
define(
    function (require) {
        require('tpl!./tpl/list.tpl.html');

        var u = require('common/util');
        var Status = require('./enum').Status;

        var exports = {};

        /**
         * @override
         */
        exports.template = '<%- templateName %>';

        /**
         * @override
         */
        exports.tableFields = [
            {
                title: '名称',
                field: 'name',
                sortable: true,
                resizable: true,
                width: 100,
                content: 'name'
            },
            {
                title: 'ID',
                field: 'id',
                sortable: true,
                resizable: false,
                width: 80,
                stable: true,
                content: 'id'
            },
            {
                title: '状态',
                field: 'status',
                sortable: false,
                resizable: false,
                width: 90,
                stable: true,
                content: function (item) {
                    var statusText = Status.getTextFromValue(item.status) || '--';

                    return statusText;
                }
            }
            // TODO: 其它表格字段在此添加
        ];

        /**
         * @override
         */
        exports.constructor = function () {
            this.$super(arguments);

            // 批量设置控件事件
            this.addUIEvents({
                // TODO: 添加控件事件，如果有的话，否则删除该接口
            });
        };

        var <%-: viewType %> = require('eoo').create(require('common/ListView'), exports);

        return <%-: viewType %>;









        var util = require('er/util');
        var ListView = require('ub-ria/mvc/ListView');

        require('tpl!./tpl/<%-: templateFile %>.tpl.html');

        /**
         * <%-: description %>列表视图类
         *
         * @extends ub-ria.mvc.ListView
         * @constructor
         */
        function <%-: viewType %>() {
            ListView.apply(this, arguments);
        }

        util.inherits(<%-: viewType %>, ListView);

        /**
         * 使用的模板名称
         *
         * @type {string}
         * @override
         */
        <%-: viewType %>.prototype.template = '<%- templateName %>';

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
                    var statusItem = Status.fromValue(item.status);
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
                            url: '#/<%-: entity %>/update~id=' + item.id
                        },
                        {
                            text: '查看',
                            type: 'read',
                            auth: !item.canModify,
                            url: '#/<%-: entity %>/view~id=' + item.id
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
        <%-: viewType %>.prototype.uiProperties = {
            table: {
                fields: tableFields
            }
        };

        return <%-: viewType %>;
    }
);
