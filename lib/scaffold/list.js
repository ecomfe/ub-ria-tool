var path = require('path');

module.exports = Object.create(
    require('./painter'), 
    {
        getTemplateData: {
            value: function (args, data) {
                // create list for entity
                var entity = args[1];
                var entityForType = entity[0].toUpperCase() + entity.slice(1);
                var actionType = data.name || (entityForType + 'List');

                return {
                    entity: entity,
                    description: data.dict[entity] || entity,
                    actionType: actionType,
                    modelType: actionType + 'Model',
                    viewType: actionType + 'View'
                };
            }
        },

        getFiles: {
            value: function (data) {
                var files = {};
                
                files[path.join('$src', data.entity, 'List.js')] = 'ListAction';
                files[path.join('$src', data.entity, 'ListModel.js')] = 'ListModel';
                files[path.join('$src', data.entity, 'ListView.js')] = 'ListView';
                files[path.join('$src', data.entity, 'tpl', 'list.tpl.html')] = 'list-tpl';

                files[path.join('$test', data.entity, 'List.js')] = 'test/ListAction';
                files[path.join('$test', data.entity, 'ListModel.js')] = 'test/ListModel';
                files[path.join('$test', data.entity, 'ListView.js')] = 'test/ListView';

                return files;
            }
        }
    }
);
