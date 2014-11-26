/**
 * @file 为所有View添加name属性
 * @author zhanglili[otakustay@gmail.com]
 */

var path = require('path');

/**
 * 处理器名称
 *
 * @type {string}
 */
exports.name = 'AddViewName';

exports.files = [
    'src/**/*View.js',
    '!src/common/**' // 基类View不需要名称
];

/**
 * 构建处理
 *
 * @param {FileInfo} file 文件信息对象
 * @param {ProcessContext} processContext 构建环境对象
 * @param {Function} callback 处理完成回调函数
 */
exports.process = function (file, processContext, callback) {
    var content = file.data;
    var index = content.search(/util\.inherits/);
    index = content.indexOf(';', index) + 1;

    var filename = /function (\w+)\(/.exec(content)[1];
    var name = filename.replace(/View$/, '');
    // 从PascalCase转为横线分隔，这里需要注意，连续的大写字母不应该连续分隔
    name = name.replace(
        /[A-Z]{2,}/g,
        function (match) {
            // 这里把ABCD这种连续的大写，转成AbcD这种形式。
            // 如果`encodeURIComponent`，会变成`encodeUriComponent`，
            // 然后加横线后就是`encode-uri-component`得到正确的结果
            return match.charAt(0)
                + match.slice(1, -1).toLowerCase()
                + match.charAt(match.length - 1);
        }
    );
    name = name.replace(
        /[A-Z]/g,
        function (match) {
            return '-' + match.toLowerCase();
        }
    );
    if (name.charAt(0) === '-') {
        name = name.substring(1);
    }

    var statement = filename + '.prototype.name = ' + '\'' + name + '\';';
    content = content.substring(0, index)
        + Array(3).join(require('os').EOL)
        + Array(9).join(' ')
        + statement
        + content.substring(index);

    file.setData(content);

    callback && callback();
};
