/**
 * <%-: project.alias %>
 *
 *
 * @file <%-: description %>列表
 * @extends common.ListAction
 * @author <%-: developer.name %>(<%- developer.email %>)
 */
define(
    function (require) {
        /**
         * @class <%-: entity %>.<%-: actionType %>
         * @extends common.ListAction
         */
        var exports = {};

        /**
         * @override
         */
         // TODO: 必须根据系统的导航条信息来设置Action的分组名
        exports.group = 'unknown';

        /**
         * @override
         */
        exports.entityDescription = '<%-: description %>';


        /**
         * @override
         */
        exports.initBehavior = function () {
            this.$super(arguments);
            //TODO: Action 初始化交互行为在这里添加，否则删除该接口
        };

        var ListAction = require('common/ListAction');
        var <%-: actionType %> = require('eoo').create(ListAction, exports);
        return <%-: actionType %>;
    }
);
