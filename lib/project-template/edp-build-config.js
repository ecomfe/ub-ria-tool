/**
 * @file build默认配置
 * @author errorrik[errorrik@gmail.com]
 */
process.chdir(__dirname);
var cwd = process.cwd();
var path = require('path');
var fs = require('fs');

var args = {};
(function () {
    for (var i = 4; i < process.argv.length; i++) {
        var arg = process.argv[i];
        var pair = arg.split('=');
        var key = pair[0].substring(2);
        var value = pair[1] === undefined ? true : pair[1];
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
 * 声明特定文件的编码
 * @type {Object}
 */
exports.fileEncodings = {
    // TODO: 需要特殊指定文件编码的在此处添加
};

/**
 * 排除文件pattern列表
 *
 * @type {Array}
 */
exports.exclude = [
    'src/static/tpl/*',
    'tool/**',
    'doc/**',
    'test/**',
    'mockup/**',
    'output/**',
    'demo/**',
    'conf/**',
    'copyright.txt',
    args.debug ? '' : 'index-debug.html',
    'index-qa.html',
    'module.conf',
    'dep/packages.manifest',
    'dep/*/*/test',
    'dep/*/*/doc',
    'dep/*/*/demo',
    'dep/*/*/example',
    'dep/*/*/tool',
    'dep/*/*/jsduck',
    'dep/*/*/*.md',
    'dep/*/*/index.html',
    'dep/*/*/package.json',
    'dep/echarts/*/src/util/mapData/rawData/china/*.js',
    'dep/echarts/*/src/util/mapData/rawData/*.js',
    'edp-*',
    '.edpproj',
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
    '*.swp',
    '.edprc',
    '.jshintignore',
    '.jshintrc',
    '.npmignore',
    '*.properties',
    '*.py',
    '*.sh',
    '*.tgz',
    '*.txt',
    '*.yml'
];

var pageFiles = [
    '*.html',
    '*.htm',
];
var pageEntries = 'html,htm';

/**
 * 获取构建processors的方法
 *
 * @return {Array}
 */
exports.init = function (config, start) {
    require('./tool/util').getSVNRevision(function (revision) {
        revision = revision || (+new Date);

        config.getProcessors = function () {
            return [
                new LessCompiler({
                    files: [
                        // 写变量重用不太好看，所以如果改了这里，记得改下面的`CssCompressor`
                        'dep/esui/*/src/css/main.less',
                        'src/common/css/extern.less',
                        'src/common/css/main.less',
                        'src/common/css/reset.less',
                        'src/static/css/index.less'
                    ],
                    compileOptions: {
                        // 现在来看clean-css开最高级别，出来的代码gzip后也没大小差异，如无特别需要不用开
                        // cleancss: true,
                        // cleancssOptions: {
                        //     noAdvanced: false
                        // },
                        compress: true
                    }
                }),
                new ModuleCompiler({
                    files: [
                        '*.js',
                        '!dep/etpl/*/src/main.js',
                        '!dep/esui/*/src/customShim.js',
                        '!dep/jquery/*/src/jquery.js',
                        '!dep/jquery/*/src/jquery.min.js',
                        '!src/external/esl.js',
                        '!src/external/h.js',
                        '!src/external/json2.js',
                        '!src/static/footer.js',
                        '!src/static/header.js'
                    ],
                    getCombineConfig: require('./tool/get-combine-config')
                }),
                new TplMerge({
                    files: [
                        'src/**/*.js',
                        '!src/external/*',
                        '!src/static/*',
                        '!src/dashboard/*'
                    ]
                }),
                // new JsCompressor(),
                new PathMapper({
                    replacements: [
                        // 默认的不处理`<a>`元素，只能自己加上
                        // 根据`edp-build`的版本，`extnames`给0.x版本用，`files`给1.x版本用
                        { type: 'html', tag: 'a', attribute: 'href', extnames: pageEntries, files: pageFiles },
                        { type: 'html', tag: 'link', attribute: 'href', extnames: pageEntries, files: pageFiles },
                        { type: 'html', tag: 'img', attribute: 'src', extnames: pageEntries, files: pageFiles },
                        { type: 'html', tag: 'script', attribute: 'src', extnames: pageEntries, files: pageFiles },
                        { replacer: 'module-config', extnames: pageEntries + ',js', files: pageFiles.concat('*.js') },
                        { replacer: 'css', extnames: 'css,less', files: ['*.css', '*.less'] }
                    ],
                    mapper: function (value) {
                        value = value.replace( /(^|\/)src(\/|$)/, '$1' + 'asset-' + revision + '$2' );
                        value = value.replace( /(^|\/)dep(\/|$)/, '$1' + 'dep-' + revision + '$2' );
                        return value;
                    }
                }),
                new AddCopyright({
                    files: [
                        'src/**/*.js',
                        'src/**/*.css',
                        'src/**/*.less'
                    ]
                }),
                new StringReplace({
                    name: 'ReplaceDebug',
                    files: [
                        '*.htm',
                        '*.html'
                    ],
                    replacements: [
                        { from: 'window.DEBUG = true;', to: 'window.DEBUG = false;' }
                    ]
                }),
                new OutputCleaner()
            ];
        };

        start();
    });
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
