/**
 * ${project.alias}
 * Copyright 2014 Baidu Inc. All rights reserved.
 * 
 * @ignore
 * @file 扩展配置入口
 * @author ${developer.name}(${developer.email})
 */
define(
    function (require) {
        return {
            enable: function () {
                require('./extension/util').enable();
                require('./extension/ajax').enable();
                require('./extension/mvc').enable();
                require('./extension/ui').enable();
                // 如果有其它扩展模块，在此对应添加`enable()`的调用
            }
        };
    }
);
