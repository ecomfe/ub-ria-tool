/**
 * ${project.alias}
 * Copyright 2014 Baidu Inc. All rights reserved.
 *
 * @ignore
 * @file ${description}列表数据模型类
 * @author ${developer.name}(${developer.email})
 */
define(
    function (require) {
        var u = require('underscore');
        var util = require('er/util');
        var ListModel = require('common/ListModel');
        var Data = require('./Data');

        /**
         * ${description}列表数据模型类
         *
         * @extends common.ListModel
         * @constructor
         */
        function ${modelType}() {
            ListModel.apply(this, arguments);
            this.addData(new Data());
        }

        util.inherits(${modelType}, ListModel);

        /**
         * 状态迁移表。
         *
         * @type {Object[]}
         * @override
         */
        // TODO: 如果只有“恢复”和“删除”两个状态且符合以下配置，则删除这个属性
        ListModel.prototype.statusTransitions = [
            { status: 0, deny: [0] },
            { status: 1, deny: [1] }
        ];

        // TODO: 如果没有状态属性，移除下面代码
        var statuses = require('./enum').Status.toArray();
        statuses.unshift({ text: '全部', value: '' });

        var datasource = require('er/datasource');
        /**
         * 数据源配置
         *
         * @type {Object}
         * @override
         */
        ${modelType}.prototype.datasource = {
            statuses: datasource.constant(statuses),
            // 所需权限
            canCreate: datasource.permission('${entity | const}_NEW'),
            canModify: datasource.permission('${entity | const}_MODIFY'),
            canBatchModify: datasource.permission('${entity |const}_STATUS_MODIFY')
        };

        /**
         * 准备数据
         *
         * @override
         */
        ${modelType}.prototype.prepare = function () {
            // TODO: 下面的代码为每一项添加操作列的权限，如果没有权限需求则删掉这个方法
            var canModify = this.get('canModify');
            u.each(
                this.getAllItems(),
                function (item) {
                    item.canModify = canModify;
                }
            );
        };

        /**
         * 获取请求后端的参数
         *
         * @return {Object}
         * @override
         */
        ${modelType}.prototype.getQuery = function () {
            var query = ListModel.prototype.getQuery.apply(this, arguments);
            // TODO: 添加请求后端时所需要用到的参数，默认包含：
            // `keyword`、`status`、`order`、`orderBy`、`pageNo`共5个参数
            // 如有其它参数则需向`query`对象添加属性，无额外参数则删掉这个方法。
            // 向后端发送的参数通常来自URL，因此可以通过`this.get('xxx')`直接获得
            //
            // 以下为一个典型场景：当默认的查询状态不为“全部”时，为了保持URL的简洁，
            // 将“全部”映射为`status=all`，而将没有`status`的状态映射为特定的状态集合，
            // 如果默认的“状态”参数值为“全部”，必须删除以下代码
            if (!query.status) {
                query.status = '1,2';
            }
            else if (query.status === 'all') {
                query.status = '';
            }
            return query;
        };

        return ${modelType};
    }
);
