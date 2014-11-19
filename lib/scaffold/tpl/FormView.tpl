/**
 * <%-: project.alias %>
 * Copyright 2014 Baidu Inc. All rights reserved.
 *
 * @file <%-: description %>表单视图类
 * @exports <%-: entity %>.<%-: viewType %>
 * @author <%-: developer.name %>(<%- developer.email %>)
 */
define(
    function (require) {
        require('tpl!./tpl/<%-: templateFile %>.tpl.html');

        /**
         * @class <%-: entity %>.<%-: viewType %>
         * @extends common.FormView
         */
        var exports = {};

        /**
         * @override
         */
        exports.template = '<%- templateName %>';

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

        // TODO: 事件句柄函数在此处添加，否则删除该注释

        /**
         * @override
         */
        exports.enterDocument = function () {
            this.$super(arguments);

            // TODO: 容器渲染后处理过程在此处添加，如控制元素可见性等操作，否则删除该接口
        };

        // TODO: 渲染后处理函数在此处添加，否则删除该注释

        /**
         * @override
         */
        exports.getEntity = function () {
            var entity = this.$super(arguments);

            // TODO: 从表单中获取实体数据并做相应处理，否则删除该接口

            return entity;
        };

        // TODO: 表单数据获取函数在此处添加，否则删除该注释

        var FormView = require('common/FormView');
        var <%-: viewType %> = require('eoo').create(FormView, exports);

        return <%-: viewType %>;
    }
);
