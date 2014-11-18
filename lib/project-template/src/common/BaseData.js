/**
 * <%-: project.alias %>
 * Copyright 2014 Baidu Inc. All rights reserved.
 *
 * @ignore
 * @file 数据类基类
 * @author <%-: developer.name %>(<%- developer.email %>)
 */
define(
    function (require) {
        var util = require('er/util');
        var u = require('underscore');
        var RequestManager = require('ub-ria/mvc/RequestManager');

        function BaseData() {
            RequestManager.apply(this, arguments);
        }

        util.inherits(BaseData, RequestManager);

        // 以下是常用数据操作方法，这些方法的前提是有按以下规则注册相关请求：
        //
        // - 查询：/{entities}/search
        // - 列表：/{entities}/list
        // - 树：/{entities}/tree
        // - 保存：/{entities}/save
        // - 更新：/{entities}/update
        // - 删除：/{entities}/remove
        // - 恢复：/{entities}/restore
        //
        // 注册配置时可以不写明`url`和`method`，但依旧建议写上，当作文档看，
        // 如果没注册，也可正常使用，但无法使用AJAX管理机制

        // TODO: 根据自身项目的前后端接口规则，实现下列常用方法，默认提供的是纯REST化的方案

        /**
         * 检索一个实体列表，返回一个分页的结果集
         *
         * @param {Object} query 查询参数
         * @return {er.meta.FakeXHR}
         */
        BaseData.prototype.search = function (query) {
            return this.request(
                '$entity/search',
                query,
                {
                    method: 'GET',
                    url: '/$entity'
                }
            );
        };

        /**
         * 获取一个实体列表（不分页）
         *
         * @param {Object} query 查询参数
         * @return {er.meta.FakeXHR}
         */
        BaseData.prototype.list = function (query) {
            return this.request(
                '$entity/list',
                query,
                {
                    method: 'GET',
                    url: '/$entity/list'
                }
            );
        };

        /**
         * 获取一个实体列表（不分页），这里是对一种通用处理的封装
         *
         * @param {Object} query 查询参数
         * @return {er.Promise}
         */
        BaseData.prototype.nakedList = function (query) {
            return this.list(query).then(
                function (response) {
                    return response.results || [];
                }
            );
        };

        /**
         * 检索一个实体树结构
         *
         * @param {Object} query 查询参数
         * @return {er.meta.FakeXHR}
         */
        BaseData.prototype.tree = function (query) {
            return this.request(
                '$entity/tree',
                query,
                {
                    method: 'GET',
                    url: '/$entity/tree'
                }
            );
        };

        /**
         * 保存一个实体
         *
         * @param {Object} entity 实体对象
         * @return {er.meta.FakeXHR}
         */
        BaseData.prototype.save = function (entity) {
            return this.request(
                '$entity/save',
                entity,
                {
                    method: 'POST',
                    url: '/$entity'
                }
            );
        };

        /**
         * 更新一个实体
         *
         * @param {Object} entity 实体对象
         * @return {er.meta.FakeXHR}
         */
        BaseData.prototype.update = function (entity) {
            // 根据前后端约定，body里不传id字段，因此这里再去掉
            var submitEntity = u.omit(entity, 'id');
            return this.request(
                '$entity/update',
                submitEntity,
                {
                    method: 'PUT',
                    url: '/$entity/' + entity.id
                }
            );
        };

        /**
         * 批量更新一个或多个实体的状态
         *
         * @param {string} action 操作名称
         * @param {number} status 目标状态
         * @param {string[]} ids id集合
         * @return {FakeXHR}
         */
        BaseData.prototype.updateStatus = function (action, status, ids) {
            return this.request(
                '$entity/' + action,
                {
                    ids: ids,
                    status: status
                },
                {
                    method: 'POST',
                    url: '/$entity/status'
                }
            );
        };

        /**
         * 获取批量操作前的确认
         *
         * @param {string} action 操作名称
         * @param {number} status 目标状态
         * @param {string[]} ids id集合
         * @return {er.meta.FakeXHR}
         */
        BaseData.prototype.getAdvice = function (action, status, ids) {
            return this.request(
                '$entity/' + action + '/advice',
                {
                    ids: ids,
                    status: status
                },
                {
                    method: 'GET',
                    url: '/$entity/status/advice'
                }
            );
        };

        /**
         * 根据id获取单个实体
         *
         * @param {String} id 实体的id
         * @return {er.meta.FakeXHR}
         */
        BaseData.prototype.findById = function (id) {
            return this.request(
                '$entity/findById',
                null,
                {
                    method: 'GET',
                    url: '/$entity/' + id
                }
            );
        };

        /**
         * 根据id删除单个实体
         *
         * @param {String} id 实体的id
         * @return {er.meta.FakeXHR}
         */
        BaseData.prototype.remove = function (id) {
            return this.updateStatus('delete', 0, id);
        };

        return BaseData;
    }
);
