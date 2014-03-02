/**
 * ${project.alias}
 * Copyright 2014 Baidu Inc. All rights reserved.
 *
 * @ignore
 * @file 系统配置入口
 * @author ${developer.name}(${developer.email})
 */
define(
    function (require) {
        // 通用模板，可在以下模板中加入对应类型页面通用的模板
        require('tpl!common/tpl/list.tpl.html');
        require('tpl!common/tpl/form.tpl.html');
        require('tpl!common/tpl/read.tpl.html');
        require('tpl!common/tpl/report.tpl.html');

        // 各模块的入口配置，引入每个业务模块下的`config`模块
        require('error/config');

        // 配置统计
        var track = require('er-track').create();
        track.includeAll();
        // 配置百度统计，如果没有使用百度统计跟踪系统则删除这个`if`分支
        if (location.hostname === '${project.domain}') {
            var scriptURL = window.require.toUrl('ub-ria/external/h') + '.js';
            track.use('baidu')
                .config('scriptURL', scriptURL)
                .setAccount('百度统计的代码ID，从统计网站可以获取');
        }
        if (window.DEBUG) {
            track.use('console');
        }
        track.start();

        var events = require('er/events');

        // 定向错误页
        events.on(
            'actionfail',
            function (e) {
                if (!e.isChildAction) {
                    var controller = require('er/controller');
                    controller.renderAction('/400');
                }
            }
        );
        events.on(
            'enteractionfail',
            function (e) {
                if (!e.isChildAction) {
                    var controller = require('er/controller');
                    controller.renderAction('/400');
                }
            }
        );
    }
);
