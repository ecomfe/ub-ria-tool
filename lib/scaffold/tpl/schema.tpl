    /**
     * <%-: project.alias %>
     * Copyright 2014 Baidu Inc. All rights reserved.
     *
     * @ignore
     * @file <%-: description %>实体定义模块
     * @author <%-: developer.name %>(<%- developer.email %>)
     */
    define(
        function (require) {
            /*
             * Entity对象用于描述这个模块的实体，主要包括：
             * 字段：{key}、字段类型：{type}、字段描述：{字段描述} 和 字段配置：{TypeOption}
             *
             * 一个典型的实体字段定义描述如下：
             * {key}: [{Type}<string>, {字段描述}<string>, {TypeOption}<object>]
             *
             * Type: 'string' | 'enum' | 'number' | 'bool' | 'array' | 'object' | 'reference' | 'reference-set'
             * 说明: 字符串   | 枚举   | 数字     | 布尔值 | 数组    | 对象     | 外键        | 外键集
             *
             * 当Type为'string'时，TypeOption属性有:
             * 字  段  required | maxLength | pattern
             * 说  明  是否必填 | 最大长度  | 正则
             * email: ['string', '邮件', { required: true, maxLength: @rule.mail.maxLength, pattern: @rule.mail.pattern }]
             *
             * 当Type为'enum'时，TypeOption属性有:
             * 字  段  required | datasource
             * 说  明  是否必填 | 枚举数据源
             * 其中datasource为对应的enum.js中枚举变量的路径，同require规则，如：
             * 引用本模块的Enum模块，则为'./enum/{EnumName}'
             * 引用其它模块，如role模块下的的枚举量，则为'role/enum/{EnumName}'
             * 两个典型的例子如下：
             * status: ['enum', '状态',  { datasource: './enum/Status' }],
             * roles: ['enum', '角色', { datasource: 'role/enum/Roles' }]
             *
             * 当Type为'number'时，TypeOption属性有:
             * 字  段  required | max    | min    | pattern
             * 说  明  是否必填 | 最大值 | 最小值 | 正则
             *
             * 当Type为'bool'时，默认对应了Checkbox控件，TypeOption属性有：
             * 字  段  required
             * 说  明  是否必填
             *
             * 当Type为'array'时，TypeOption属性有：
             * 字  段  required | item
             * 说  明  是否必填 | 数组元素的定义
             * item字段为对数组每一项的实体定义，可嵌套，如字符串数组：
             * authorities: [
             *     'array', '权限列表',
             *     {
             *         item: ['string', '权限项', { maxLength: 50 }],
             *         required: true  // 不填默认为Ture
             *     }
             * ]
             *
             * 当Type为'object'时，TypeOption属性有:
             * 字  段  required | content
             * 说  明  是否必填 | 对象的定义
             * content为对象的定义，key为该对象展开后的各项key，value为每项的实体定义，可嵌套，如：
             * authorities: [
             *     'object', '权限集',
             *     {
             *         content: {
             *             slotView: ['string', '查看广告位', { maxLength: 50 }],
             *             slotModify: ['string', '修改广告位', { maxLength: 50 }],
             *             creative: [
             *                 'object', '创意权限集',
             *                 {
             *                     creativeView: ['string', '查看创意', { maxLength: 50 }],
             *                     ......
             *                 }
             *             ],
             *             ......
             *         },
             *         required: true  // 不填默认为Ture
             *     }
             * ]
             *
             * 当Type为'reference'时，默认对应ToggleSelector控件, TypeOption属性有:
             * 字  段  required | datasource
             * 说  明  是否必填 | 对应的实体名，一般用复数
             *
             * 当Type为'reference-set'时，默认对应CascadingSelector, TypeOption属性有:
             * 字  段  required | datasource
             * 说  明  是否必填 | 对应的实体名，一般用复数
             */
            var entity = {
                id: ['number', 'ID'],
                name: ['string', '广告位名称', { maxLength: 200 }],
                status: ['enum', '状态', { datasource: './enum/Status' }],
                displayOrder: ['number', '显示顺序', { min: 1, max: 10000 }],
                description: ['string', '说明备注', { maxLength: 4000 }]
                // TODO: 添加或修改实体定义，完成后请删除该注释内容
            };

            return entity;
        }
    );