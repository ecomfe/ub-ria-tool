var fs = require('fs');
var path = require('path');

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
