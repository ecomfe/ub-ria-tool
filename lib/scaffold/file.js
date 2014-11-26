var path = require('path');

module.exports = Object.create(
    require('./painter'),
    {
        getTemplateData: {
            value: function (args, daa) {
                var filename = args[0];

                return {
                    filename: filename,
                    extension: path.extname(filename).substring(1)
                };
            }
        },

        getFiles: {
            value: function (data) {
                var files = {};
                files[data.filename] = data.extension;

                return files;
            }
        },

        render: {
            value: function (args, data) {
                require('./painter').render.apply(this, arguments);
                if (this.getTemplateData(args, data).extension === 'html') {
                    var projectDirectory = require('../util').findProjectDirectory();
                    var projectInfo = {
                        dir: projectDirectory,
                        infoDir: path.join(projectDirectory, '.edpproj')
                    };
                    var project = require('edp-project');
                    project.loader.updateAllFilesConfig(projectInfo);
                }
            }
        }
    }
);
