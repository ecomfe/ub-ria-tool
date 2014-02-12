/**
 * <%-: project.alias %>
 * Copyright 2014 Baidu Inc. All rights reserved.
 *
 * @ignore
 * @file <%-: description %>列表
 * @author <%-: developer.name %>(<%- developer.email %>)
 */
define(
    function (require) {
        var util = require('er/util');
        var config = require('./config');
        var ListAction = require('ub-ria/ListAction');

        /**
         * <%-: description %>列表
         *
         * @extends ub-ria.ListAction
         * @constructor
         */
        function <%-: actionType %>() {
            ListAction.apply(this, arguments);
        }

        util.inherits(<%-: actionType %>, ListAction);

        /**
         * 当前Action的分组名称
         *
         * @type {string}
         * @override
         */
        // TODO: 必须设置这个值，根据系统的导航条进行设置
        <%-: actionType %>.prototype.group = 'unknown';

        /**
         * 当前Action负责的实体的描述名称
         *
         * @type {string}
         * @override
         */
        <%-: actionType %>.prototype.entityDescription = config.description;

        /**
         * 数据模型类型
         *
         * @type {Function}
         * @override
         */
        <%-: actionType %>.prototype.modelType = require('./<%- modelModule %>');

        /**
         * 视图类型
         *
         * @type {Function}
         * @override
         */
        <%-: actionType %>.prototype.viewType = require('./<%- viewModule %>');
        
        return <%-: actionType %>;
    }
);
