var fs = require('fs-extra');
var path = require('path');
var u = require('underscore');

/**
 * 获取项目顶层文件夹
 *
 * @return {string} 绝对路径
 */
exports.findProjectDirectory = function () {
    var dir = path.resolve('.');
    while (dir !== '/' && !fs.existsSync(path.join(dir, '.edpproj'))) {
        dir = path.resolve(dir, '..');
    }

    if (dir === '/') {
        throw new Error('未找到项目文件夹，请确保当前目录在项目内');
    }

    return dir;
};
exports.findProjectDirectory = u.memoize(exports.findProjectDirectory);


exports.getProjectInfo = function () {
    var projectDirectory = exports.findProjectDirectory();
    try {
        return fs.readJSONSync(path.join(projectDirectory, '.edpproj', 'project'));
    }
    catch (ex) {
        if (ex instanceof SyntaxError) {
            throw new Error('无法解析.edpproj/project文件，请检查文件是否为合法的JSON格式');
        }
        else if (ex.code === 'ENOENT') {
            throw new Error('未找到.edpproj/project文件，请确保文件存在');
        }
        else {
            throw new Error('无法正确读取.edpproj/project文件：' + ex.message);
        }
    }
};

exports.getDictionary = function () {
    var projectDirectory = exports.findProjectDirectory();
    try {
        return fs.readJSONSync(path.join(projectDirectory, '.edpproj', 'dict'));
    }
    catch (ex) {
        if (ex instanceof SyntaxError) {
            throw new Error('无法解析.edpproj/dict文件，请检查文件是否为合法的JSON格式');
        }
        else if (ex.code === 'ENOENT') {
            throw new Error('未找到.edpproj/dict文件，请确保文件存在');
        }
        else {
            throw new Error('无法正确读取.edpproj/dict文件：' + ex.message);
        }
    }
};
