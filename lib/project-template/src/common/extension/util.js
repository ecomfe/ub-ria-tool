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
        var moment = require('moment');
        require('moment/lang/zh-cn');

        function enable() {
            // 修改`moment`的语言为中文，这样可以用来格式化出“周一”之类的
            // 具体语言定义参考[github](http://git.io/mqgjSw)
            moment.lang('zh-cn');

            // 将框架的工具方法集中起来
            u.extend(u, require('ub-ria/util'));

            // TODO: 可在这里向`underscore`对象添加需要的工具方法
        }

        return {
            enable: u.once(enable)
        };
    }
);
