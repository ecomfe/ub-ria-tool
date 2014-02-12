/**
 * <%-: project.alias %>
 * Copyright 2014 Baidu Inc. All rights reserved.
 *
 * @ignore
 * @file <%-: description %>只读页视图类
 * @author <%-: developer.name %>(<%- developer.email %>)
 */
define(
    function (require) {
        var util = require('er/util');
        var ReadView = require('ub-ria/ReadView');
        
        require('tpl!./tpl/<%-: templateFile %>.tpl.html');

        /**
         * <%-: description %>只读页视图类
         *
         * @extends ub-ria.ReadView
         * @constructor
         */
        function <%-: viewType %>() {
            ReadView.apply(this, arguments);
        }

        util.inherits(<%-: viewType %>, ReadView);

        /** 
         * 使用的模板名称
         *
         * @type {string}
         * @override
         */
        <%-: viewType %>.prototype.template = '<%- templateName %>';
        
        return <%-: viewType %>;
    }
);
