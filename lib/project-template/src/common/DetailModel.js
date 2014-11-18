/**
 * SSP for WEB
 * Copyright 2014 Baidu Inc. All rights reserved.
 *
 * @file 详情页Model基类
 * @class DetailModel
 * @extends ub-ria.mvc.DetailModel
 * @author zhanglili(otakustay@gmail.com), chenhaoyin(curarchy@163.com)
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
