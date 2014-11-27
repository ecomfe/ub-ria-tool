/**
 * ${project.alias}
 *
 *
 * @ignore
 * @file Session信息存储模块
 * @author ${developer.name}(${developer.email})
 */
define(
    function (require) {
        /**
         * Session信息存储类，用于存放在各页面间需要共享的数据
         *
         * @class common.Session
         */
        var exports = {};

        exports.constructor = function () {
            this.store = {};
        };

        /**
         * 获取对应值
         *
         * @method common.Session#get
         *
         * @param {string} key 键名
         * @return {Mixed}
         */
        exports.get = function (key) {
            var result = this.store[key];

            if (!result) {
                return undefined;
            }

            if (result.once) {
                this.remove(key);
            }

            return result.value;
        },

        /**
         * 设置对应值
         *
         * @method common.Session#set
         *
         * @param {string} key 键名
         * @param {Mixed} value 对应的值
         */
        exports.set = function (key, value) {
            this.store[key] = {value: value};
        },

        /**
         * 设置一个只能读取一次的值
         *
         * @method common.Session#once
         *
         * @param {string} key 键名
         * @param {Mixed} value 对应的值
         */
        exports.once = function (key, value) {
            this.store[key] = {
                value: value,
                once: true
            };
        };

        /**
         * 删除对应值
         *
         * @param {string} key 键名
         * @return {boolean} 如果确实删除的内容则返回`true`
         */
        exports.remove = function (key) {
            var result = this.store[key];
            this.store[key] = null;

            return !!result;
        };

        var Session = require('eoo').create(exports);
        return Session;
    }
);
