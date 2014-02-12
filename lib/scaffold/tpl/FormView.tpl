/**
 * <%-: project.alias %>
 * Copyright 2014 Baidu Inc. All rights reserved.
 *
 * @ignore
 * @file <%-: description %>表单视图
 * @author <%-: developer.name %>(<%- developer.email %>)
 */
define(
    function (require) {
        var util = require('er/util');
        var FormView = require('ub-ria/FormView');

        require('tpl!./tpl/<%-: templateFile %>.tpl.html');

        /**
         * <%-: description %>表单视图类
         *
         * @extends ub-ria.FormView
         * @constructor
         */
        function <%-: viewType %>() {
            FormView.apply(this, arguments);
        }

        util.inherits(<%-: viewType %>, FormView);

        /** 
         * 使用的模板名称
         *
         * @type {string}
         * @override
         */
        <%-: viewType %>.prototype.template = '<%- templateName %>';

        /**
         * 从表单中获取实体数据
         *
         * @return {Object}
         */
        <%-: viewType %>.prototype.getEntity = function () {
            var entity = FormView.prototype.getEntity.apply(this, arguments);
            // TODO: 如果实体有在表单中未包含的额外属性，在此处添加，没有则删除该方法

            return entity;
        };

        /**
         * 控件额外属性配置
         *
         * @type {Object}
         * @override
         */
        <%-: viewType %>.prototype.uiProperties = {
            // TODO: 添加控件的额外属性配置，如没有则删除该属性
        };

        /**
         * 控件事件配置
         *
         * @type {Object}
         * @override
         */
        <%-: viewType %>.prototype.uiEvents = {
            // TODO: 添加控件的事件配置，如没有则删除该属性
        };
        
        return <%-: viewType %>;
    }
);
