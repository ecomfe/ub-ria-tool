/**
 * ${project.alias}
 * Copyright 2014 Baidu Inc. All rights reserved.
 * 
 * @ignore
 * @file ${description}模块枚举
 * @author {${developer.name}(${developer.email})}
 */
define(
    function () {
        var Enum = require('er/Enum');

        var exports = {};

        // TODO: 如果状态与通用的状态相同，可修改为：
        // exports.Status = require('common/enum').Status;
        /**
         * ${description}状态
         *
         * @enum
         */
        exports.Status = new Enum(
            { alias: 'REMOVE', text: '删除' },
            { alias: 'RESTORE', text: '启用' }
        );

        return exports;
    }
);
