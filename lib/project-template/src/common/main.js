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

        var Deferred = require('er/Deferred');
        var GlobalData = requrie('./GlobalData');
        var globalData = new GlobalData();

        /**
         * 开始初始化系统常量和用户常量，此时已经获取用户的全部信息
         *
         * @return {er.meta.Promise}
         * @ignore
         */
        function initializeUserAndSystem() {
            return Deferred.all(globalData.loadUser(), globalData.loadSystem());
        }

        /**
         * 加载打包层
         *
         * @return {er.meta.Promise}
         * @ignore
         */
        function loadStartupScripts() {
            // 脚本合并层，这一层会在用户和系统信息加载完后，ER开始工作前加载。
            // 在开发时，这一层是空的没有任何内容；
            // 当上线时，使用模块合并的功能将各组件和`startup`目录下的`.js`文件打包
            var startupList = [
                // 打包用模块为：
                //
                // - `ui`：用于打包所有控件，建议将ESUI完整与之打包，可考虑加入业务控件
                // - `ria`：用于打包MVC及RIA相关模块，建议将EF、ER和UB-RIA与之打包
                // - `biz`：用于打包业务模块，建议将常用的业务模块均与之打包
                //
                // 也可自行在`startup`下增加新的模块来实现更完善的打包策略，
                // 添加新的打包模块后记得在此处也加上对应的模块引用
                'startup/ui', 'startup/ria', 'startup/biz.js'
                // TODO: 在此添加所有`startup`目录下的`.js`文件
            ];
            return Deferred.require(startupList);
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
                'common/extension', 'common/config' // 各入口模块
            ];
            // 有些接口是JSON格式的，因此如果没有`JSON`实现的话，要用上json2
            // TODO: 如果不支持IE6和7，直接删除这一段，也可删除`common/json2.js`
            if (typeof JSON !== 'object') {
                startDependencies.push('js!common/json2');
            }

            require(
                startDependencies,
                function (config, permission, ria, extension) {
                    extension.enable();
                    config.indexURL = getIndexURL(permission);
                    ria.start();
                }
            );
        }

        /**
         * 获取起始页URL
         *
         * @param {er.permission} 权限组件
         * @return {string}
         * @ignore
         */
        function getIndexURL(permission) {
            // TODO: 根据权限返回起始页路径
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
            // 1. 并行加载：
            //     - 当前用户信息，用户未登录会返回403，失败就跳回首页
            //     - 系统静态资源
            //     - 用户处理模块和系统常量模块
            // 2. 开始用户和系统信息初始化
            // 3. 加载打包层
            // 4. 初始化应用系统其它部分
            initializeUserAndSystem()
                .then(loadStartupScripts, redirectToIndex)
                .then(initializeApplication);
        }

        return {
            start: start
        };
    }
);
