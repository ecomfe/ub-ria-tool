/**
 * <%-: project.alias %>
 * Copyright 2014 Baidu Inc. All rights reserved.
 *
 * @ignore
 * @file 对框架各类的扩展
 * @author <%-: developer.name %>(<%- developer.email %>)
 */
define(
    function (require) {
        return {
            enable: function () {
                require('./extension/util').enable();
                require('./extension/ajax').enable();
                require('./extension/ui').enable();

                var events = require('er/events');

                // 打印错误
                if (window.DEBUG && window.console) {
                    events.on(
                        'error',
                        function (e) {
                            var error = e.error;
                            var message = '';

                            if (!error) {
                                message = 'Invoke action.enter() causes error';
                            }
                            // 普通异常
                            else if (error.message) {
                                message = error.message;
                                if (error.stack) {
                                    message += '\n' + error.stack;
                                }
                                else {
                                    message += '\nStackTrace is not supported';
                                }
                            }
                            // 能够序列化
                            else if (window.JSON
                                && typeof JSON.stringify === 'function'
                            ) {
                                try {
                                    message =
                                        JSON.stringify(error, null, '    ');
                                }
                                catch (circularJSONError) {
                                    message = error;
                                }
                            }
                            else {
                                message = error;
                            }

                            console.error(message);
                        }
                    );
                }
            }
        };
    }
);
