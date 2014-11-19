/**
 * ${project.alias}
 * Copyright 2014 Baidu Inc. All rights reserved.
 *
 * @ignore
 * @file 系统入口脚本
 * @author ${developer.name}(${developer.email})
 */
define(
    function (require) {
        // AJAX扩展是登录时要用的，其它的扩展都确认用户登录成功后再说
        require('common/extension/ajax').enable();

        require('common/shim').enable();

        require('common/indicator').enable();

        var GlobalData = require('./GlobalData');
        var Deferred = require('er/Deferred');

        /**
         * 开始初始化用户常量，此时已经获取用户的全部信息
         *
         * @return {er.meta.Promise}
         * @ignore
         */
        function initializeUserAndSystem() {

            var data = GlobalData.getInstance();
            return Deferred.all(data.getUser(), data.getSystem());
        }

        /**
         * 开始初始化系统其它部分，此时已经完成用户和系统常量初始化
         *
         * @ignore
         */
        function initializeApplication() {
            // 启动系统所需要的模块
            var startDependencies = [
                'er/config', 'er/permission', 'ub-ria', // 基础库
                'common/extension',  'common/config'// 各入口模块
            ];
            // 有些接口是JSON格式的，因此如果没有`JSON`实现的话，要用上json2
            // TODO: 如果不支持IE6和7，直接删除这一段，也可删除`external/json2.js`
            if (typeof JSON !== 'object') {
                startDependencies.push('js!external/json2');
            }

            /* jshint maxparams:10 */
            require(
                startDependencies,
                function (config, permission, ria, extension, commonConfig) {
                    extension.enable();
                    config.indexURL = getIndexURL(permission);
                    ria.start();
                }
            );

        }

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
         * @ignore
         */
        function start() {
            // 初始化流程：
            //
            // 1. 加载当前用户信息，用户未登录会返回403，失败就跳回首页
            // 2. 初始化应用系统其它部分
            initializeUserAndSystem().then(initializeApplication, redirectToIndex);
        }

        return {
            start: start
        };
    }
);
