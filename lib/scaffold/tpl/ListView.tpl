/**
 * <%-: project.alias %>
 * Copyright 2014 Baidu Inc. All rights reserved.
 *
 * @ignore
 * @file <%-: description %>列表视图类
 * @author <%-: developer.name %>(<%- developer.email %>)
 */
define(
    function (require) {
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

        <%
            var fields = list.table.fields;
            for (var i = 0; i < fields.length; i++) {
                if (fields[i][0] === 'enum') {
        %>var <%=: fields[i][1] | pascal %> = require('./enum').<%=: fields[i][1] | pascal %>;<%
                }
            }
        %>

        <%-: viewType %>.prototype.tableFields = [
            // TODO: 表格列配置，添加列表相关列<%
                var fields = list.table.fields;
                for (var i = 0; i < fields.length; i++) {
                    if (fields[i][0] === 'enum') {
            %>
            {
                title: '<%- fields[i][2] %>',
                field: '<%- fields[i][1] %>',
                sortable: false,
                resizable: false,
                width: 100,
                stable: true,
                content: function (item) {
                    var <%- fields[i][1] %>Item = <%=: fields[i][1] | pascal %>.fromValue(item.<%- fields[i][1] %>);
                    var <%- fields[i][1] %> = {
                        type: <%- fields[i][1] %>Item.alias.toLowerCase().replace(/_/g, '-'),
                        text: <%- fields[i][1] %>Item.text
                    };
                    var Table = require('esui/Table');
                    return Table.<%- fields[i][1] %>(<%- fields[i][1] %>);
                }
            },<%
                    }
                    if (fields[i][0] === 'field') {
            %>
            {
                title: '<%- fields[i][2] %>',
                field: '<%- fields[i][1] %>',
                sortable: false,
                resizable: false,
                width: 100,
                stable: true,
                content: '<%- fields[i][1] %>'
            },<%
                }
            }
            %>
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
