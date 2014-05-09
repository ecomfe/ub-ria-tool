/**
 * <%-: project.alias %>
 * Copyright 2014 Baidu Inc. All rights reserved.
 *
 * @ignore
 * @file <%-: description %>列表模块定义
 * @author <%-: developer.name %>(<%- developer.email %>)
 */

/*
 * list对象用于描述这个模块列表的视图构成，主要包括：
 * 筛选：filter、批量操作：batch 和 表格字段：table
 *
 */
define(
    function (require) {
        var list = {
            /*
             * filter<Array.String>用于描述列表的筛选所使用的字段
             * 每个元素为在`entitydef.js`中定义的字段名
             *
             * 注意：脚手架会为每个filter添加`全部`这个额外的选项字段
             */
            filter: [
                'status'
                // TODO: 添加或修改filter的内容，完成后请删除该注释
            ],

            /*
             * batch<Array.Object>用于描述列表的批量操作
             *
             * 每个批量操作的定义由四个字段组成：
             * statusName：批量操作的目标状态名
             * command：指令的中文名称
             * status：目标状态的值
             * accept：该操作所接受的当前状态值
             * deny: 该操作不接受的状态值（如果同时存在accept和deny，则先看accept，再检查deny）
             */
            batch: [
                {
                    statusName: "restore",
                    command: "启用",
                    status: 1,
                    accept: [0]
                },
                {
                    statusName: "remove",
                    command: "删除",
                    status: 0,
                    accept: [1]
                }
                // TODO: 添加或修改batch的内容，完成后请删除该注释
            ],

            /*
             * table<Object>用于描述列表的属性和其字段属性
             *
             * withSubrow<Bool>: 为true时，表示该表格支持Subrow扩展，可按需使用
             * withCommand<Bool>：为true时，表示该表格支持Command扩展，可按需使用
             * fields<Array.Array>：列表的字段描述，一个典型的字段描述如下：
             *     ['{fieldType}', '{fieldName}', '{表头文字}']
             *
             *     `fieldType`为字段类型：
             *     当`fieldType`为`field`时，该字段为一个普通字段，会直接填充`entitydef.js`中定义的实体字段内容
             *     当`fieldType`为`enum`时，该字段为一个枚举量字段，将根据`enum.js`中定义的规则显示text的内容
             *     `fieldName`对应`entitydef.js`中定义的实体字段
             */
            table: {
                withSubrow: false,
                withCommand: false,

                fields: [
                    ['field', 'name', '名称'],
                    ['enum', 'status', '状态']
                    // TODO: 添加或修改table的内容，完成后请删除该注释
                ]
            }
        };

        return list;
    }
);
