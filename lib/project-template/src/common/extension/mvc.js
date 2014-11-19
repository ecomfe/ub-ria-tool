/**
 * ${project.alias}
 * Copyright 2014 Baidu Inc. All rights reserved.
 *
 * @ignore
 * @file MVC体系扩展
 * @author ${developer.name}(${developer.email})
 */
define(
    function (require) {
        var u = require('underscore');
        var events = require('er/events');

        function extendDatasource() {
            var datasource = require('er/datasource');

            datasource.session = function (key) {
                return function () {
                    var session = require('common/global/session');
                    return session.get(key);
                };
            };

            /**
             * 设定默认值
             *
             * @param {string} name 当前属性名
             * @param {Mixed} defaultValue 默认值
             * @return {function}
             */
            datasource.defaultValue = function (name, defaultValue) {
                return function (model) {
                    return model.get(name) == null
                        ? defaultValue
                        : model.get(name);
                };
            };

            /**
             * 从枚举中获取对应文字
             *
             * @param {common/enum.Enum} enumType 对应的枚举类型
             * @param {string=} propertyName 对应值的字段名，默认与当前字段名相同
             * @return {function}
             */
            datasource.enumText = function (enumType, propertyName) {
                return function (model, options) {
                    var value = model.get(propertyName || options.name);

                    if (value == null) {
                        return undefined;
                    }

                    // 布尔型枚举的值可能是`boolean`型，直接转为数字对应
                    return enumType.getTextFromValue(+value);
                };
            };

            datasource.formatDate = function (format, propertyName) {
                format = format || 'YYYY-MM-DD';
                return function (model, options) {
                    var value = model.get(propertyName || options.name);

                    if (!value) {
                        return '';
                    }

                    var moment = require('moment');
                    return moment(value, 'YYYYMMDD').format(format);
                };
            };

            datasource.user = function (propertyName) {
                return function (model) {
                    var user = model.data('global').getUser();
                    return user[propertyName];
                };
            };

            datasource.system = function (propertyName) {
                return function (model) {
                    var system = model.data('global').getSystem();
                    return system[propertyName];
                };
            };
        }

        function extendRIABase() {
            var ListModel = require('ub-ria/mvc/ListModel');

            ListModel.prototype.getPageSize = function () {
                var data = this.data('global');
                if (!data) {
                    throw new Error(
                        'No global data object attached to this Model');
                }

                return data.getUserProperty('pageSize');
            };

            /**
             * 更新每页条数
             *
             * @param {number} pageSize 每页显示条数
             * @return {er.meta.Promise}
             */
            ListModel.prototype.updatePageSize = function (pageSize) {
                var data = this.data('global');
                if (!data) {
                    throw new Error(
                        'No global data object attached to this Model');
                }

                return data.updatePageSize(pageSize);
            };

            var BaseView = require('ub-ria/mvc/BaseView');

            // TODO: 放进UB-RIA中去
            BaseView.prototype.showToast = function (content, options) {
                var properties = {
                    content: content,
                    disposeOnHide: true,
                    autoShow: true,
                    duration: 3000
                };

                u.extend(properties, options);

                var toast = require('esui').create('Toast', properties);
                toast.show();
            };
        }

        function enableMask() {
            // 遮罩层应用
            var mask = require('../mask');

            events.on(
                'forwardaction',
                function (e) {
                    if (!e.isChildAction) {
                        mask.show();
                    }
                }
            );
            events.on(
                'enteractioncomplete',
                function (e) {
                    if (!e.isChildAction) {
                        mask.hide();
                    }
                }
            );
            events.on(
                'enteractionfail',
                function (e) {
                    if (!e.isChildAction) {
                        mask.hide();
                    }
                }
            );
        }

        function enable() {
            extendDatasource();
            extendRIABase();
            enableMask();
        }

        return {
            enable: u.once(enable)
        };
    }
);
