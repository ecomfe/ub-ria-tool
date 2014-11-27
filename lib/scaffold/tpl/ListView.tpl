/**
 * <%-: project.alias %>
 *
 *
 * @file <%-: description %>列表视图类
 * @extends common.ListView
 * @author <%-: developer.name %>(<%- developer.email %>)
 */
define(
    function (require) {
        require('tpl!./tpl/<%-: templateFile %>.tpl.html');

        var Status = require('./enum').Status;

        /**
         * @class <%-: entity %>.<%-: viewType %>
         * @extends common.ListView
         */
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

            // TODO: 批量设置控件事件，否则删除该部分
            var uiEvents = {
                // 示例 '{控件ID}:{事件ID}': handleFunctionName
                // 'control-id:eventid': handleFunctionName
                // 具体方法见[https://github.com/ecomfe/ub-ria/wiki/编码实践视图控件事件绑定]
            };
            this.addUIEvents(uiEvents);

            // TODO: 批量设置控件属性，否则删除该部分
            var uiProperties = {
                // TODO: 控件属性在此处添加，示例如下：
                // control-id: {
                //     property1: xxx
                // }
                // 具体方法见[https://github.com/ecomfe/ub-ria/wiki/编码实践视图控件属性设置]
            };
            this.addUIProperties(uiProperties);
        };

        // TODO: 其它接口和处理逻辑在此处添加，否则删除该注释

        var ListView = require('common/ListView');
        var <%-: viewType %> = require('eoo').create(ListView, exports);
        return <%-: viewType %>;
    }
);
