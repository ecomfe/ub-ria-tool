/**
 * <%-: project.alias %>
 * Copyright 2013 Baidu Inc. All rights reserved.
 *
 * @ignore
 * @file Action组装工厂
 * @author <%-: developer.name %>(<%- developer.email %>)
 */
define(
    function (require) {
        var u = require('common/util');
        var Deferred = require('er/Deferred');

        var proto = {};

        /**
         * @class ActionFactory
         *
         * 用于加载`Action`需要的模块并组装的工厂
         *
         * @param {string} actionModule Action对应的模块名
         * @param {Object} options 相关配置
         * @param {string} [options.entityName] 实体名称，默认使用模块名的第一部分
         * @param {string} [options.backendEntityName] 后端的实体名称，默认与前端实体名称相同
         * @param {boolean} [options.noSchema=false] 模块没有`schema`信息，通常只有列表的模块会这样
         * @constructor
         */
        proto.constructor = function (actionModule, options) {
            options = options || {};
            this.actionModule = actionModule;

            this.entityName = options.entityName || actionModule.split('/')[0];
            this.backendEntityName = options.backendEntityName || this.entityName;
            this.noSchema = options.noSchema || false;
        };

        /**
         * 获取业务模块名
         *
         * @return {string}
         */
        proto.getBaseModuleName = function () {
            return this.actionModule.replace(/\/[^\/]*$/, '');
        };

        /**
         * 获取需要的模块列表
         *
         * @return {string[]}
         */
        proto.getModules = function () {
            var baseModuleName = this.getBaseModuleName();
            return [
                this.actionModule, // Action
                this.actionModule + 'Model', // Model
                this.actionModule + 'View', // View
                baseModuleName + '/Data', // Data
                'common/RequestStrategy', // RequestStrategy
                'common/GlobalData', // GlobalData
                'common/session' // Session
            ];
        };

        /**
         * 获取视图名称
         *
         * @param {er.meta.ActionContext} actionContext Action的执行上下文
         * @return {string}
         */
        proto.getViewName = function (actionContext) {
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
         * @param {er.meta.ActionContext} actionContext Action的执行上下文
         */
        proto.createRuntimeAction = function (actionContext) {
            // 根据模块命名规则来加载各种东西
            var modules = this.getModules();

            return Deferred.require(modules)
                .then(u.bind(this.buildAction, this, actionContext));
        };

        /* jshint maxparams: 8 */

        /**
         * 进行Action组装工作
         *
         * @param {Action} action 已经完成组装的`Action`实例
         */
        proto.buildAction = function () {
            var actionContext = arguments[0];
            var Action = arguments[1];
            var Model = arguments[2];
            var View = arguments[3];
            var Data = arguments[4];
            var RequestStrategy = arguments[5];
            var GlobalData = arguments[6];
            var session = arguments[7];

            var action = new Action();
            action.model = new Model();
            // 本模块的`Data`实例
            var data = new Data();
            var strategy = new RequestStrategy(this.entityName, this.backendEntityName);
            data.setRequestStrategy(strategy);
            action.model.setData(data);
            if (action.model.setGlobalData) {
                action.model.setGlobalData(GlobalData.getInstance());
            }
            action.view = new View();
            action.view.name = this.getViewName(actionContext);

            if (action.setSession) {
                action.setSession(session);
            }

            return action;
        };

        var ActionFactory = require('eoo').create(proto);

        return ActionFactory;
    }
);
