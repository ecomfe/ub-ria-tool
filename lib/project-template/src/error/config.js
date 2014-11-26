/**
 * ${project.alias}
 *
 *
 * @ignore
 * @file 错误模块配置
 * @author ${developer.name}(${developer.email})
 */
define(
    function (require) {
        // 通用错误页预加载，这样保证网络断掉也还能到这个页
        require('./GenericError');

        var u = require('common/util');
        var ActionFactory = require('common/IoCActionFactory');

        var actions = [
            {
                path: '/404',
                type: new ActionFactory('errorNotFound'),
                title: '无法找到页面',
                args: {noNavigator: true}
            },
            {
                path: '/400',
                type: new ActionFactory('errorGenericError'),
                title: '出现未知问题',
                args: {noNavigator: true}
            }
        ];

        function getActionComponentConfig(entityName) {
            var components = {};
            var types = ['NotFound', 'GenericError'];

            u.each(
                types,
                function (type) {
                    var action = entityName + type;
                    components[action] = {
                        module: entityName + '/' + type,
                        args: [type],
                        auto: false,
                        properties: {
                            view: {$ref: action + 'View'}
                        }
                    };

                    components[action + 'View'] = {
                        module: 'error/View',
                        properties: {
                            template: type.substring(0, 1).toLowerCase() + type.substring(1)
                        }
                    };
                }
            );

            return components;
        }

        require('er/controller').registerAction(actions);
        require('common/ioc').addComponentsByEntityName('error', 'error', getActionComponentConfig('error'));
    }
);
