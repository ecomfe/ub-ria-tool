define(
    function (require) {
        // 通用模板
        require('tpl!common/tpl/common.tpl.html');
        require('tpl!common/tpl/list.tpl.html');
        require('tpl!common/tpl/form.tpl.html');
        require('tpl!common/tpl/read.tpl.html');
        require('tpl!common/tpl/detail.tpl.html');

        // 各模块的入口配置
        require('error/config');

        // 配置统计
        var track = require('er-track').create();
        track.includeAll();
        if (location.hostname === 'adm.baidu.com') {
            var scriptURL = window.require.toUrl('external/h') + '.js';
            track.use('baidu')
                .config('scriptURL', scriptURL)
                .setAccount('5e1bc6758a26510366186436cb1e1dd2');
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

                    // 跳转时，若已经进入当前Action，但同时收到了上一个Action的fail，会导致强制跳转至400
                    // 加一层判断限制：若当前已经在另一个Action中了，则不要进入错误页
                    var currentURL = controller.currentURL.toString();
                    var failURL = e.url.toString();

                    currentURL === failURL && controller.renderAction('/400');
                }
            }
        );
    }
);
