/**
 * ${project.alias}
 *
 *
 * @ignore
 * @file 控件扩展
 * @author ${developer.name}(${developer.email})
 */
define(
    function (require) {
        var u = require('underscore');

        function enable() {
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
            // TODO: Pager是放在prototype上的，要改
            Pager.prototype.defaultProperties.pageSizes = [20, 50, 100];
            Pager.prototype.defaultProperties.pageSize = 50;

            var Select = require('esui/Select');
            Select.prototype.getSelectedItem = function () {
                return this.datasource[this.selectedIndex] || null;
            };
        }

        return {
            enable: u.once(enable)
        };
    }
);
