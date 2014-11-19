/**
 * <%-: project.alias %>
 * Copyright 2014 Baidu Inc. All rights reserved.
 *
 * @file <%-: description %>列表数据模型类
 * @extends common.ListModel
 * @author <%-: developer.name %>(<%- developer.email %>)
 */
define(
    function (require) {
        var datasource = require('er/datasource');
        var filterHelper = require('ub-ria/mvc/filterHelper');

        var statuses = require('./enum').Status.toArray();

        /**
         * @class <%-: entity %>.<%-: modelType %>
         * @extends common.ListModel
         */
        var exports = {};

        // TODO: 当前Model的数据源在此处添加，示例如下：
        /**
         * 筛选数据源配置
         *
         * @type {Object}
         */
        var FILTER_DATASOURCE = {
            statuses: datasource.constant(statuses)
        };


        /**
         * @override
         */
        exports.constructor = function () {
            this.$super(arguments);

            // TODO: 上方增加的数据源在此处注册，具体方法见[https://github.com/ecomfe/ub-ria/wiki/编码实践数据源合并]
            // 示例：
            this.putDatasource(FILTER_DATASOURCE);
        };

        /**
         * @override
         */
        exports.statusTransitions = [
            { status: 0, accept: [1], statusName: 'delete', command: '删除' },
            { status: 1, accept: [0], statusName: 'restore', command: '启用' }
            // TODO: 其它状态转换条件在此添加
        ];

        /**
         * @override
         */
        exports.defaultArgs = {
            orderBy: 'id',
            order: 'desc',
            status: '1'
            // TODO: 其它默认查询参数在此添加
        };

        /**
         * @override
         */
        exports.prepare = function () {
            this.$super(arguments);

            var statuses = this.get('statuses');
            statuses.unshift({ text: '全部', value: '' });

            // TODO: 对当前Model的处理逻辑在此处添加，否则删除该接口
        };

        // TODO: Model的处理逻辑在此处添加，否则删除该注释

        /**
         * @override
         */
        exports.getFilters = function () {
            return {
                status: {
                    value: this.get('status'),
                    text: filterHelper.select.getText,
                    datasource: this.get('statuses')
                }
                // TODO: 其它筛选项参数在此添加
            };
        };

        /**
         * @override
         */
        exports.getQuery = function () {
            var query = this.$super(arguments);

            query.status = this.get('statuses');
            // TODO: 其它筛选项参数在此添加

            return query;
        };

        var ListModel = require('common/ListModel');
        var <%-: modelType %> = require('eoo').create(ListModel, exports);
        return <%-: modelType %>;
    }
);
