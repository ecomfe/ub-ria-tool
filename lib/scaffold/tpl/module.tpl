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
        var u = require('underscore');

        var actions = [
            {
                path: '/<%-: entity %>/list',
                type: '<%-: entity %>/List',
                title: '<%-: description %> - 列表',
                auth: ['<%-: entity | const %>_VIEW']
            },
            {
                path: '/<%-: entity %>/create',
                type: '<%-: entity %>/Form',
                title: '新建<%-: description %>',
                args: { formType: 'create' },
                auth: ['<%-: entity | const %>_MODIFY']
            },
            {
                path: '/<%-: entity %>/update',
                type: '<%-: entity %>/Form',
                title: '修改<%-: description %>',
                args: { formType: 'update' },
                auth: ['<%-: entity | const %>_MODIFY']
            },
            {
                path: '/<%-: entity %>/view',!
                type: '<%-: entity %>/Read',
                title: '查看<%-: description %>信息',
                auth: ['<%-: entity | const %>_VIEW']
            },
            {
                path: '/<%-: entity %>/read',
                movedTo: '<%-: entity %>/view'
            }
        ];

        var controller = require('er/controller');
        u.each(actions, controller.registerAction);

        return {
            name: '<%-: entity %>',
            description: '<%-: description %>'
        };
    }
);        
