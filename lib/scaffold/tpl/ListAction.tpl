/**
 * ${project.alias}
 * Copyright 2014 Baidu Inc. All rights reserved.
 *
 * @ignore
 * @file ${description}列表
 * @author ${developer.name}(${developer.email})
 */
define(
    function (require) {
        var util = require('er/util');
        var config = require('./config');
        var ListAction = require('common/ListAction');

        /**
         * ${description}列表
         *
         * @extends common.ListAction
         * @constructor
         */
        function ${actionType}() {
            ListAction.apply(this, arguments);
        }

        util.inherits(${actionType}, ListAction);

        /**
         * 当前Action的分组名称
         *
         * @type {string}
         * @readonly
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
         * 数据模型类型
         *
         * @type {function}
         * @override
         */
        ${actionType}.prototype.modelType = require('./ListModel');

        /**
         * 视图类型
         *
         * @type {function}
         * @override
         */
        ${actionType}.prototype.viewType = require('./ListView');

        /**
         * 默认查询参数
         *
         * @param {Object}
         * @override
         */
        ${actionType}.prototype.defaultArgs = {
            // TODO: 配置默认的查询参数，避免URL里有太多参数，
            // 这里参数默认值和“不把参数传给后端时后端使用的值”相同，
            // 如无需要就删除这一段
            orderBy: 'displayOrder',
            order: 'asc'
        };
        
        return ${actionType};
    }
);
