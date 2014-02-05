/**
 * ${project.alias}
 * Copyright 2014 Baidu Inc. All rights reserved.
 *
 * @ignore
 * @file ${description}只读页数据模型类
 * @author ${developer.name}(${developer.email})
 */
define(
    function (require) {
        var util = require('er/util');
        var ReadModel = require('common/ReadModel');
        var Data = require('./Data');

        /**
         * ${description}只读页数据模型类
         *
         * @extends common.ReadModel
         * @constructor
         */
        function ${modelType}() {
            ReadModel.apply(this, arguments);
            this.addData(new Data());
        }

        util.inherits(${modelType}, ReadModel);

        /**
         * 数据源配置
         *
         * @type {Object}
         * @override
         */
        ${modelType}.prototype.datasource = {
            crumbPath: function (model) {
                var path = [
                    { 
                        text: '${description}', 
                        href: '#/${entity}/list'
                    },
                    { 
                        text: model.get('title')
                    }
                ];
                return path;
            }
            // TODO: 添加除加载修改用的实体外的其它数据源，如果没有则删除此段代码
        };

        return ${modelType};
    }
);