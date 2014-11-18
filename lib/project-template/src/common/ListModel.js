/**
 * <%-: project.alias %>
 * Copyright 2013 Baidu Inc. All rights reserved.
 *
 * @ignore
 * @file 列表数据模型基类
 * @author <%-: developer.name %>(<%- developer.email %>)
 */
define(
    function (require) {
        var exports = {};

        // 为model添加pageSize
        var PAGE_SIZE_DATASOURCE = {
            pageSize: function (model) {
                var globalData = model.data('global');
                return globalData.getUser()
                    .then(
                        function (user) {
                            return user.pageSize;
                        }
                    );
            }
        };

        exports.constructor = function () {
            this.$super(arguments);

            this.putDatasource(PAGE_SIZE_DATASOURCE, 0);
        };

        exports.setGlobalData = function (data) {
            this.addData('global', data);
        };

        var ListModel = require('eoo').create(require('ub-ria/mvc/ListModel'), exports);
        return ListModel;
    }
);
