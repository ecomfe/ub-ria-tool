var path = require('path');

module.exports = Object.create(
    require('./painter'), 
    {
        getTemplateData: {
            value: function (args, data) {
                // create form for entityType
                var entity = args[1];
                var entityForType = entity[0].toUpperCase() + entity.slice(1);
                var actionType = data.name || (entityForType + 'Form');

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
                
                files[path.join('$src', data.entity, 'Form.js')] = 'FormAction';
                files[path.join('$src', data.entity, 'FormModel.js')] = 'FormModel';
                files[path.join('$src', data.entity, 'FormView.js')] = 'FormView';
                files[path.join('$src', data.entity, 'tpl', 'form.tpl.html')] = 'form-tpl';

                files[path.join('$test', data.entity, 'Form.js')] = 'test/FormAction';
                files[path.join('$test', data.entity, 'FormModel.js')] = 'test/FormModel';
                files[path.join('$test', data.entity, 'FormView.js')] = 'test/FormView';

                return files;
            }
        }
    }
);
