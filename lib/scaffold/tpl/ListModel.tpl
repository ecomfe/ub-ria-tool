/**
 * <%-: project.alias %>
 * Copyright 2014 Baidu Inc. All rights reserved.
 *
 * @ignore
 * @file <%-: description %>列表数据模型类
 * @author <%-: developer.name %>(<%- developer.email %>)
 */
define(
    function (require) {
        var u = require('underscore');
        var util = require('er/util');
        var ListModel = require('ub-ria/mvc/ListModel');
        var Data = require('./Data');
        var GlobalData = require('common/GlobalData');

        /**
         * <%-: description %>列表数据模型类
         *
         * @extends ub-ria.mvc.ListModel
         * @constructor
         */
        function <%-: modelType %>() {
            ListModel.apply(this, arguments);
            this.addData(new Data());
            this.addData('global', GlobalData.getInstance());
        }

        util.inherits(<%-: modelType %>, ListModel);

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

        // TODO: 如果没有状态属性，移除下面代码，如果状态不同，记得改这个数组
        // 切记不要让任何一项出现`value`为空的情况，详细可参考`ub-ria.ListModel`的实现
        var Status = require('./enum').Status;
        var statuses = [
            { text: '全部', value: 'all' },
            Status.fromAlias('NORMAL'),
            Status.fromAlias('REMOVED')
        ];

        var datasource = require('er/datasource');
        /**
         * 数据源配置
         *
         * @type {Object}
         * @override
         */
        <%-: modelType %>.prototype.datasource = {
            statuses: datasource.constant(statuses),
            // 所需权限
            canCreate: datasource.permission('<%- entity | const %>_NEW'),
            canModify: datasource.permission('<%- entity | const %>_MODIFY'),
            canBatchModify: datasource.permission('<%- entity | const %>_STATUS_MODIFY')
        };

        /**
         * 默认查询参数
         *
         * @param {Object}
         * @override
         */
        <%-: actionType %>.prototype.defaultArgs = {
            // TODO: 配置默认的查询参数，避免URL里有太多参数，
            // 这里参数默认值和“不把参数传给后端时后端使用的值”相同，
            // 如无需要就删除这一段
            orderBy: 'displayOrder',
            order: 'asc'
        };

        /**
         * 准备数据
         *
         * @override
         */
        <%-: modelType %>.prototype.prepare = function () {
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
        <%-: modelType %>.prototype.getQuery = function () {
            var query = ListModel.prototype.getQuery.apply(this, arguments);

            // TODO: 添加请求后端时所需要用到的参数，默认包含：
            // `keyword`、`status`、`order`、`orderBy`、`pageNo`共5个参数
            // 如有其它参数则需向`query`对象添加属性，无额外参数则删掉这个方法。
            // 向后端发送的参数通常来自URL，因此可以通过`this.get('xxx')`直接获得

            return query;
        };

        return <%-: modelType %>;
    }
);
