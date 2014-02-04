var path = require('path');

module.exports = Object.create(
    require('./painter'), 
    {
        getTemplateData: {
            value: function (args, data) {
                // create list for entity
                var entity = args[1];
                var entityForType = entity[0].toUpperCase() + entity.slice(1);
                var typePrefix = data.prefix ? data.prefix[0].toUpperCase() + data.prefix.slice(1) : '';
                var actionType = (typePrefix || '') + entityForType + 'List';

                return {
                    entity: entity,
                    description: data.dict[entity] || entity,
                    actionType: actionType,
                    modelType: actionType + 'Model',
                    viewType: actionType + 'View',
                    templateName: actionType[0].toLowerCase() + actionType.slice(1)
                };
            }
        },

        getFiles: {
            value: function (data) {
                var files = {};

                var typePrefix = data.prefix ? data.prefix[0].toUpperCase() + data.prefix.slice(1) : '';
                var actionFile = (typePrefix || '') + 'List';
                var tplFile = data.prefix ? data.prefix + 'List' : 'list';
                
                files[path.join('$src', data.entity, actionFile + '.js')] = 'ListAction';
                files[path.join('$src', data.entity, actionFile + 'Model.js')] = 'ListModel';
                files[path.join('$src', data.entity, actionFile + 'View.js')] = 'ListView';
                files[path.join('$src', data.entity, 'tpl', tplFile + '.tpl.html')] = 'list-tpl';

                files[path.join('$test', data.entity, actionFile + '.js')] = 'test/ListAction';
                files[path.join('$test', data.entity, actionFile + 'Model.js')] = 'test/ListModel';
                files[path.join('$test', data.entity, actionFile + 'View.js')] = 'test/ListView';

                return files;
            }
        }
    }
);
