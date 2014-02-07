/**
 * ${project.alias}
 * Copyright 2014 Baidu Inc. All rights reserved.
 * 
 * @ignore
 * @file 未知错误页
 * @author ${developer.name}(${developer.email})
 */
define(
    function (require) {
        var ErrorAction = require('./Action');
        var ErrorView = require('./View');

        require('tpl!./tpl/genericError.tpl.html');

        /**
         * 未知错误页
         *
         * @extends ErrorAction
         * @constructor
         */
        function GenericErrorAction() {
            ErrorAction.apply(this, arguments);
        }

        /**
         * 创建视图
         *
         * @return {ErrorView}
         */
        GenericErrorAction.prototype.createView = function () {
            var view = new ErrorView();

            view.name = 'generic-error';
            view.template = 'genericError';

            return view;
        };

        require('er/util').inherits(GenericErrorAction, ErrorAction);
        return GenericErrorAction;
    }
);
