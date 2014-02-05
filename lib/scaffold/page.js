var path = require('path');

module.exports = Object.create(
    require('./painter'), 
    {
        getTemplateData: {
            value: function (args, data) {
                var suffix = data.suffix || this.suffix || '';
                // create xxx for entity
                var entity = args[1];
                var entityForType = entity[0].toUpperCase() + entity.slice(1);
                var typePrefix = data.prefix ? data.prefix[0].toUpperCase() + data.prefix.slice(1) : '';
                var actionType = (typePrefix || '') + entityForType + suffix;
                var actionModule = (typePrefix || '') + suffix;
                var camelCaseSuffix = suffix[0].toLowerCase() + suffix.slice(1);

                return {
                    entity: entity,
                    description: data.dict[entity] || entity,
                    actionType: actionType, // PrefixEntitySuffix
                    modelType: actionType + 'Model', // PrefixEntitySuffixModel
                    viewType: actionType + 'View', // PrefixEntitySuffixView
                    templateName: actionType[0].toLowerCase() + actionType.slice(1), // prefixEntitySuffix
                    actionModule: actionModule, // PrefixSuffix
                    modelModule: actionModule + 'Model', // PrefixSuffixModel
                    viewModule: actionModule + 'View', // PrefixSuffixView
                    templateFile: data.prefix ? data.prefix + suffix : camelCaseSuffix // prefixSuffix
                };
            }
        },

        getFiles: {
            value: function (data) {
                var files = {};
                var suffix = data.suffix || this.suffix || '';
                var camelCaseSuffix = suffix[0].toLowerCase() + suffix.slice(1);
                var folder = data.entity;

                files[path.join('$src', folder, data.actionModule + '.js')] = suffix + 'Action';
                files[path.join('$src', folder, data.modelModule + '.js')] = suffix + 'Model';
                files[path.join('$src', folder, data.viewModule + '.js')] = suffix + 'View';
                files[path.join('$src', folder, 'tpl', data.templateFile + '.tpl.html')] = camelCaseSuffix + '-tpl';

                files[path.join('$test', folder, data.actionModule + '.js')] = 'test/' + suffix + 'Action';
                files[path.join('$test', folder, data.modelModule + '.js')] = 'test/' + suffix + 'Model';
                files[path.join('$test', folder, data.viewModule + '.js')] = 'test/' + suffix + 'View';

                return files;
            }
        }
    }
);
