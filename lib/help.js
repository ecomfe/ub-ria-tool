var fs = require('fs');
var path = require('path');
var s = require('underscore.string');

exports.description = '联盟前端技术部RIA系统工具库';

exports.help = function () {
    var modules = fs.readdirSync(__dirname)
        .filter(function (file) { return fs.statSync(path.join(__dirname, file)).isFile(); })
        .map(function (file) { return './' + file.replace(/\.js$/, ''); })
        .filter(function (module) { return !!require(module).cli; });

    console.log('支持命令：');
    console.log();
    for (var i = 0; i < modules.length; i++) {
        var module = modules[i];
        console.log(s.rpad(module.slice(2), 10) + require(module).description);
    }
};

exports.cli = function (args) {
    var module = require('./' + (args[0] || 'help'));
    console.log(module.description);
    console.log();
    module.help();
};
