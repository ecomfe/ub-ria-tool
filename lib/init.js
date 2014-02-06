var fs = require('fs');
var EDP_PACKAGES = [ 'ub-ria', 'echarts', 'saber-cookie', 'er-track', 'est' ];
var EMPTY_PROJECT_INFO = {
    name: '项目名称',
    alias: '项目代号',
    svn: 'SVN地址',
    developers: ['Unknown']
};
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
                    '.edpproj/project',
                    JSON.stringify(EMPTY_PROJECT_INFO, null, '    '),
                    callback
                );
            },
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

/**
 * CLI入口
 */
exports.cli = function () {
    require('async').series(
        [
            exports.initializeEDP,
            exports.importInitialPackages,
            exports.initializeConfig
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
        }
    );
};
