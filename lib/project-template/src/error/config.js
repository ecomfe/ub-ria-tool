/**
 * ${project.alias}
 * Copyright 2014 Baidu Inc. All rights reserved.
 * 
 * @ignore
 * @file 错误模块配置
 * @author ${developer.name}(${developer.email})
 */
define(
    function (require) {
        var u = require('underscore');

        // 通用错误页预加载，这样保证网络断掉也还能到这个页
        require('./GenericError');

        var actions = [
            {
                path: '/404',
                type: 'error/NotFound',
                title: '无法找到页面'
            },
            {
                path: '/400',
                type: 'error/GenericError',
                title: '出现未知问题'
            }
        ];

        var controller = require('er/controller');
        u.each(actions, controller.registerAction);
    }
);
