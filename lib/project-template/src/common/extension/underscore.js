/**
 * ${project.alias}
 * Copyright 2014 Baidu Inc. All rights reserved.
 * 
 * @ignore
 * @file underscore扩展
 * @author ${developer.name}(${developer.email})
 */
define(
    function (require) {
        var u = require('underscore');

        function enable() {
            // 将框架的工具方法集中起来
            u.purify = require('ub-ria/util').purify;
            u.trim = require('ub-ria/util').trim;
            u.pascalize = require('ub-ria/util').pascalize;
            u.camelize = require('ub-ria/util').camelize;
            u.dasherize = require('ub-ria/util').dasherize;
            u.constlize = require('ub-ria/util').constlize;
            u.pluralize = require('ub-ria/util').pluralize;
            u.deepClone = require('ub-ria/util').deepClone;
            u.formatNumbr = require('ub-ria/util').formatNumbr;
            u.pad = require('ub-ria/util').pad;
            u.padRight = require('ub-ria/util').padRight;

            // TODO: 可在这里向`underscore`对象添加需要的工具方法
        }

        return {
            enable: u.once(enable)
        };
    }
);
