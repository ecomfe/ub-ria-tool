/**
 * ${project.alias}
 * Copyright 2014 Baidu Inc. All rights reserved.
 * 
 * @ignore
 * @file 404页
 * @author ${developer.name}(${developer.email})
 */
define(
    function (require) {
        var ErrorView = require('./View');
        var ErrorAction = require('./Action');

        require('tpl!./tpl/notFound.tpl.html');

        /**
         * 404页Action
         *
         * @constructor
         * @extends ErrorAction
         */
        function NotFoundAction() {
            ErrorAction.apply(this, arguments);
        }

        /**
         * 创建视图
         *
         * @return {ErrorView}
         */
        NotFoundAction.prototype.createView = function () {
            var view = new ErrorView();

            view.name = 'not-found';
            view.template = 'notFound';

            return view;
        };

        require('er/util').inherits(NotFoundAction, ErrorAction);
        return NotFoundAction;
    }
);
