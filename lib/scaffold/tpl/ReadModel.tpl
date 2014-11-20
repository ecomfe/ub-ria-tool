/**
 * <%-: project.alias %>
 * Copyright 2014 Baidu Inc. All rights reserved.
 *
 * @file <%-: description %>只读页数据模型类
 * @exports <%-: entity %>.<%-: modelType %>
 * @author <%-: developer.name %>(<%- developer.email %>)
 */
define(
    function (require) {
        /**
         * @class <%-: entity %>.<%-: modelType %>
         * @extends common.ReadModel
         */
        var exports = {};

        // TODO: 添加除加载当前查询的实体外的其它数据源，示例如下：
        /**
         * 这是一个寂寞的数据源
         *
         * @type {Object}
         */
        // var I_AM_LONELY = {
        //     iAmLonely: function (model) {
        //         var lonelyOne = model.data().findById(1111).then(
        //             function (response) {
        //                 return response.results;
        //             }
        //         );
        //         return lonelyOne;
        //     }
        // };

        exports.constructor = function () {
            this.$super(arguments);

            // TODO: 上方增加的数据源在此处注册，具体方法见[https://github.com/ecomfe/ub-ria/wiki/编码实践数据源合并]
            // 示例：
            // this.putDatasource(I_AM_LONELY);
        };

        /**
         * @override
         */
        exports.prepare = function () {
            this.$super(arguments);

            // TODO: 对当前Model的处理逻辑在此处添加，否则删除该接口
        };

        // TODO: Model的处理逻辑在此处添加，否则删除该注释

        var ReadModel = require('common/ReadModel');
        var <%-: modelType %> = require('eoo').create(ReadModel, exports);
        return <%-: modelType %>;
    }
);
