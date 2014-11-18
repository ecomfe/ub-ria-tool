/**
 * <%-: project.alias %>
 * Copyright 2014 Baidu Inc. All rights reserved.
 *
 * @file 通用错误页视图类
 * @class ErrorView
 * @extends ef.UIView
 * @author <%-: developer.name %>(<%- developer.email %>)
 */
define(
    function (require) {
        var exports = {};

        /**
         * @overrides
         */
        exports.uiEvents = {
            'reload:click': function () {
                this.fire('reload');
            }
        };

        /**
         * 设置视图模板
         * @method ErrorView#.setTemplate
         * @param {String} template 模板名
         */
        exports.setTemplate = function (template) {
            this.template = template;
        };

        var UIView = require('ef/UIView');
        var ErrorView = require('eoo').create(UIView, exports);
        return ErrorView;
    }
);
