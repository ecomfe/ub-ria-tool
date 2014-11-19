/**
 * ${project.alias}
 * Copyright 2014 Baidu Inc. All rights reserved.
 *
 * @file Ioc Action 组装工厂类
 * @class common.IoCActionFactory
 * @author ${developer.name}(${developer.email})
 */
define(
    function (require) {
        var u = require('common/util');
        var Deferred = require('er/Deferred');
        var ioc = require('common/ioc');

        var exports = {};

        /**
         * @param {string} actionComponent action组件名
         * @param {Object} options 相关配置
         * @param {boolean} [options.noSchema=false] 模块没有`schema`信息，通常只有列表的模块会这样
         * @constructs
         */
        exports.constructor = function (actionComponent, options) {
            options = options || {};
            this.actionComponent = actionComponent;
            this.noSchema = options.noSchema || false;
        };

        /**
         * 获取视图名称
         *
         * @method common.IoCActionFactory.prototype.getViewName
         * @param {er.meta.ActionContext} actionContext Action的执行上下文
         * @return {string}
         */
        exports.getViewName = function (actionContext) {
            var parts = u.compact(actionContext.url.toString().split('/'));

            var pageType = parts[parts.length - 1];
            if (pageType === 'create' || pageType === 'update') {
                parts[parts.length - 1] = 'form';
            }

            return u.map(parts, u.dasherize).join('-');
        };

        /**
         * 创建一个Action实例
         *
         * @method common.IoCActionFactory.prototype.createRuntimeAction
         * @param {er.meta.ActionContext} actionContext Action的执行上下文
         * @return {er.Promise}
         */
        exports.createRuntimeAction = function (actionContext) {
            var deferred = new Deferred();
            ioc.getComponent(this.actionComponent, deferred.resolver.resolve);
            return deferred.promise.then(u.bind(this.buildAction, this, actionContext));
        };

        /**
         * 进行Action组装工作
         *
         * @method common.IoCActionFactory.prototype.buildAction
         * @param {er.meta.ActionContext} actionContext Action的执行上下文
         * @param {er.Action} action 待组装的`Action`实例
         * @return {er.Action}
         */
        exports.buildAction = function (actionContext, action) {
            action.view.name = this.getViewName(actionContext);
            return action;
        };

        var ActionFactory = require('eoo').create(exports);

        return ActionFactory;
    }
);
