/**
 * ${project.alias}
 * Copyright 2014 Baidu Inc. All rights reserved.
 * 
 * @ignore
 * @file 通用错误页视图类
 * @author ${developer.name}(${developer.email})
 */
define(
    function (require) {
        var UIView = require('ef/UIView');
        var util = require('er/util');

        /**
         * 通用错误页视图类
         *
         * @extends ef.UIView
         * @constructor
         */
        function ErrorView() {
            UIView.apply(this, arguments);
        }

        /**
         * 控件事件配置
         *
         * @type {Object}
         * @overrides
         */
        ErrorView.prototype.uiEvents = {
            'reload:click': function () {
                this.fire('reload');
            }
        };

        util.inherits(ErrorView, UIView);
        return ErrorView;
    }
);
