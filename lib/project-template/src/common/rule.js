/**
 * ${project.alias}
 *
 *
 * @ignore
 * @file 表单验证规则对象
 * @author ${developer.name}(${developer.email})
 */
define(
    function (require) {
        var baseRule = require('ub-ria/mvc/rule');
        var util = require('common/util');

        return util.deepClone(baseRule);
    }
);
