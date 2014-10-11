var fs = require('fs-extra');
var path = require('path');
var u = require('underscore');

var EDP_PACKAGES = [ 'ub-ria', 'echarts', 'saber-cookie', 'er-track', 'est', 'eoo', 'uioc' ];
var EMPTY_USER_INFO = { name: 'Unknown', email: 'unknown@baidu.com' };
var EXAMPLE_DICT = {
    channel: '频道',
    slot: '广告位',
    delivery: '广告',
    order: '订单',
    manager: '管理员',
    log: '日志',
    creative: '创意',
    contact: '联系人',
    company: '公司',
    account: '帐户'
};

exports.description = '在当前目录下初始化RIA项目';

exports.help = function () {
    console.log('仅在开始开发项目时使用一次');
};

/**
 * 初始化EDP项目
 *
 * @param {Function} callback 回调
 */
exports.initializeEDP = function (callback) {
    try {
        var project = require('edp-project');
        var projectInfo = project.init('.');
        project.dir.init(projectInfo);
        project.build.createConfigFile(projectInfo);
        project.webserver.createConfigFile(projectInfo);

        console.log('EDP项目初始化完毕');

        callback();
    }
    catch (err) {
        callback(err);
    }
};

/**
 * 导入初始依赖包
 *
 * @param {Function} callback 回调
 */
exports.importInitialPackages = function (callback) {
    require('async').eachSeries(
        EDP_PACKAGES,
        function (packageName, callback) {
            require('edp-package').importFromRegistry(packageName, null, callback);
        },
        function (err) {
            if (err) {
                callback(err);
                return;
            }

            console.log('已导入基础依赖包');

            callback();
        }
    );
};

/**
 * 初始化配置文件
 *
 * @param {Function} callback 回调
 */
exports.initializeConfig = function (callback) {
    require('async').parallel(
        [
            function (callback) {
                fs.writeFile(
                    '.edpproj/me',
                    JSON.stringify(EMPTY_USER_INFO, null, '    '),
                    callback
                );
            },
            function (callback) {
                fs.writeFile(
                    '.edpproj/dict',
                    JSON.stringify(EXAMPLE_DICT, null, '    '),
                    callback
                );
            }
        ],
        callback
    );
};

exports.initializeProjectInfo = function (callback) {
    var projectInfo = {
        svn: 'SVN地址',
        developers: ['Unknown']
    };
    require('async').series(
        [
            function (callback) {
                console.log('请输入此项目的名称（中文，如“百度联盟”）：');
                require('read')(
                    { prompt: '> ' },
                    function (err, name) {
                        projectInfo.name = name || '项目名称';
                        callback(err);
                    }
                );
            },
            function (callback) {
                console.log('请输入此项目的代号（通常为英文，如“Union”）：');
                require('read')(
                    { prompt: '> ' },
                    function (err, alias) {
                        projectInfo.alias = alias || '项目代号';
                        callback(err);
                    }
                );
            },
            function (callback) {
                console.log('请输入本项目的系统域名（不包含http://前缀，如“union.baidu.com”）：');
                require('read')(
                    { prompt: '> ' },
                    function (err, domain) {
                        projectInfo.domain = domain || 'unknown.baidu.com';
                        callback(err);
                    }
                );
            },
            function (callback) {
                fs.writeFile(
                    '.edpproj/project',
                    JSON.stringify(projectInfo, null, '    '),
                    callback
                );
            }
        ],
        callback
    );
};

exports.initializeDeveloperInfo = function (callback) {
    var config = require('./config');
    var read = require('read');
    console.log('请输入你的用户名，这将用于每个文件的@author字段，可以使用任意名称：');
    read(
        { prompt: '> ' },
        function (err, name) {
            config.set('name', name);
            console.log('请输入你的电子邮件，这将用于每个文件的@author字段，可以不使用公司邮箱：');
            read(
                { prompt: '> ' },
                function (err, email) {
                    config.set('email', email);
                    callback && callback();
                }
            );
        }
    );
};

function getPackageVersions() {
    var projectDirectory = require('./util').findProjectDirectory();
    var config = fs.readJSONSync(path.join(projectDirectory, 'module.conf'));
    var packages = {};
    u.each(
        config.packages,
        function (package) {
            // location = "../{name}/{version}/src"
            var version = package.location.split('/')[3];
            packages[package.name] = version;
        }
    );
    return packages;
}

exports.renderProjectTemplate = function (callback) {
    var util = require('./util');
    var Engine = require('etpl').Engine;
    var engine = new Engine();
    engine.config({ defaultFilter: 'raw', commandOpen: '<%=', commandClose: '=%>' });
    var packageVersions = getPackageVersions();
    var templateData = {
        developer: require('./config').dump(),
        projectDirectory: util.findProjectDirectory(),
        esuiVersion: packageVersions.esui,
        estVersion: packageVersions.est,
        riaVersion: packageVersions['ub-ria']
    };

    try {
        templateData.dict = util.getDictionary();
    }
    catch (ex) {
        callback(ex);
        return;
    }

    try {
        templateData.project = util.getProjectInfo();
    }
    catch (ex) {
        callback(ex);
        return;
    }

    var projectTemplateBaseDirectory = path.resolve(__dirname, 'project-template');

    function writeAsCopy(source) {
        var stat = fs.statSync(source);
        var projectDirectory = require('./util').findProjectDirectory();
        var target = path.resolve(projectDirectory, path.relative(projectTemplateBaseDirectory, source));
        if (stat.isFile()) {
            var template = fs.readFileSync(source, 'utf-8');
            var content = template ? engine.compile(template)(templateData) : '';
            fs.writeFileSync(target, content);
        }
        else {
            if (!fs.existsSync(target)) {
                fs.mkdirSync(target);
            }
            fs.readdirSync(source)
                .map(function (file) { return path.resolve(source, file); })
                .forEach(writeAsCopy);
        }
    }

    try {
        writeAsCopy(projectTemplateBaseDirectory);
    }
    catch (ex) {
        callback(ex);
    }
    console.log('已生成初始化项目结构');
    callback();
};

exports.updateModuleConfig = function (callback) {
    var projectDirectory = require('./util').findProjectDirectory();
    var moduleConfigFile = path.join(projectDirectory, 'module.conf');
    var config = fs.readJSONSync(moduleConfigFile);
    config.paths = {
        tpl: 'common/tpl',
        js: 'external/js'
    };
    fs.writeFile(
        moduleConfigFile,
        JSON.stringify(config, null, '    '),
        function (err) {
            if (err) {
                callback(err);
                return;
            }

            console.log('完成module.conf的修改');
            var projectInfo = {
                dir: projectDirectory,
                infoDir: path.join(projectDirectory, '.edpproj')
            };
            require('edp-project').loader.updateAllFilesConfig(projectInfo);
            console.log('完成各HTML文件的require.config更新');
            callback && callback();
        }
    );
};

/**
 * CLI入口
 */
exports.cli = function () {
    require('async').series(
        [
            exports.initializeEDP,
            exports.importInitialPackages,
            exports.initializeConfig,
            exports.initializeProjectInfo,
            exports.initializeDeveloperInfo,
            exports.renderProjectTemplate,
            exports.updateModuleConfig
        ],
        function (err) {
            if (err) {
                console.error('项目初始化失败：' + err.message);
                console.log('请移除当前目录下所有文件（包括隐藏的文件及文件夹），在解决错误后重新运行初始化命令');
                console.log('如果需要技术支持，请联系ub-ria-tool的维护者');
                return;
            }

            console.log('请按以下步骤完成项目的初始化工作：');
            console.log('1. 编辑.edpproj/project文件，将字段补充完整');
            console.log('2. 编辑.edpproj/dict文件，以JSON格式将系统常用的实体名称翻译补充至文件中');
            console.log('3. 将.edpproj/me文件添加到:svnignore中');
            console.log('4. 将edp-webserver-config.js文件添加到:svnignore中');
            console.log();
            console.log('对于每一位项目的开发者，开始开发前请在项目文件夹下运行以下命令：');
            console.log('    ria config set name "$yourName"');
            console.log('    ria config set email "$yourEmail"');
            console.log('开发者也可以在.edpproj目录下创建一个名字为"me"的文件，在其中以JSON格式写入以上字段完成开发准备工作');
            console.log();
            console.log('我们强烈建议你使用ria review发起一次Code Review以保存自动生成的初始化项目结构');
            console.log('随后请使用ria todo查询默认项目模板中的所有TODO标记进行相应修改，以使项目可以完整运行');
            console.log('之后通过ria review -i向之前发起的Code Review追加patch，通过Review之后将代码提交至SVN作为初始项目源码');
        }
    );
};
