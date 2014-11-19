/**
 * ${project.alias}
 * Copyright 2013 Baidu Inc. All rights reserved.
 *
 * @ignore
 * @file 表单Action装配工厂
 * @author ${developer.name}(${developer.email})
 */
define(
    function (require) {
        var exports = {};

        exports.getModules = function () {
            var modules = this.$super(arguments);
            modules.push('ub-ria/mvc/EntityValidator');
            modules.push(this.getBaseModuleName() + '/schema');
            modules.push('ub-ria/mvc/handler/ToastSubmitHandler');
            modules.push('ub-ria/mvc/handler/RedirectSubmitHandler');
            return modules;
        };

        exports.buildAction = function () {
            var action = this.$super(arguments);
            var EntityValidator = arguments[8];
            var schema = arguments[9];
            var ToastSubmitHandler = arguments[10];
            var RedirectSubmitHandler = arguments[11];

            var validator = new EntityValidator();
            validator.setRule(action.model.get('rule'));
            validator.setSchema(schema);
            action.model.setValidator(validator);

            var toastSubmitHandler = new ToastSubmitHandler();
            var redirectSubmitHandler = new RedirectSubmitHandler();
            toastSubmitHandler.setNextSubmitHandler(redirectSubmitHandler);
            redirectSubmitHandler.setRedirectOptions({global: true, force: true});
            action.setSubmitHandler(toastSubmitHandler);

            return action;
        };

        var FormActionFactory = require('eoo').create(require('./ActionFactory'), exports);
        return FormActionFactory;
    }
);
