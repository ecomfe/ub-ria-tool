var path = require('path');

module.exports = Object.create(
    require('./painter'),
    {
        getTemplateData: {
            value: function (args, data) {
                // create module xxx
                var entity = args[0];

                return {
                    entity: entity,
                    description: data.dict[entity] || entity
                };
            }
        },

        getFiles: {
            value: function (data) {
                var files = {};

                files[path.join('$src', data.entity, 'config.js')] = 'module';
                files[path.join('$src', data.entity, 'enum.js')] = 'enum';
                files[path.join('$src', data.entity, 'Data.js')] = 'Data';
                files[path.join('$src', data.entity, 'schema.js')] = 'schema';
                files[path.join('$src', data.entity, '/.define/list.def.js')] = 'listdef';
                files[path.join('$src', data.entity, '/.define/form.def.js')] = 'formdef';

                return files;
            }
        }
    }
);