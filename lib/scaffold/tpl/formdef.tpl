/**
 * <%-: project.alias %>
 * Copyright 2014 Baidu Inc. All rights reserved.
 *
 * @ignore
 * @file <%-: description %>表单模块定义
 * @author <%-: developer.name %>(<%- developer.email %>)
 */

/*
 * form对象用于描述这个模块表单的视图构成
 * @type <Array.Section.Field>
 *
 */
define(
    function (require) {
        var form = [
            /*
             * form数组的每个元素对应一个`section`的DOM元素，用一个对象表示
             *
             * name：这个section的名称，用于class和toggleable为true时的控件id
             * title：这个section的Title，没有该字段或该字段为空，则不显示Title
             * toggleable：是否允许section折叠，true时，输出TogglePanel控件替代section
             * fields：这个section中的字段
             */
            {
                name: 'basicInfo',
                title: '基本信息',
                toggleable: true,
                fields: [
                    /*
                     * 可以用如下格式来定义一个字段：
                     * { field: '{filedName}', desc: '{中文描述}', ctrl: '{ControlType}'}
                     * 其中，field和ctrl为必填字段
                     *
                     * 可以使用的字段还包括：
                     * maxLength | min | max | pattern
                     *
                     * 当该字段在`entitydef.js`中未定义过时，则必须填写desc字段，并可以选择填写其它字段
                     *
                     * 当该字段在`entitydef.js`中定义过时，无需填写desc字段，
                     * 所有除field和ctrl以外字段默认使用`entitydef.js`中定义的值
                     *
                     * ctrl字段可以使用的值包括（注意大小写）：
                     * textbox | moneyTextbox | urlTextbox | sizeTextbox | frequencyTextbox | secondTextbox | percentTextbox
                     * textarea | checkbox | radio | toggleSelector | cascadingSelector
                     */
                    { field: 'name', ctrl: 'textbox' },
                    { field: 'displayOrder', ctrl: 'textbox' },
                    { field: 'status', ctrl: 'radio' },
                    /*
                     * `entitydef.js`中未定义过的字段必须填写desc字段
                     */
                    { field: 'otherField', desc: '字段名称', ctrl: '', maxLength: 200, pattern: 'rule.xxx' }
                    // TODO: 添加或修改fields的内容，完成后请删除该注释
                ]
            }
            // TODO: 添加或修改form的内容，完成后请删除该注释
        ];

        return form;
    }
);
