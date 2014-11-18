/**
 * <%-: project.alias %>
 * Copyright 2014 Baidu Inc. All rights reserved.
 *
 * @ignore
 * @file 全局数据的数据管理类
 * @author <%-: developer.name %>(<%- developer.email %>)
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
         * @extends common.RequestManager
         * @constructor
         */
        function GlobalData() {
            RequestManager.apply(this, arguments);
        }

        util.inherits(GlobalData, RequestManager);

        var user = {};
        var system = {};


        function toMap(list, inverted) {
            var map = {};
            u.each(
                list,
                function (item) {
                    if (inverted) {
                        map[item.text] = item.value;
                    }
                    else {
                        map[item.value] = item.text;
                    }
                }
            );
            return map;
        }

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
         * 获取User数据
         *
         * @return {er.meta.Promise}
         */
        GlobalData.prototype.getUser = function () {
            // 已经加载过的就直接回缓存
            if (u.isEmpty(user)) {
                return this.loadUser();
            }
            else {
                return require('er/Deferred').resolved(user);
            }
        };

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
                    url: '/user'
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
         * 获取系统常量数据
         *
         * @return {er.meta.Promise}
         */
        GlobalData.prototype.getSystem = function () {
            // 已经加载过的就直接回缓存
            if (u.isEmpty(system)) {
                return this.loadSystem();
            }
            else {
                return require('er/Deferred').resolved(system);
            }
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
                    url: '/system'
                }
            );
            return loading.then(
                function (systemInfo) {
                    u.each(
                        systemInfo,
                        function (value, key) {
                            system[key] = value;
                            // `sysVariables`是特殊的，看着`text`和`value`符合语义，
                            // 但实际上是以`text`为键，`value`为值，与其它的不一样
                            system[key + 'Map'] =
                                toMap(value, key === 'sysVariables');
                        }
                    );
                    return system;
                }
            );
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


        GlobalData.prototype.isSubUser = function () {
            return user.subUserInfoId !== 0;
        };

        GlobalData.prototype.getDefaultChannel = function () {
            var channel = user.defaultInfo.defaultChannel;
            return u.extend({id: parseInt(channel.value, 10)}, channel);
        };

        GlobalData.prototype.getDefaultCompany = function () {
            var company = user.defaultInfo.defaultCompany;
            return u.extend({id: parseInt(company.value, 10)}, company);
        };

        GlobalData.prototype.getDefaultOrder = function () {
            var order = user.defaultInfo.defaultOrder;
            return order;
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
         * 更新系统时间戳
         *
         * @param {Date} timeStamp 系统时间
         */
        GlobalData.prototype.updateTimeStamp = function (timeStamp) {
            system.timeStamp = timeStamp;
        };

        /**
         * 获取当前用户的列表每页条目数
         *
         * @return {number}
         */
        GlobalData.prototype.getPageSize = function () {
            return user.pageSize;
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
                {pageSize: pageSize},
                {
                    method: 'PUT',
                    url: '/users/current/pageSize'
                }
            );

            return updating.then(
                function () {
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
        var RequestStrategy = require('./RequestStrategy');
        instance.setRequestStrategy(new RequestStrategy());

        GlobalData.getInstance = function () {
            return instance;
        };

        return GlobalData;
    }
);
