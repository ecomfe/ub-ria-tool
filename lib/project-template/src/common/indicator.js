/**
 * ${project.alias}
 *
 *
 * @ignore
 * @file 全局 action 跳转时的加载指示器
 * @author ${developer.name}(${developer.email})
 */
define(
    function (require) {
        function enable() {
            var events = require('er/events');
            events.on(
                'forwardaction',
                function (e) {
                    !e.isChildAction && show();
                }
            );
            events.on(
                'enteractioncomplete',
                function (e) {
                    !e.isChildAction && hide();
                }
            );
            events.on(
                'enteractionfail',
                function (e) {
                    if (!e.isChildAction) {
                        hide();
                    }
                }
            );
        }

        function show() {
            document.getElementById('global-indicator').style.display = 'block';
        }

        function hide() {
            document.getElementById('global-indicator').style.display = 'none';
        }

        return {
            enable: enable,
            show: show,
            hide: hide
        };
    }
);
