/**
 * ${project.alias}
 *
 *
 * @ignore
 * @file 工具对象
 * @author ${developer.name}(${developer.email})
 */
define(
    function (require) {
        var underscore = require('underscore');

        // 创建一个继承自`underscore`的对象来
        var Util = function () {
        };

        Util.prototype = underscore;

        var util = new Util();

        // 再补上一些其它的
        util.extend(util, require('ub-ria/util'));

        return util;
    }
);
