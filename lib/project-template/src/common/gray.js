/**
 * <%-: project.alias %>
 * Copyright 2014 Baidu Inc. All rights reserved.
 *
 * @ignore
 * @file 灰度脚本
 * @author <%-: developer.name %>(<%- developer.email %>)
 */
define(
    // 灰度脚本是上线时不和主脚本打包在一起的一个小脚本，
    // 用于一些实验性的功能以及需要在线时频繁变化的功能
    function (require) {
        var seed = Math.random();
        var config = require('./egg/config');

        var modules = [];
        for (var i = 0; i < config.length; i++) {
            var egg = config[i];
            if (egg.ratio >= seed) {
                modules.push('common/egg/' + egg.name);
            }
        }

        if (modules.length) {
            window.require(
                modules,
                function () {
                    for (var i = 0; i < arguments.length; i++) {
                        var egg = arguments[i];
                        if (typeof egg.enable === 'function') {
                            egg.enable();
                        }
                    }
                }
            );
        }
    }
);
