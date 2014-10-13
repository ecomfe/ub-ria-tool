/**
 * <%-: project.alias %>
 * Copyright 2014 Baidu Inc. All rights reserved.
 *
 * @file <%-: description %>列表
 * @class <%-: actionType %>
 * @extends common.ListAction
 * @author <%-: developer.name %>(<%- developer.email %>)
 */
define(
    function (require) {
        var u = require('common/util');

        var exports = {};

        /**
         * @override
         */
        exports.group = 'order';

        /**
         * @override
         */
        exports.entityDescription = '广告';


        /**
        * 初始化交互行为
        *
        * @override
        */
        exports.initBehavior = function () {
            this.$super(arguments);

            //TODO: Action 初始化交互行为在这里添加，否则删除该接口
        };

        var <%-: actionType %> = require('eoo').create(require('common/ListAction'), exports);
        return <%-: actionType %>;
    }
);
