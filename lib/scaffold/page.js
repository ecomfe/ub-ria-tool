var path = require('path');
var util = require('../util');
var u = require('underscore');

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

                var returnData = {
                    entity: entity,
                    suffix: suffix,
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

                try {
                    returnData.entitydef = util.getDefine(entity, 'entity');
                    if (suffix.toLowerCase() === 'read') {
                        returnData[suffix.toLowerCase()] = util.getDefine(entity, 'form');
                    }
                    else {
                        returnData[suffix.toLowerCase()] = util.getDefine(entity, suffix.toLowerCase());
                    }
                }
                catch (ex) {
                    console.error(ex.message);
                    process.exit(1);
                }

                if (suffix.toLowerCase() === 'form' || suffix.toLowerCase() === 'read') {
                    var entitydef = returnData.entitydef;
                    var formdef = returnData.form;

                    u.each(
                        entitydef,
                        function (field) {
                            util.mergeDefaultFieldDef(entity, field);
                            //console.log(field);
                        }
                    );

                    u.each(
                        formdef,
                        function (section) {
                            u.each(
                                section.fields,
                                function (field) {
                                    // console.log(field)
                                    if (entitydef[field.field]) {
                                        util.mergeEntity2Form(field, entitydef[field.field]);
                                    }
                                }
                            );
                        }
                    );
                }

                // console.log(returnData.form[0].fields);
                return returnData;
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

                // files[path.join('$test', folder, data.actionModule + '.js')] = 'test/' + suffix + 'Action';
                // files[path.join('$test', folder, data.modelModule + '.js')] = 'test/' + suffix + 'Model';
                // files[path.join('$test', folder, data.viewModule + '.js')] = 'test/' + suffix + 'View';

                return files;
            }
        }
    }
);
