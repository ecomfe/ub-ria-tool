/**
 * SSP for BAIDU
 * Copyright 2014 Baidu Inc. All rights reserved.
 *
 * @file 404页
 * @class NotFoundAction
 * @extends error.Action
 * @author otakustay(otakustay@gmail.com),chenhaoyin(curarchy@163.com)
 */
define(
    function (require) {
        require('tpl!./tpl/notFound.tpl.html');

        var exports = {};

        /**
         * @override
         * @return {ErrorView}
         */
        exports.createView = function () {
            var ErrorView = require('./View');
            var view = new ErrorView();

            view.name = 'not-found';
            view.template = 'notFound';

            return view;
        };

        var ErrorAction = require('./Action');
        var NotFoundAction = require('eoo').create(ErrorAction, exports);
        return NotFoundAction;
    }
);
