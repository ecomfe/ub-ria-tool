/**
 * ${project.alias}
 *
 *
 * @ignore
 * @file 全局数据的数据管理类
 * @author ${developer.name}(${developer.email})
 */
define(
    function (require) {
        var u = require('./util');

        /**
         * 全局数据的数据管理类
         *
         * @class common.GlobalData
         *
         * 在此类中，除了加载用户信息和系统信息外，还可包括与其它平台的帐户交互等，
         * 多个模块会共享的全局的数据处理均可在此模块中实现
         *
         * @extends ub-ria.RequestManager
         */
        var exports = {};

        exports.constructor = function () {
            this.$super(arguments);
            this.user = {};
            this.system = {};
        };

        /**
         * 初始化权限
         *
         * @method common.GlobalData#initPermission
         *
         * @param {string[]} data 权限列表
         * @private
         */
        exports.initPermission = function (data) {
            var permission = this.getPermissionProvider();
            u.each(
                data,
                function (permissionName) {
                    var item = {};
                    item[permissionName] = true;
                    permission.add(item);
                }
            );
        };

        /**
         * 获取当前用户数据
         *
         * @method common.GlobalData#getUser
         *
         * @return {er.meta.Promise}
         */
        exports.getUser = function () {
            // 已经加载过的就直接回缓存
            if (u.isEmpty(this.user)) {
                return this.loadUser();
            }

            return require('er/Deferred').resolved(this.user);
        };

        /**
         * 初始化用户信息
         *
         * @method common.GlobalData#initUserInfo
         *
         * @param {Object} userInfo 后端返回的用户信息
         * @return {Object} 前端用户信息对象
         * @protected
         */
        exports.initUserInfo = function (userInfo) {
            u.each(
                userInfo,
                function (value, key) {
                    // 权限特殊处理
                    if (key === 'authorityList') {
                        this.initPermission(value);
                    }
                    else {
                        this.user[key] = value;
                    }
                },
                this
            );
            return this.user;
        };

        /**
         * 加载当前用户信息
         *
         * @method common.GlobalData#loadUser
         *
         * @return {er.meta.Promise}
         * @protected
         */
        exports.loadUser = function () {
            var loading = this.request(
                'global/user',
                null,
                {
                    method: 'GET',
                    url: '/user'
                }
            );
            return loading.then(u.bind(this.initUserInfo, this));
        };

        /**
         * 获取系统常量数据
         *
         * @method common.GlobalData#getSystem
         *
         * @return {er.meta.Promise}
         */
        exports.getSystem = function () {
            // 已经加载过的就直接回缓存
            if (u.isEmpty(this.system)) {
                return this.loadSystem();
            }

            return require('er/Deferred').resolved(this.system);
        };

        /**
         * 初始化系统信息
         *
         * @method common.GlobalData#initSystemInfo
         *
         * @param {Object} systemInfo 后端提供的系统信息
         * @return {Object} 前端的系统信息对象
         * @protected
         */
        exports.initSystemInfo = function (systemInfo) {
            u.each(
                systemInfo,
                function (value, key) {
                    this.system[key] = value;
                },
                this
            );
            return this.system;
        };

        /**
         * 加载系统常量信息
         *
         * @method common.GlobalData#loadSystem
         *
         * @return {er.meta.Promise}
         * @protected
         */
        exports.loadSystem = function () {
            var loading = this.request(
                'global/system',
                null,
                {
                    method: 'GET',
                    url: '/system'
                }
            );
            return loading.then(u.bind(this.initSystemInfo, this));
        };

        /**
         * 获取当前用户的列表每页条目数
         *
         * @method common.GlobalData#getPageSize
         *
         * @return {number}
         */
        exports.getPageSize = function () {
            return this.user.pageSize;
        };

        /**
         * 更新当前用户的列表每页条目数
         *
         * @method common.GlobalData#updatePageSize
         *
         * @param {number} pageSize 每页条目数
         * @return {er.meta.Promise}
         */
        exports.updatePageSize = function (pageSize) {
            var updating = this.request(
                'global/pageSize',
                {pageSize: pageSize},
                {
                    method: 'PUT',
                    url: '/users/current/pageSize'
                }
            );

            var update = function () {
                this.user.pageSize = pageSize;
                return pageSize;
            };

            return updating.then(u.bind(update, this));
        };

        /**
         * @override
         */
        exports.dispose = function () {
            // 因为要单例控制，因此不销毁
        };

        var oo = require('eoo');

        oo.defineAccessor(exports, 'permissionProvider');

        var RequestManager = require('ub-ria/mvc/RequestManager');
        var GlobalData = oo.create(RequestManager, exports);

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

        return GlobalData;
    }
);
