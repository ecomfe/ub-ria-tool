/**
 * ${project.alias}
 * Copyright 2014 Baidu Inc. All rights reserved.
 *
 * @ignore
 * @file build配置
 * @author ${developer.name}(${developer.email})
 */
// var AddViewName = require('./tool/build/AddViewName');

var cwd = process.cwd();
var path = require('path');

var args = {};
(function () {
    for (var i = 4; i < process.argv.length; i++) {
        var arg = process.argv[i];
        var pair = arg.split('=');
        var key = pair[0].substring(2);
        var value = pair[1];
        args[key] = value;
    }
}());

/**
 * 输入目录
 * 
 * @type {string}
 */
exports.input = cwd;

/**
 * 输出目录
 * 
 * @type {string}
 */
exports.output = path.resolve(cwd, args.output || 'output');

/**
 * 排除文件pattern列表
 * 
 * @type {Array}
 */
exports.exclude = [
    '/src/static/tpl/*',
    '/tool',
    '/test',
    '/mockup',
    '/demo',
    '/copyright.txt',
    '/index-debug.html',
    '/module.conf',
    '/dep/packages.manifest',
    '/dep/*/*/test',
    '/dep/*/*/doc',
    '/dep/*/*/demo',
    '/dep/*/*/tool',
    '/dep/*/*/*.md',
    '/dep/*/*/package.json',
    '/dep/echarts/*/src/util/mapData/rawData/china/*.js',
    '/dep/echarts/*/src/util/mapData/rawData/*.js',
    '/edp-*',
    '/.edpproj',
    '.svn',
    '.git',
    '.gitignore',
    '.idea',
    '.project',
    'Desktop.ini',
    'Thumbs.db',
    '.DS_Store',
    '*.md',
    '*.tmp',
    '*.bak',
    '*.swp'
];

var moduleEntries = 'html,htm,phtml,tpl,vm,js';
var pageEntries = 'html,htm,phtml,tpl,vm';

/**
 * 获取构建processors的方法
 * 
 * @return {Array}
 */
exports.getProcessors = function () {
    return [ 
        // new AddViewName(),
        new LessCompiler({
            exclude: [
                'src/ui/css/*.less',
                'src/common/css/*.less',
                'src/*/css/*.less',
                'src/*/*/css/*.less',
                'src/*/ui/css/*.less',
                'src/*/*/ui/css/*.less'
            ],
            include: [
                'src/common/css/extern.less',
                'src/common/css/main.less',
                'src/common/css/reset.less'
            ],
            entryExtnames: pageEntries
        }), 
        new CssCompressor(),
        new ModuleCompiler({
            exclude: [
                'dep/etpl/*/src/main.js',
                'src/external/esl.js',
                'src/external/json2.js'
            ],
            configFile: 'module.conf',
            entryExtnames: moduleEntries
        }), 
        new JsCompressor(), 
        new PathMapper({
            replacements: [
                { type: 'html', tag: 'link', attribute: 'href', extnames: pageEntries },
                { type: 'html', tag: 'img', attribute: 'src', extnames: pageEntries },
                { type: 'html', tag: 'script', attribute: 'src', extnames: pageEntries },
                { type: 'html', tag: 'a', attribute: 'href', extnames: pageEntries },
                { extnames: moduleEntries, replacer: 'module-config' },
                { extnames: 'css,less', replacer: 'css' }
            ],
            from: 'src',
            to: 'asset'
        }),
        new AddCopyright(),
        new ReplaceDebug({
            exclude: ['*.tpl.html']
        })
    ];
};

/**
 * builder主模块注入processor构造器的方法
 * 
 * @param {Object} processors 
 */
exports.injectProcessor = function (processors) {
    for (var key in processors) {
        global[key] = processors[key];
    }
};
