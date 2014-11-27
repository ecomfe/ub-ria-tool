var path = require('path');

module.exports = Object.create(
    require('./painter'),
    {
        getTemplateData: {
            value: function (args, data) {
                var segments = args[0].split('/');
                var type = segments.pop();
                var path = segments.length ? segments : ['ui'];
                var baseType = data['extends'] || 'esui/Control';

                return {
                    type: type,
                    moduleID: args[0],
                    path: path,
                    baseType: baseType.split('/').pop(),
                    baseTypeFullName: baseType.replace(/\//g, '.'),
                    baseTypeModuleID: baseType
                };
            }
        },

        getFiles: {
            value: function (data) {
                var type = data.type;
                var files = {};

                var filePath = ['$src'].concat(data.path).concat(type + '.js');
                var testFilePath = ['$test'].concat(data.path).concat(type + '.js');

                files[path.join.apply(path, filePath)] = 'Control';
                files[path.join.apply(path, testFilePath)] = 'test/Control';

                return files;
            }
        }
    }
);
