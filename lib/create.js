var fs = require('fs-extra');
var path = require('path');
var u = require('underscore');

exports.description = '脚手架创建项目结构和文件';

exports.help = function () {
    console.log('create path/to/file/xx.js');
    console.log('    生成一个js文件，路径为项目根目录起始');
    console.log();

    console.log('create path/to/file/xx.less');
    console.log('    生成一个less文件，路径为项目根目录起始');
    console.log();

    console.log('create path/to/file/xx.html');
    console.log('    生成一个html文件，路径为项目根目录起始');
    console.log();

    console.log('create control {ControlType} [--extends {BaseType}]');
    console.log('    生成控件模板，路径为以"src"为基准，如：');
    console.log('    create control order/ui/ScheduleTable');
    console.log('    create control BubbleTip --extends esui/Tip');
    console.log('    create control creative/ui/Thumbnail --extends ui/ImagePanel');
    console.log();

    console.log('create module {entity}');
    console.log('    初始化业务模块，生成配置文件');
    console.log();

    console.log('create list for {entity}');
    console.log('    生成对应实体的列表页');
    console.log();

    console.log('create form for {entity}');
    console.log('    生成对应实体的表单页');
    console.log();

    console.log('create read for {entity}');
    console.log('    生成对应实体的只读页');
    console.log();

    console.log('create detail for {entity}');
    console.log('    生成对应实体的详情页');
};

exports.cli = function (args, context) {
    var dir = require('./util').findProjectDirectory();

    var data = {
        dict: fs.readJSONSync(path.join(dir, '.edpproj', 'dict')),
        project: fs.readJSONSync(path.join(dir, '.edpproj', 'project')),
        developer: require('./config').dump(),
        projectDirectory: dir
    };

    u.extend(data, context);

    try {
        if (args[0].indexOf('.') > 0) {
            require('./scaffold/file').render(args, data);
        }
        else {
            var painter = require('./scaffold/' + args[0]);
            painter.render(args.slice(1), data);
        }
    }
    catch (err) {
        console.error('无法创建指定文件：' + err.message);
    }
};
