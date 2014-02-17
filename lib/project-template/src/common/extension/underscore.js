/**
 * ${project.alias}
 * Copyright 2014 Baidu Inc. All rights reserved.
 * 
 * @ignore
 * @file underscore扩展
 * @author ${developer.name}(${developer.email})
 */
define(
    function (require) {
        var u = require('underscore');

        function enable() {
            // 将框架的工具方法集中起来
            u.extend(u, require('ub-ria/util'));

            // TODO: 可在这里向`underscore`对象添加需要的工具方法
        }

        return {
            enable: u.once(enable)
        };
    }
);
