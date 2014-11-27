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
        /**
         * 页面切换过场指示器
         *
         * @class common.Indicator
         */
        var exports = {};

        /**
         * 启用
         *
         * @method common.Indicator#enable
         */
        exports.enable = function () {
            var events = this.getEventBus();
            events.on(
                'forwardaction',
                function (e) {
                    !e.isChildAction && this.show();
                },
                this
            );
            events.on(
                'enteractioncomplete',
                function (e) {
                    !e.isChildAction && this.hide();
                },
                this
            );
            events.on(
                'enteractionfail',
                function (e) {
                    !e.isChildAction && this.hide();
                },
                this
            );
        };

        /**
         * 显示
         *
         * @method common.Indicator#show
         */
        exports.show = function () {
            this.getGlobalIndicatorElement().style.display = '';
        };

        /**
         * 隐藏
         *
         * @method common.Indicator#hide
         */
        exports.hide = function () {
            this.getGlobalIndicatorElement().style.display = 'none';
        };

        var oo = require('eoo');

        /**
         * 获取全局事件总线
         *
         * @method common.Indicator#getEventBus
         *
         * @return {mini-event.EventTarget}
         */


        /**
         * 设置全局事件总线
         *
         * @method common.Indicator#setEventBus
         *
         * @param {mini-event.EventTarget} 事件总线对象
         */
        oo.defineAccessor(exports, 'eventBus');

        /**
         * 获取全局指示器DOM元素
         *
         * @method common.Indicator#getGlobalIndicatorElement
         *
         * @return {HTMLElement}
         */


        /**
         * 设置全局指示器DOM元素
         *
         * @method common.Indicator#setGlobalIndicatorElement
         *
         * @param {HTMLElement} DOM元素
         */
        oo.defineAccessor(exports, 'globalIndicatorElement');

        var Indicator = oo.create(exports);
        return Indicator;
    }
);
