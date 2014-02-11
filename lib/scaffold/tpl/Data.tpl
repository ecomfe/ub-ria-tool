/**
 * ${project.alias}
 * Copyright 2014 Baidu Inc. All rights reserved.
 * 
 * @ignore
 * @file ${description}数据类
 * @author {${developer.name}(${developer.email})}
 */
define(
    function (require) {
        var u = require('underscore');
        var util = require('er/util');
        var BaseData = require('common/BaseData');

        /**
         * ${description}数据类
         *
         * @extends common.BaseData
         * @constructor
         */
        function ${entity | pascal}Data() {
            BaseData.call(this, '${entity}');
        }

        util.inherits(${entity | pascal}Data, BaseData);

        var requests = {
            search: {
                name: '${entity}/search',
                scope: 'instance',
                policy: 'auto'
            },
            list: {
                name: '${entity}/list',
                scope: 'instance',
                policy: 'auto'
            },
            save: {
                name: '${entity}/save',
                scope: 'instance',
                policy: 'auto'
            },
            update: {
                name: '${entity}/update',
                scope: 'instance',
                policy: 'auto'
            },
            remove: {
                name: '${entity}/remove',
                scope: 'instance',
                policy: 'auto'
            },
            restore: {
                name: '${entity}/restore',
                scope: 'instance',
                policy: 'auto'
            },
            findById: {
                name: '${entity}/findById',
                scope: 'instance',
                policy: 'auto'
            },
            tree: {
                name: '${entity}/tree',
                scope: 'instance',
                policy: 'auto'
            }
            // TODO: 有其它请求在此配置
        };

        var RequestManager = require('ub-ria/mvc/RequestManager');
        u.each(
            requests,
            function (config) {
                RequestManager.register(${entity | pascal}Data, config.name, config);
            }
        );

        return ${entity | pascal}Data;
    }
);        
