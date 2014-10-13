/**
 * <%-: project.alias %>
 * Copyright 2014 Baidu Inc. All rights reserved.
 *
 * @file <%-: description %>列表数据模型类
 * @class <%-: modelType %>
 * @extends common.ListModel
 * @author <%-: developer.name %>(<%- developer.email %>)
 */
define(
    function (require) {
        var u = require('common/util');
        var datasource = require('er/datasource');
        var filterHelper = require('ub-ria/mvc/filterHelper');

        var statuses = require('./enum').Status.toArray();

        /**
         * 筛选数据源配置
         *
         * @type {Object}
         */
        var FILTER_DATASOURCE = {
            statuses: datasource.constant(statuses)
        };

        var exports = {};

        /**
         * @override
         */
        exports.constructor = function () {
            this.$super(arguments);

            this.putDatasource(FILTER_DATASOURCE);

            // TODO: 其它数据源在此添加
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

            // TODO: 其它Model字段的处理在此添加
        };

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

        var <%-: modelType %> = require('eoo').create(require('common/ListModel'), exports);
        return <%-: modelType %>;
    }
);
