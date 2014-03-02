/**
 * ${project.alias}
 * Copyright 2014 Baidu Inc. All rights reserved.
 *
 * @ignore
 * @file UI组件的扩展
 * @author ${developer.name}(${developer.email})
 */
define(
    function (require) {
        var u = require('underscore');

        function enable() {
            // 表格默认配置
            var Table = require('esui/Table');

            Table.defaultProperties.sortable = true;
            Table.defaultProperties.columnResizable = true;
            Table.defaultProperties.select = 'multi';
            Table.defaultProperties.followHead = true;
            Table.defaultProperties.breakLine = true;
            Table.defaultProperties.encode = true;

            // 打开表单自动验证
            var Form = require('esui/Form');

            Form.defaultProperties.autoValidate = true;

            // 设置分页
            var Pager = require('esui/Pager');
            Pager.prototype.defaultProperties.pageSizes = [20, 50, 100];
            Pager.prototype.defaultProperties.pageSize = 50;

            // TODO: 添加了`Uploader`控件后拿回来
            // 统一添加`sessionToken`
            // var Uploader = require('ub-ria/ui/Uploader');
            // var GlobalData = require('../GlobalData');
            // var user = (new GlobalData()).getUser();
            // Uploader.prototype.getSessionToken = function () {
            //     return user.sessionToken;
            // };
        }

        return {
            enable: u.once(enable)
        };
    }
);
