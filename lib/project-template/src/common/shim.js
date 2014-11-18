/**
 * SSP for APP
 * Copyright 2014 Baidu Inc. All rights reserved.
 *
 * @ignore
 * @file 自定义标签shim
 * @author exodia(dengxinxin@baidu.com)
 */
define(function () {
    function enable() {
        document.createElement('aside');
        document.createElement('footer');
        document.createElement('header');
        document.createElement('nav');
        document.createElement('section');
        document.createElement('article');
        document.createElement('figure');
        document.createElement('figcaption');
        document.createElement('time');

        var prefix = 'esui-';
        var elements = [
            // esui tag
            'button', 'calendar', 'crumb', 'dialog', 'label', 'month-view', 'pager', 'panel', 'range-calendar',
            'region', 'rich-calendar', 'schedule', 'search-box', 'sidebar', 'select', 'tab', 'table', 'text-box',
            'text-line', 'tip', 'tip-layer', 'tree', 'wizard', 'toast', 'validity', 'check-box', 'command-menu',
            'box-group',

            // ef tag
            'action-panel', 'action-dialog',

            // ub-ria tag
            'abstract-box-group', 'partial-form', 'rich-selector', 'sidebar',
            'table-rich-selector', 'tree-rich-selector', 'toggle-button', 'toggle-panel', 'uploader'

            // 项目级的自定义标签在此添加
        ];

        for (var i = elements.length - 1; i > -1; --i) {
            document.createElement(prefix + elements[i]);
        }
    }

    return {
        enable: enable
    };
});
