/**
 * ${project.alias}
 * Copyright 2014 Baidu Inc. All rights reserved.
 * 
 * @ignore
 * @file 通用错误页
 * @author ${developer.name}(${developer.email})
 */
define(
    function (require) {
        var BaseAction = require('ub-ria/mvc/BaseAction');
        var Model = require('er/Model');

        /**
         * 错误页通用Action
         *
         * @constructor
         * @extends ub-ria.mvc.BaseAction
         */
        function ErrorAction() {
            BaseAction.apply(this, arguments);
        }

        require('er/util').inherits(ErrorAction, BaseAction);
        
        /**
         * 创建数据模型
         *
         * @return {er.Model}
         */
        ErrorAction.prototype.createModel = function () {
            var model = new Model();
            model.set('indexURL', require('er/config').indexURL);
            return model;
        };

        /**
         * 初始化行为
         *
         * @overrides
         */
        ErrorAction.prototype.initBehavior = function () {
            this.view.on('reload', this.reload, this);
        };

        return ErrorAction;
    }
);
