/**
 * ${project.alias}
 * Copyright 2014 Baidu Inc. All rights reserved.
 *
 * @ignore
 * @file MVC各组件的扩展
 * @author ${developer.name}(${developer.email})
 */
define(
    function (require) {
        var u = require('underscore');

        function enable() {
            // TODO: 可在此处扩展ER各模块，比如重写`controller.checkAuthority`
            // 实现自己的权限验证方式等
        }

        return {
            enable: u.once(enable)
        };
    }
);
