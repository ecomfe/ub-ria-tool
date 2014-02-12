/**
 * <%-: project.alias %>
 * Copyright 2014 Baidu Inc. All rights reserved.
 * 
 * @ignore
 * @file <%-: description %>模块枚举
 * @author {<%-: developer.name %>(<%- developer.email %>)}
 */
define(
    function (require) {
        var Enum = require('er/Enum');

        var exports = {};
        
        /**
         * <%-: description %>状态
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
        // TODO: 如果状态与通用的状态相同，可修改为：
        // exports.Status = require('common/enum').Status;

        return exports;
    }
);
