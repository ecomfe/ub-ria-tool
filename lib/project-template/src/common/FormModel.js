/**
 * <%-: project.alias %>
 * Copyright 2013 Baidu Inc. All rights reserved.
 *
 * @ignore
 * @file 表单数据模型基类
 * @author <%-: developer.name %>(<%- developer.email %>)
 */
define(
    function (require) {
        var rule = require('common/rule');

        var exports = {};

        exports.constructor = function () {
            this.$super(arguments);

            this.set('rule', rule);
        };

        exports.setGlobalData = function (data) {
            this.addData('global', data);
        };

        var FormModel = require('eoo').create(require('ub-ria/mvc/FormModel'), exports);
        return FormModel;
    }
);
