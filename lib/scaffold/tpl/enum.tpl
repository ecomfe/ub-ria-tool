/**
 * <%-: project.alias %>
 *
 *
 * @file <%-: description %>模块枚举
 * @namespace <%-: entity %>.enum
 * @author {<%-: developer.name %>(<%- developer.email %>)}
 */
define(
    function (require) {
        var Enum = require('er/Enum');

        /**
         * @namespace <%-: entity %>.enum
         */
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
            { alias: 'REMOVED', text: '删除', value: 0 },
            /**
             * @property {number} [NORMAL=1]
             *
             * 启用
             */
            { alias: 'NORMAL', text: '启用', value: 1 }
        );
        // TODO: 如果状态与通用的状态相同，可修改为：
        // exports.Status = require('common/enum').Status;

        return exports;
    }
);
