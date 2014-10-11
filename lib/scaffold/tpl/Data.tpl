/**
 * <%-: project.alias %>
 * Copyright 2014 Baidu Inc. All rights reserved.
 *
 * @file <%-: description %>数据类
 *
 * @class <%-: entity %>.<%-: entity | pascal %>Data
 * @extends common.BaseData
 *
 * @author <%-: developer.name %>(<%- developer.email %>)
 */
define(
    function (require) {
        var exports = {};

        // TODO: 其它非标准请求接口在此添加
        /**
         * 获取物料尺寸列表
         *
         * @method getXXX#.size
         * @return {er.meta.FakeXHR}
         */
        exports.getSample = function () {
            return this.request(
                '$entity/sample',
                {},
                {
                    url: '/$entity/sample',
                    method: 'GET'
                }
            );
        }

        var requests = {
            search: {
                name: '<%-: entity %>/search',
                scope: 'instance',
                policy: 'auto'
            },
            list: {
                name: '<%-: entity %>/list',
                scope: 'instance',
                policy: 'auto'
            },
            save: {
                name: '<%-: entity %>/save',
                scope: 'instance',
                policy: 'auto'
            },
            update: {
                name: '<%-: entity %>/update',
                scope: 'instance',
                policy: 'auto'
            },
            remove: {
                name: '<%-: entity %>/remove',
                scope: 'instance',
                policy: 'auto'
            },
            restore: {
                name: '<%-: entity %>/restore',
                scope: 'instance',
                policy: 'auto'
            },
            findById: {
                name: '<%-: entity %>/findById',
                scope: 'instance',
                policy: 'auto'
            },
            tree: {
                name: '<%-: entity %>/tree',
                scope: 'instance',
                policy: 'auto'
            }
            // TODO: 有其它请求在此配置
        };

        var <%-: entity | pascal %>Data = require('eoo').create(require('common/BaseData'), exports);

        var RequestManager = require('ub-ria/mvc/RequestManager');
        require('common/util').each(
            requests,
            function (config) {
                RequestManager.register(<%-: entity | pascal %>Data, config.name, config);
            }
        );

        return <%-: entity | pascal %>Data;
    }
);
