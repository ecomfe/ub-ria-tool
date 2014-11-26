/**
 * ${project.alias}
 *
 *
 * @file 系统通用枚举
 * @author ${developer.name}(${developer.email})
 */
define(
    function (require) {
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
            {alias: 'REMOVED', text: '删除'},
            /**
             * @property {number} [NORMAL=1]
             *
             * 启用
             */
            {alias: 'NORMAL', text: '启用'}
        );

        return exports;
    }
);
