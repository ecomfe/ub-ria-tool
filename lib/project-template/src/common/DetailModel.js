/**
 * ${project.alias}
 *
 *
 * @file 详情页Model基类
 * @class DetailModel
 * @extends ub-ria.mvc.DetailModel
 * @author ${developer.name}(${developer.email})
 */
define(
    function (require) {
        var exports = {};

        /**
         * 设置globalData方法
         */
        exports.setGlobalData = function (data) {
            this.addData('global', data);
        };

        var DetailModel = require('eoo').create(require('ub-ria/mvc/DetailModel'), exports);
        return DetailModel;
    }
);
