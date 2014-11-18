/**
 * SSP for APP
 * Copyright 2013 Baidu Inc. All rights reserved.
 *
 * @file 全局ioc 容器
 * @name common.ioc
 * @author exodia(dengxinxin@baidu.com)
 */
define(
    function (require) {
        var IoC = require('uioc');
        var u = require('common/util');

        var ioc = new IoC();

        var globalComponents = {
            globalData: {
                module: 'common/GlobalData',
                scope: 'singleton',
                creator: 'getInstance'
            },
            session: {
                module: 'common/session',
                scope: 'static'
            },
            redirectSubmitHanlder: {
                module: 'ub-ria/mvc/handler/RedirectSubmitHandler',
                properties: {
                    redirectOptions: {
                        global: true,
                        force: true,
                        childFormSubmitRedirect: false
                    }
                }
            },
            submitHandler: {
                module: 'ub-ria/mvc/handler/ToastSubmitHandler',
                properties: {
                    nextSubmitHandler: {
                        $ref: 'redirectSubmitHanlder'
                    }
                }
            },
            baseModel: {
                module: 'ub-ria/mvc/BaseModel',
                auto: true,
                properties: {
                    data: {$ref: 'requestStrategy'}
                }
            },
            requestStrategy: {
                module: 'ub-ria/mvc/RequestManager'
            }
        };

        ioc.addComponent(globalComponents);

        /**
         * 根据实体名添加默认组件
         *
         * @method common.ioc.addComponentsByEntityName
         * @param {String} entityName 前端实体名
         * @param {String} backendEntityName 后端实体名
         * @param {Object} [overrides] 需要覆盖的组件配置
         * @param {Array} [omits] 需要忽略的组件名
         */
        ioc.addComponentsByEntityName = function (entityName, backendEntityName, overrides, omits) {
            var base = getBaseComponentConfig(entityName, backendEntityName);
            var components = getActionComponentConfig(entityName);

            u.extend(components, base, overrides || {});
            u.each(
                omits,
                function (key) {
                    delete components[key];
                }
            );
            ioc.addComponent(components);
        };

        // 获取 ioc 基础组件配置
        function getBaseComponentConfig(entityName, backendEntityName) {
            var components = {};

            var data = entityName + 'Data';
            var strategy = entityName + 'RequestStrategy';
            var schema = entityName + 'Schema';
            var validator = entityName + 'EntityValidator';

            components[data] = {
                module: entityName + '/Data',
                properties: {
                    requestStrategy: {$ref: entityName + 'RequestStrategy'}
                }
            };

            components[strategy] = {
                module: 'common/RequestStrategy',
                args: [entityName, backendEntityName]
            };

            components[schema] = {
                module: entityName + '/schema',
                scope: 'static'
            };

            components[validator] = {
                module: 'ub-ria/mvc/EntityValidator',
                properties: {
                    schema: {$ref: schema}
                }
            };

            return components;
        }

        // 根据实体名获取aciton相关配置
        function getActionComponentConfig(entityName) {
            var components = {};

            u.each(
                ['List', 'Form', 'Success', 'Read', 'Detail'],
                function (type) {
                    var action = entityName + type;
                    var model = action + 'Model';
                    var view = action + 'View';

                    components[action] = {
                        module: entityName + '/' + type,
                        args: [entityName],
                        auto: true,
                        properties: {
                            model: {$ref: model},
                            view: {$ref: view}
                        }
                    };

                    var modelPropperties = {
                        data: {$ref: entityName + 'Data'}
                    };

                    if (type === 'Form') {
                        modelPropperties.validator = {$ref: entityName + 'EntityValidator'};
                    }

                    components[model] = {
                        module: entityName + '/' + type + 'Model',
                        auto: true,
                        properties: modelPropperties
                    };

                    components[view] = {
                        module: entityName + '/' + type + 'View',
                        auto: true
                    };
                }
            );

            return components;
        }

        return ioc;
    }
);
