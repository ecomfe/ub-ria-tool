/**
 * <%-: project.alias %>
 * Copyright 2013 Baidu Inc. All rights reserved.
 *
 * @ignore
 * @file 表单验证规则对象
 * @author <%-: developer.name %>(<%- developer.email %>)
 */
define(
    function (require) {
        var baseRule = require('ub-ria/mvc/rule');
        var util = require('common/util');

        return util.deepClone(baseRule);
    }
);
