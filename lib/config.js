var fs = require('fs-extra');
var path = require('path');
var util = require('./util');
var u = require('underscore');

exports.description = '获取/设置开发者个人配置信息';

exports.help = function () {
    console.log('config get {name}');
    console.log('config set {name} {value}');
    console.log('config list');
};

/**
 * 输出完整的配置对象
 *
 * @return {Object}
 */
exports.dump = function () {
    var dir = path.resolve(util.findProjectDirectory(), '.edpproj');

    var file = path.join(dir, 'me');

    if (!fs.existsSync(file)) {
        fs.writeFileSync(file, '{}');
        return {};
    }

    var config = fs.readJSONSync(file);

    return config;
};

/**
 * 获取指定名称的配置值
 *
 * @param {string} name 指定的配置项名称
 * @return {string}
 */
exports.get = function (name) {
    var config = exports.dump();

    return config.hasOwnProperty(name) ? config[name] : undefined;
};

/**
 * 设置配置项
 *
 * @param {string} name 配置项的名称
 * @param {string} value 配置项的值
 * @return {string} 返回`value`
 */
exports.set = function (name, value) {
    var dir = path.resolve(util.findProjectDirectory(), '.edpproj');
    var file = path.join(dir, 'me');

    var config = exports.dump();
    config[name] = value;


    fs.writeFileSync(file, JSON.stringify(config, null, '    '));

    return value;
};

/**
 * CLI入口
 *
 * @param {string[]} args 参数
 * @param {Object} 命名参数
 */
exports.cli = function (args, argv) {
    var methodName = args[0];
    var name = args[1];
    var value = args[2];
    switch (methodName) {
        case 'get':
            console.log(exports.get(name));
            break;
        case 'set':
            exports.set(name, value);
            console.log('"' + name + '"' + '已被设置为' + '"' + value + '"');
            break;
        case 'show':
            var config = exports.dump();
            u.each(
                config,
                function (value, key) {
                    console.log(key + ' : ' + value);
                }
            );
            break;
        default:
            console.error('未知命令' + methodName);
            break;
    }
};
