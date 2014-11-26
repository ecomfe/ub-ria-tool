/**
 * ${project.alias}
 *
 *
 * @file 通用错误页
 * @class ErrorAction
 * @extends ub-ria.mvc.BaseAction
 * @author ${developer.name}(${developer.email})
 */
define(
    function (require) {
        var exports = {};

        /**
         * @overrides
         */
        exports.group = 'error';

        /**
         * @override
         * @return {er.Model}
         */
        exports.createModel = function () {
            var Model = require('er/Model');
            var model = new Model();
            model.set('indexURL', require('er/config').indexURL);
            return model;
        };

        /**
         * @overrides
         */
        exports.initBehavior = function () {
            this.$super(arguments);
            this.view.on('reload', this.reload, this);
        };

        var BaseAction = require('ub-ria/mvc/BaseAction');
        var ErrorAction = require('eoo').create(BaseAction, exports);
        return ErrorAction;
    }
);
