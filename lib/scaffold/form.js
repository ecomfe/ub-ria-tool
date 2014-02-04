var path = require('path');

module.exports = Object.create(
    require('./painter'), 
    {
        getTemplateData: {
            value: function (args, data) {
                // create form for entityType
                var entity = args[1];
                var entityForType = entity[0].toUpperCase() + entity.slice(1);
                var typePrefix = data.prefix ? data.prefix[0].toUpperCase() + data.prefix.slice(1) : '';
                var actionType = (typePrefix || '') + entityForType + 'Form';

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
                var actionFile = (typePrefix || '') + 'Form';
                var tplFile = data.prefix ? data.prefix + 'Form' : 'form';
                
                files[path.join('$src', data.entity, actionFile + '.js')] = 'FormAction';
                files[path.join('$src', data.entity, actionFile + 'Model.js')] = 'FormModel';
                files[path.join('$src', data.entity, actionFile + 'View.js')] = 'FormView';
                files[path.join('$src', data.entity, 'tpl', tplFile + '.tpl.html')] = 'form-tpl';

                files[path.join('$test', data.entity, actionFile + '.js')] = 'test/FormAction';
                files[path.join('$test', data.entity, actionFile + 'Model.js')] = 'test/FormModel';
                files[path.join('$test', data.entity, actionFile + 'View.js')] = 'test/FormView';

                return files;
            }
        }
    }
);
