/**
 * ${project.alias}
 * Copyright 2014 Baidu Inc. All rights reserved.
 *
 * @file AJAX模块扩展及配置
 * @author ${developer.name}(${developer.email})
 */
define(
    function (require) {
        var u = require('underscore');
        var ajax = require('er/ajax');

        /**
         * 设置AJAX的默认配置
         *
         * @ignore
         */
        function setDefaultConfig() {
            // RIA系统的前后端接口应该有完善的缓存设置，因此默认开启GET请求的缓存
            ajax.config.cache = true;
            // 默认超时15秒，用于调试时可适当降低
            ajax.config.timeout = 15 * 1000;
            // 默认编码为utf-8
            ajax.config.charset = 'utf-8';
        }

        /**
         * 开启`contentType`属性简写功能
         *
         * @ignore
         */
        function enableContentTypeShortcut() {
            var CONTENT_TYPE_ALIAS = {
                json: 'application/json'
            };

            // 自动转换`contentType`
            ajax.hooks.beforeExecute = function (options) {
                if (options.contentType &&
                    CONTENT_TYPE_ALIAS.hasOwnProperty(options.contentType)
                ) {
                    options.contentType =
                        CONTENT_TYPE_ALIAS[options.contentType];
                }
            };
        }

        /**
         * 启用CSRF功能
         *
         * @ignore
         */
        function enableXSRF() {
            // 为请求带上CSRF Token
            var GlobalData = require('../GlobalData');
            GlobalData.getInstance().getUser().then(
                function (user) {
                    ajax.hooks.beforeSend = function (xhr, options) {
                        var method = options.method.toUpperCase();
                        if (user.sessionToken &&
                            (method === 'POST' || method === 'PUT')
                        ) {
                            xhr.setRequestHeader('X-Session-Token', user.sessionToken);
                        }
                    };
                }
            );
        }

        function enableTimeUpdate() {
            var GlobalData = require('../GlobalData');
            ajax.hooks.afterReceive = function (xhr) {
                var date = xhr.getResponseHeader('date');
                GlobalData.getInstance().updateTimeStamp(new Date(date));
            };
        }

        /**
         * 处理全局AJAX错误
         *
         * @ignore
         */
        function handleGlobalError() {
            var errorCodes = {
                '403': {
                    name: 'not-authorized',
                    title: '登录超时',
                    message: '系统登录超时，请重新登录再试。',
                    handler: function () {
                        // TODO: 实现后端返回403，弹出对话框用户确认后的操作，
                        // 一般是返回首页
                        var baseURL = window.DEBUG
                            ? 'index-debug.html'
                            : 'index.html';
                        location.href = baseURL + location.hash;
                    }
                },
                '500': {
                    name: 'server-error',
                    title: '系统错误',
                    message: '系统发生错误，请稍后再试。'
                }
            };

            var hasDialog = false;

            function clearDialogReference() {
                hasDialog = false;
            }

            ajax.on(
                'fail',
                function globalAjaxFail(error) {
                    // 有些请求是后台跑的，比如每5秒来一次的轮询，
                    // 这种请求如果出错了也弹窗，会极大地影响用户体验，
                    // 因此在请求配置里加上`background = true`来排除全局错误的处理
                    if (error.options.background) {
                        return;
                    }

                    // 如果已经弹着一个窗了，就不要再弹了，免得蛋疼
                    if (hasDialog) {
                        return;
                    }

                    var config = errorCodes[error.xhr.status];
                    if (config) {
                        hasDialog = true;
                        // 避免还没登录就依赖`esui/Dialog`拉一大堆东西
                        window.require(
                            ['esui/Dialog'],
                            function (Dialog) {
                                var options = {
                                    title: config.title,
                                    content: config.message
                                };
                                var dialog = Dialog.alert(options);
                                if (config.handler) {
                                    dialog.on('ok', config.handler);
                                    dialog.on('ok', clearDialogReference);
                                    dialog.on('close', clearDialogReference);
                                }
                            }
                        );
                    }
                }
            );
        }

        function enable() {
            setDefaultConfig();
            enableContentTypeShortcut();
            enableXSRF();
            enableTimeUpdate();
            handleGlobalError();
        }

        return {
            enable: u.once(enable)
        };
    }
);
