/**
 * <%-: project.alias %>
 * Copyright 2014 Baidu Inc. All rights reserved.
 *
 * @ignore
 * @file 全局遮罩层
 * @author <%-: developer.name %>(<%- developer.email %>)
 */
define(
    function (require) {
        var timer = null;

        return {
            show: function () {
                if (timer) {
                    clearTimeout(timer);
                }

                timer = setTimeout(
                    function () {
                        document.getElementById('global-mask').className = '';
                    },
                    200
                );
            },
            hide: function () {
                if (timer) {
                    clearTimeout(timer);
                }

                document.getElementById('global-mask').className = 'hide';
            }
        };
    }
);
