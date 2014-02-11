/**
 * ${project.alias}
 * Copyright 2014 Baidu Inc. All rights reserved.
 *
 * @ignore
 * @file ${description}只读页
 * @author ${developer.name}(${developer.email})
 */
define(
    function (require) {
        var util = require('er/util');
        var config = require('./config');
        var ReadAction = require('ub-ria/ReadAction');

        /**
         * ${description}表单
         *
         * @extends ub-ria.ReadAction
         * @constructor
         */
        function ${actionType}() {
            ReadAction.apply(this, arguments);
        }

        util.inherits(${actionType}, ReadAction);

        /**
         * 当前Action的分组名称
         *
         * @type {string}
         * @override
         */
        // TODO: 必须设置这个值，根据系统的导航条进行设置
        ${actionType}.prototype.group = 'unknown';

        /**
         * 当前Action负责的实体的描述名称
         *
         * @type {string}
         * @override
         */
        ${actionType}.prototype.entityDescription = config.description;

        /**
         * 视图类型
         *
         * @type {Function}
         * @override
         */
        ${actionType}.prototype.viewType = require('./${viewType}');

        /**
         * 数据模型类型
         *
         * @type {function}
         * @override
         */
        ${actionType}.prototype.modelType = require('./${modelType}');

        return ${actionType};
    }
);
