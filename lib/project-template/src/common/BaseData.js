/**
 * ${project.alias}
 * Copyright 2014 Baidu Inc. All rights reserved.
 *
 * @ignore
 * @file 数据类基类
 * @author ${developer.name}(${developer.email})
 */
define(
    function (require) {
        var u = require('underscore');
        var util = require('er/util');
        var RequestManager = require('ub-ria/mvc/RequestManager');

        function BaseData() {
            RequestManager.apply(this, arguments);
        }

        util.inherits(BaseData, RequestManager);

        /**
         * 处理请求名称
         *
         * @param {string} name 请求名称
         * @return {string}
         * @protected
         * @override
         */
        BaseData.prototype.formatRequestName = function (name) {
            // 此处允许请求名称中有`$entity`占位符，处理后会变成当前`Data`类管理的实体名称
            return name.replace(/\$entity/g, this.getEntityName());
        };

        /**
         * 处理请求URL
         *
         * @param {string} url 请求URL
         * @return {string}
         * @protected
         * @override
         */
        BaseData.prototype.formatRequestURL = function (url) {
            // 此处允许URL中有`$entity`占位符，处理后会变成当前`Data`类管理的后台实体名称
            // TODO: 默认会将实体名称复数化，如不需要则去除`pluralize`的调用
            return url.replace(/\$entity/g, u.pluralize(this.getBackendEntityName()));
        };

        // 以下是常用数据操作方法，这些方法的前提是有按以下规则注册相关请求：
        //
        // - 查询：/{entities}/search
        // - 列表：/{entities}/list
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
            return this.request(
                '$entity/update',
                entity,
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

        return BaseData;
    }
);
