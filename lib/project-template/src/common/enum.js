/**
 * ${project.alias}
 * Copyright 2014 Baidu Inc. All rights reserved.
 * 
 * @ignore
 * @file 系统配置入口
 * @author ${developer.name}(${developer.email})
 */
define(
    function () {
        var Enum = require('er/Enum');

        var exports = {};

        /**
         * 通用实体状态
         *
         * @enum
         */
        exports.Status = new Enum(
            /**
             * @property {number} [REMOVED=0]
             *
             * 删除
             */
            { alias: 'REMOVED', text: '删除' },
            /**
             * @property {number} [NORMAL=1]
             *
             * 启用
             */
            { alias: 'NORMAL', text: '启用' }
        );

        // TODO: 可以添加系统通用的枚举

        return exports;
    }
);
