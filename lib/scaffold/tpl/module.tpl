/**
 * <%-: project.alias %>
 * Copyright 2014 Baidu Inc. All rights reserved.
 *
 * @ignore
 * @file <%-: description %>模块配置
 * @author <%-: developer.name %>(<%- developer.email %>)
 */
define(
    function (require) {
        var ActionFactory = require('common/IoCActionFactory');

        var actions = [
            {
                path: '/<%-: entity %>/list',
                type: new ActionFactory('<%-: entity %>List'),
                title: '<%-: description %> - 列表',
                auth: ['<%-: entity | const %>_VIEW']
            },
            {
                path: '/<%-: entity %>/create',
                type: new ActionFactory('<%-: entity %>Form'),
                title: '新建<%-: description %>',
                args: { formType: 'create' },
                auth: ['<%-: entity | const %>_MODIFY']
            },
            {
                path: '/<%-: entity %>/update',
                type: new ActionFactory('<%-: entity %>Form'),
                title: '修改<%-: description %>',
                args: { formType: 'update' },
                auth: ['<%-: entity | const %>_MODIFY']
            },
            {
                path: '/<%-: entity %>/view',
                type: new ActionFactory('<%-: entity %>Read'),
                title: '查看<%-: description %>信息',
                auth: ['<%-: entity | const %>_VIEW']
            },
            {
                path: '/<%-: entity %>/read',
                movedTo: '<%-: entity %>/view'
            }
        ];

        // TODO：业务模块专用的控件在此处注册
        // var tpl = require('tpl');
        // tpl.registerControl('<%-: entity %>/ui/YourControl');

        // TODO：如果没有需要额外配置的依赖，则删除getMyActionComponentConfig，overrides和omits
        // 并删除addComponentsByEntityName中对应的两个参数
        function getMyActionComponentConfig(entityName) {
            var components = {};

            // components.sampleModule = {
            //     module: entityName + '/SampleModule',
            //     auto: true
            // };

            return components;
        }
        // 汇总所有的配置信息
        var overrides = u.extend(
            getMyActionComponentConfig('<%-: entity %>'),
        );
        // 无用的配置
        var omits = [];

        require('er/controller').registerAction(actions);
        require('common/ioc').addComponentsByEntityName('<%-: entity %>', '<%-: entity %>', overrides, omits);
);
