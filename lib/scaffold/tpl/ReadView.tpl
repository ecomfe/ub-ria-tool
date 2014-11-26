/**
 * <%-: project.alias %>
 *
 *
 * @file <%-: description %>只读页视图类
 * @exports <%-: entity %>.<%-: viewType %>
 * @author <%-: developer.name %>(<%- developer.email %>)
 */
define(
    function (require) {
        require('tpl!./tpl/<%-: templateFile %>.tpl.html');

        /**
         * @class <%-: entity %>.<%-: viewType %>
         * @extends common.ReadView
         */
        var exports = {};

        /**
         * @override
         */
        exports.template = '<%- templateName %>';

        /**
         * @override
         */
        exports.enterDocument = function () {
            this.$super(arguments);

            // TODO: 容器渲染后处理过程在此处添加，如控制元素可见性等操作，否则删除该接口
        };

        // TODO: 渲染后处理函数在此处添加，否则删除该注释

        var ReadView = require('common/ReadView');
        var <%-: viewType %> = require('eoo').create(ReadView, exports);
        return <%-: viewType %>;
    }
);
