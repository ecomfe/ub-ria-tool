/**
 * <%-: project.alias %>
 * Copyright 2014 Baidu Inc. All rights reserved.
 *
 * @file <%-: description %>只读页
 * @exports <%-: entity %>.<%-: actionType %>
 * @author <%-: developer.name %>(<%- developer.email %>)
 */
define(
    function (require) {
        /**
         * @class <%-: entity %>.<%-: actionType %>
         * @extends common.ReadAction
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

        var ReadAction = require('common/ReadAction');
        var <%-: actionType %> = require('eoo').create(ReadAction, exports);
        return <%-: actionType %>;
    }
);
