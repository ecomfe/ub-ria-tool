/**
 * ${project.alias}
 * Copyright 2014 Baidu Inc. All rights reserved.
 *
 * @ignore
 * @file 全局数据的数据管理类
 * @author ${developer.name}(${developer.email})
 */
define(
    function (require) {
        var u = require('underscore');
        var util = require('er/util');
        var RequestManager = require('ub-ria/mvc/RequestManager');

        /**
         * 全局数据的数据管理类
         *
         * 在此类中，除了加载用户信息和系统信息外，还可包括与其它平台的帐户交互等，
         * 多个模块会共享的全局的数据处理均可在此模块中实现
         *
         * @extends ub-ria.mvc.RequestManager
         * @constructor
         */
        function GlobalData() {
            RequestManager.apply(this, arguments);
        }

        util.inherits(GlobalData, RequestManager);

        var user = {};
        var system = {};

        /**
         * 初始化权限
         *
         * @param {string[]} data 权限列表
         * @ignore
         */
        function initPermission(data) {
            var permission = require('er/permission');
            u.each(
                data,
                function (permissionName) {
                    var item = {};
                    item[permissionName] = true;
                    permission.add(item);
                }
            );
        }

        /**
         * 加载当前用户信息
         *
         * @return {er.meta.Promise}
         */
        GlobalData.prototype.loadUser = function () {
            var loading = this.request(
                'global/user',
                null,
                {
                    method: 'GET',
                    url: '/users/current'
                }
            );
            return loading.then(
                function (userInfo) {
                    u.each(
                        userInfo,
                        function (value, key) {
                            // 权限特殊处理
                            if (key === 'authorityList') {
                                initPermission(value);
                            }
                            else {
                                user[key] = value;
                            }
                        }
                    );
                    return user;
                }
            );
        };

        /**
         * 加载系统常量信息
         *
         * @return {er.meta.Promise}
         */
        GlobalData.prototype.loadSystem = function () {
            var loading = this.request(
                'global/system',
                null,
                {
                    method: 'GET',
                    url: '/sysWebInfo'
                }
            );
            return loading.then(
                function (systemInfo) {
                    u.extend(system, systemInfo);
                    return system;
                }
            );
        };

        /**
         * 获取用户信息
         *
         * @return {Object}
         */
        GlobalData.prototype.getUser = function () {
            return user;
        };

        /**
         * 获取用户指定属性
         *
         * @param {string} propertyName 指定属性名称
         * @return {Mixed}
         */
        GlobalData.prototype.getUserProperty = function (propertyName) {
            return user[propertyName];
        };

        /**
         * 设置用户属性，用于更新用户信息后同步
         *
         * @param {string} propertyName 指定属性名称
         * @param {Mixed} value 属性值
         */
        GlobalData.prototype.setUserProperty = function (propertyName, value) {
            user[propertyName] = value;
        };

        /**
         * 获取系统信息
         *
         * @return {Object}
         */
        GlobalData.prototype.getSystem = function () {
            return system;
        };

        /**
         * 获取系统指定属性
         *
         * @param {string} propertyName 指定属性名称
         * @return {Mixed}
         */
        GlobalData.prototype.getSystemProperty = function (propertyName) {
            return system[propertyName];
        };

        /**
         * 获取当前用户的列表每页条目数
         *
         * @return {number}
         */
        GlobalData.prototype.getPageSize = function () {
            return this.getUserProperty('pageSize');
        };

        /**
         * 更新当前用户的列表每页条目数
         *
         * @param {number} pageSize 每页条目数
         * @return {er.meta.Promise}
         */
        GlobalData.prototype.updatePageSize = function (pageSize) {
            var updating = this.request(
                'global/pageSize',
                { pageSize: pageSize },
                {
                    method: 'PUT',
                    url: '/users/current/pageSize'
                }
            );

            return updating.then(
                function (pageSize) {
                    user.pageSize = pageSize;
                    return pageSize;
                }
            );
        };

        /**
         * 销毁
         *
         * @override
         */
        GlobalData.prototype.dispose = function () {
            // 因为要单例控制，因此不销毁
        };

        var requests = {
            updatePageSize: {
                name: 'global/pageSize',
                scope: 'global',
                policy: 'abort'
            },
            loadUser: {
                name: 'global/user',
                scope: 'global',
                policy: 'abort'
            },
            loadSystem: {
                name: 'global/system',
                scope: 'global',
                policy: 'abort'
            }
        };

        u.each(
            requests,
            function (config) {
                var RequestManager = require('ub-ria/mvc/RequestManager');
                RequestManager.register(GlobalData, config.name, config);
            }
        );

        var instance = new GlobalData();

        GlobalData.getInstance = function () {
            return instance;
        };

        return GlobalData;
    }
);
