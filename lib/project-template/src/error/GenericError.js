/**
 * ${project.alias}
 *
 *
 * @file 未知错误页
 * @class GenericErrorAction
 * @extends error.Action
 * @author ${developer.name}(${developer.email})
 */
define(
    function (require) {
        require('tpl!./tpl/genericError.tpl.html');

        var exports = {};

        /**
         * @override
         * @return {ErrorView}
         */
        exports.createView = function () {
            var ErrorView = require('./View');
            var view = new ErrorView();

            view.name = 'generic-error';
            view.template = 'genericError';

            return view;
        };

        var ErrorAction = require('./Action');
        var GenericErrorAction = require('eoo').create(ErrorAction, exports);
        return GenericErrorAction;
    }
);
