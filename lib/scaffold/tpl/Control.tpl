/**
 * ${project.alias}
 * Copyright 2013 Baidu Inc. All rights reserved.
 *
 * @ignore
 * @file ${type}控件
 * @author ${developer.name}(${developer.email})
 */
define(
    function (require) {
        var lib = require('esui/lib');
        var ${baseType} = require('${baseTypeModuleID}');

        /**
         * ${type}控件
         *
         * @extends ${baseTypeFullName}
         * @param {Object} [options] 初始化参数
         * @constructor
         */
        function ${type}(options) {
            ${baseType}.apply(this, arguments);
        }

        /**
         * 控件类型，始终为`"${type}"`
         *
         * @type {string}
         * @readonly
         * @override
         */
        ${type}.prototype.type = '${type}';

        /**
         * 默认属性
         *
         * @type {Object}
         */
        ${type}.defaultProperties = {
            // TODO: 如不需要自行移除
        };

        /**
         * 创建主元素
         *
         * @return {HTMLElement}
         * @protected
         * @override
         */
        ${type}.prototype.createMain = function () {
            // TODO: 如果不需要自行移除
            return document.createElement('div');
        };

        /**
         * 初始化参数
         *
         * @param {Object} [options] 构造函数传入的参数
         * @protected
         * @override
         */
        ${type}.prototype.initOptions = function (options) {
            var properties = {};
            lib.extend(properties, options);
            this.setProperties(properties);
        };

        /**
         * 初始化DOM结构
         *
         * @protected
         * @override
         */
        ${type}.prototype.initStructure = function () {
            // TODO: 如果不需要自行移除
        };

        /**
         * 渲染自身
         *
         * @protected
         * @override
         */
        ${type}.prototype.repaint = require('esui/painters').createRepaint(
            ${baseType}.prototype.repaint
        );

        lib.inherits(${type}, ${baseType});
        require('esui').register(${type});
        return ${type};
    }
);
