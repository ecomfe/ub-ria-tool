/**
 * ${project.alias}
 *
 *
 * @ignore
 * @file 系统入口脚本
 * @author ${developer.name}(${developer.email})
 */
define(
    function (require) {
        var u = require('./util');

        // AJAX扩展是登录时要用的，其它的扩展都确认用户登录成功后再说
        require('./extension/ajax').enable();
        require('./shim').enable();

        /**
         * 系统入口
         *
         * @class common.Main
         */
        var exports = {};

        /**
         * 开始初始化用户常量，此时已经获取用户的全部信息
         *
         * @method common.Main#initializeUserAndSystem
         *
         * @return {er.meta.Promise}
         * @private
         */
        exports.initializeUserAndSystem = function () {
            var data = this.getGlobalData();
            var Deferred = require('er/Deferred');
            return Deferred.all(data.getUser(), data.getSystem());
        };

        /**
         * 开始初始化系统其它部分，此时已经完成用户和系统常量初始化
         *
         * @method common.Main#initializeApplication
         *
         * @private
         */
        exports.initializeApplication = function () {
            // 启动系统所需要的模块
            var startDependencies = [
                'er', 'permissionProvider', 'ria', 'extension', 'indicator', 'systemConfig'
            ];

            /* jshint maxparams:10 */
            require('./ioc').getComponent(
                startDependencies,
                function (er, permission, ria, extension, indicator, config) {
                    indicator.enable();
                    extension.enable();
                    er.indexURL = getIndexURL(permission);
                    ria.start();
                }
            );
        };

        /**
         * 获取起始页URL
         *
         * @param {er.permission} permission 权限组件
         * @return {string}
         * @ignore
         */
        function getIndexURL(permission) {
            return '/';
        }

        /**
         * 跳转到首页，在用户未登录的情况下执行
         *
         * @ignore
         */
        function redirectToIndex() {
            var baseURL = window.DEBUG
                ? 'index-debug.html'
                : 'index.html';
            location.href = baseURL + location.hash;
            // 在`Promise`中，抛出异常会使其进入失败状态，
            // 一般来说跳转了就不会有下面的代码执行，这里就是防止进入成功状态
            throw new Error('Failed to redirect to index');
        }

        /**
         * 开始系统执行
         *
         * @method common.Main#start
         */
        exports.start = function () {
            // 初始化流程：
            //
            // 1. 加载当前用户信息，用户未登录会返回403，失败就跳回首页
            // 2. 初始化应用系统其它部分
            this.initializeUserAndSystem().then(u.bind(this.initializeApplication, this), redirectToIndex);
        };

        var oo = require('eoo');

        oo.defineAccessor(exports, 'globalData');

        var Main = oo.create(exports);
        return Main;
    }
);
